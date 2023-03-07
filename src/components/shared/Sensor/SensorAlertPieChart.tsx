import React from "react";
import { Random } from "mockjs";
import { Pie, PieConfig } from "@ant-design/charts";

export const SensorAlertPieChart = (props: {
  width?: number;
  height?: number;
}) => {
  const data: any[] = [];
  const sum = 6;

  const pieConfig: PieConfig = {
    width: props.width,
    height: props.height,
    padding: [0, 0, 48, 0],
    legend: {
      position: "bottom",
    },
    data: [
      {
        value: 30,
        type: "温度",
      },
      {
        value: 20,
        type: "氨氮",
      },
      {
        value: 10,
        type: "溶解氧",
      },
      {
        value: 10,
        type: "PH",
      },
      {
        value: 10,
        type: "浊度",
      },
      {
        value: 10,
        type: "盐度",
      },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      type: "spider",
      formatter: (text, item) => `${item._origin.type}: ${item._origin.value}%`,
    },
  };
  return <Pie {...pieConfig} />;
};
