import ReactEcharts, { EChartsOption } from "echarts-for-react";
import React, { useEffect, useRef } from "react";

export default function GaugeChart(props: { value: number }) {
  const config: EChartsOption = {
    series: [
      {
        type: "gauge",
        color: "#26a31e",
        progress: {
          show: true,
          width: 4,
          color: "#26a31e",
          borderColor: "#26a31e",
        },
        axisLine: {
          lineStyle: {
            width: 3,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 3,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        axisLabel: {
          distance: 3,
          color: "#999",
          fontSize: 0,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 10,
          itemStyle: {
            borderWidth: 2,
          },
        },
        detail: {
          valueAnimation: true,
          fontSize: 12,
          color: "#Fff",
          offsetCenter: [0, "70%"],
        },
        data: [
          {
            value: props.value,
          },
        ],
      },
    ],
  };
  const chartRef = useRef<ReactEcharts | null>();
  useEffect(() => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.clear();
      instance.setOption(config);
    }
  }, [chartRef]);

  return (
    <ReactEcharts
      ref={(e) => (chartRef.current = e)}
      style={{ width: 70, height: 70, background: "none" }}
      option={config}
    />
  );
}
