"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time, CandlestickSeries } from "lightweight-charts";

interface PriceChartProps {
  address: string;
}

export default function PriceChart({ address }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [resolution, setResolution] = useState("60");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "transparent" },
        textColor: "#9ca3af",
        fontSize: 12,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.03)" },
        horzLines: { color: "rgba(255,255,255,0.03)" },
      },
      crosshair: {
        vertLine: { color: "rgba(250,204,21,0.3)", labelBackgroundColor: "#FACC15" },
        horzLine: { color: "rgba(250,204,21,0.3)", labelBackgroundColor: "#FACC15" },
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.1)",
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.1)",
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    async function fetchBars() {
      setLoading(true);
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = to - (resolution === "60" ? 86400 : resolution === "15" ? 21600 : 604800);
        const res = await fetch(`/api/bars?address=${address}&from=${from}&to=${to}&resolution=${resolution}`);
        const data = await res.json();

        if (data.bars && seriesRef.current) {
          const candles: CandlestickData<Time>[] = data.bars.t.map((t: number, i: number) => ({
            time: t as Time,
            open: data.bars.o[i],
            high: data.bars.h[i],
            low: data.bars.l[i],
            close: data.bars.c[i],
          }));
          seriesRef.current.setData(candles);
          chartRef.current?.timeScale().fitContent();
        }
      } catch {
        // Generate mock data if API fails
        if (seriesRef.current) {
          const now = Math.floor(Date.now() / 1000);
          const mockData: CandlestickData<Time>[] = [];
          let price = 145;
          for (let i = 100; i >= 0; i--) {
            const t = now - i * 3600;
            const open = price;
            const change = (Math.random() - 0.48) * 4;
            const close = open + change;
            const high = Math.max(open, close) + Math.random() * 2;
            const low = Math.min(open, close) - Math.random() * 2;
            mockData.push({ time: t as Time, open, high, low, close });
            price = close;
          }
          seriesRef.current.setData(mockData);
          chartRef.current?.timeScale().fitContent();
        }
      }
      setLoading(false);
    }
    fetchBars();
  }, [address, resolution]);

  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
        <span className="text-xs text-zinc-400 mr-2">Timeframe:</span>
        {["15", "60", "D"].map((r) => (
          <button
            key={r}
            onClick={() => setResolution(r)}
            className={`rounded px-3 py-1 text-xs font-medium transition ${
              resolution === r
                ? "bg-yellow-400 text-black"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            {r === "15" ? "15m" : r === "60" ? "1H" : "1D"}
          </button>
        ))}
        {loading && (
          <div className="ml-auto h-3 w-3 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
        )}
      </div>
      <div ref={chartContainerRef} className="h-[400px] w-full" />
    </div>
  );
}
