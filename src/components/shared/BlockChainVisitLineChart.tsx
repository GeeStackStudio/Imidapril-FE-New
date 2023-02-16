import { Card, Divider, message, Statistic, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import moment, { Moment } from "moment";
import { useInterval, useMount, useTimeout, useUpdate } from "ahooks";
import useOpenApi from "../../Http/useOpenApi";
import {
  SensorDataApi,
  SensorDataApiFactory,
  SensorValueType,
} from "../../scaffold";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import echarts from "echarts/lib/echarts";

export const BlockChainVisitLineChart = (props: {
  style?: React.CSSProperties;
  theme?: string;
}) => {
  const chart = useRef() as React.MutableRefObject<ReactEcharts>;
  const searchHook = useOpenApiFpRequest(
    SensorDataApi,
    SensorDataApi.prototype.sensorDataSearchGet
  );
  const zoomSize = 6;

  useEffect(() => {
    searchHook
      .request({
        pi: 1,
        ps: 999,
        type: SensorValueType.温度,
        fromTime: moment().subtract(1, "days").format(),
        toTime: moment().format(),
      })
      .then()
      .catch((e) => message.error(e.message));
  }, []);
  const dataAxis = [
    "点",
    "击",
    "柱",
    "子",
    "或",
    "者",
    "两",
    "指",
    "在",
    "触",
    "屏",
    "上",
    "滑",
    "动",
    "能",
    "够",
    "自",
    "动",
    "缩",
    "放",
  ];
  // prettier-ignore
  const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  const yMax = 500;
  const dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  const options: EChartsOption = {
    backgroundColor: "transparent",
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        // type: 'inside',
      },
    ],
    series: [
      {
        type: "bar",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ],
            global: true,
          },
        },
        emphasis: {
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ],
              global: true,
            },
          },
        },
        data: data,
      },
    ],
  };

  return (
    <ReactEcharts
      ref={chart}
      style={props.style}
      option={options}
      theme={props.theme ?? "default"}
    />
  );
};
