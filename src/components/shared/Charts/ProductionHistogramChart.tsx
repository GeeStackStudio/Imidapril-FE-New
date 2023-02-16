import React, { CSSProperties } from "react";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts/lib/echarts";
import { EChartsOption } from "echarts";
export function ProductionHistogramChart(props: { style?: CSSProperties }) {
  const option = {
    backgroundColor: "",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        const param = params[0];
        const marker =
          '<span sidebarStyle="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#e6b600;"></span>';
        return (
          param.name +
          "<br />" +
          marker +
          "<br />" +
          marker +
          "库存总量：" +
          param.data[0] +
          "箱"
        );
      },
    },
    dataset: {
      source: [
        ["amount", "product"],
        [20, "一号产线"],
        [35, "二号产线"],
        [66, "三号产线"],
        [83, "四号产线"],
        [32, "五号产线"],
      ],
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 60,
    },
    xAxis: { show: false, type: "value" },
    yAxis: {
      type: "category",
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 12,
        color: "white",
      },
    },
    series: [
      {
        type: "bar",
        barCategoryGap: "60%",
        encode: {
          x: "amount",
          y: "product",
        },
        label: {
          show: true,
          position: "right",
          fontSize: 12,
          color: "white",
          emphasis: {
            color: "rgba(58, 166, 166, 01)",
          },
        },
        showBackground: true,

        itemStyle: {
          barBorderRadius: 7,

          color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "rgba(4, 145, 237, 1)" },
            { offset: 0.5, color: "rgba(3, 200, 246, 1)" },
            { offset: 1, color: "rgba(1, 238, 254, 1)" },
          ]),
          // normal: {
          //   color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          //     {offset: 0, color: 'rgba(4, 145, 237, 1)'},
          //     {offset: 0.5, color: 'rgba(3, 200, 246, 1)'},
          //     {offset: 1, color: 'rgba(1, 238, 254, 1)'},
          //   ]),
          // },
          // emphasis: {
          //   color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          //     {offset: 0, color: 'rgba(4, 145, 237, 1)'},
          //     {offset: 0.5, color: 'rgba(3, 200, 246, 1)'},
          //     {offset: 1, color: 'rgba(1, 238, 254, 1)'},
          //   ]),
          // },
        },
      },
    ],
  };

  return (
    <div>
      <EChartsReact style={props.style} option={option} theme="dark" />
    </div>
  );
}
