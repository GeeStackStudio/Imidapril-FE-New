import ReactEcharts from "echarts-for-react";
import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import moment from "moment";
import { EChartOption } from "echarts";
import * as echarts from "echarts/lib/echarts";
import { blue } from "@ant-design/colors";
import { useMount } from "ahooks";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { CultureBatchApi } from "../../scaffold";

export const MissionFinishLineChart = (props: {
  style?: CSSProperties;
  theme?: "dark" | "light";
}) => {
  const colorList = ["#16f7e5", "#e19900", "#f0347b", "#2cd8ff", "#2cd8ff"];
  const searchHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchSearchGet
  );
  useMount(() => {
    searchHook.requestSync({
      pi: 1,
      ps: 999,
    });
  });
  const list = useMemo(() => {
    return [
      {
        code: "YZ00000001",
      },
      {
        code: "YZ00000002",
      },
      {
        code: "YZ00000003",
      },
    ];
  }, []);

  const config: EChartOption = {
    backgroundColor: "",
    grid: {
      top: 16,
      left: 32,
      bottom: 32,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: new Array(5)
        .fill(0)
        .map((i, index) => moment().subtract(index, "day").format("ddd")),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: list?.map((i, index) => ({
      name: String(i.code),
      type: "line",
      symbol: "circle",
      symbolSize: 10,
      smooth: true,
      itemStyle: {
        normal: {
          color: colorList[index + 1],
          borderColor: "#333",
          borderWidth: 3,
        },
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorList[index + 1],
          },
          {
            offset: 1,
            color: "transparent",
          },
        ]),
      },
      data: new Array(10).fill(0).map((i, index) => {
        const start = index + Math.random() * 10;
        return Math.random() * 30;
      }),
      effect: {
        show: true,
        //特效动画的延时
        //特效动画的时间
        period: 5 * Math.random(),
        //尾巴
        trailLength: 0,
        color: "#fff",
        symbolSize: (10 * Math.random()) / 2,
        //是否循环
        loop: false,
        symbol: "circle",
      },
    })),
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
      style={props.style}
      option={config}
      theme={props.theme}
    />
  );
};
