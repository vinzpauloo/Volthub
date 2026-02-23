"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface InsightChartProps {
  data: number[];
  categories: string[];
  chartType: "line" | "bar" | "area";
  color: string;
  title: string;
}

const InsightChart = ({
  data,
  categories,
  chartType,
  color,
  title,
}: InsightChartProps): React.ReactElement => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const seriesType = chartType === "area" ? "line" : chartType;
    const isArea = chartType === "area" || chartType === "line";

    chart.setOption({
      animation: true,
      animationDuration: 1000,
      animationEasing: "cubicOut",
      title: {
        text: title,
        left: "center",
        top: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 600,
          color: "#374151",
        },
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        textStyle: { color: "#1f2937", fontSize: 13 },
      },
      grid: {
        top: 48,
        left: 12,
        right: 12,
        bottom: 12,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: categories,
        axisLine: { lineStyle: { color: "#d1d5db" } },
        axisLabel: { color: "#6b7280", fontSize: 11 },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisLabel: { color: "#6b7280", fontSize: 11 },
        splitLine: { lineStyle: { color: "rgba(0,0,0,0.06)" } },
      },
      series: [
        {
          data,
          type: seriesType,
          smooth: isArea,
          symbol: isArea ? "circle" : "none",
          symbolSize: isArea ? 6 : 0,
          itemStyle: { color },
          lineStyle: isArea ? { color, width: 3 } : undefined,
          barWidth: chartType === "bar" ? "50%" : undefined,
          areaStyle: isArea
            ? {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: `${color}33` },
                  { offset: 1, color: `${color}05` },
                ]),
              }
            : undefined,
        },
      ],
    });

    const handleResize = (): void => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, categories, chartType, color, title]);

  return <div ref={chartRef} className="w-full h-full min-h-[360px]" />;
};

export default InsightChart;
