import { message } from "antd";
import React, { useEffect, useRef } from "react";
import { EChartOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { SensorDataApi, SensorValueType } from "../../scaffold";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { Dayjs } from "dayjs";
import { theme } from "antd";
import * as echarts from "echarts";
import { lighten, setAlpha } from "@ant-design/pro-components";

export const SensorDataLineChart = (props: {
  style?: React.CSSProperties;
  type: SensorValueType;
  unit: string;
  theme?: string;
  sensorId?: number;
  timeRange?: Array<Dayjs>;
}) => {
  const { token } = theme.useToken();
  const chart = useRef() as React.MutableRefObject<ReactEcharts>;
  const searchHook = useOpenApiFpRequest(
    SensorDataApi,
    SensorDataApi.prototype.sensorDataSearchGet
  );
  console.log(token.colorPrimary);
  console.log(lighten(token.colorPrimary, 20));
  useEffect(() => {
    searchHook
      .request({
        pi: 1,
        ps: 999,
        sensorId: props.sensorId,
        type: props.type,
        fromTime: props.timeRange ? props.timeRange[0]!.format() : undefined,
        toTime: props.timeRange ? props.timeRange[1].format() : undefined,
      })
      .then()
      .catch((e) => message.error(e.message));
  }, [props.timeRange, props.sensorId]);

  const options: EChartOption = {
    color: [token.colorPrimary],
    backgroundColor: "",
    tooltip: {
      trigger: "axis",
      formatter: (t) => {
        return `
        <div>
            <span style="display: block">温度：${
              (t as echarts.EChartOption.Tooltip.Format[])[0].value
            } ${props.unit}</span>
            <span style="display: block">时间：${
              (t as echarts.EChartOption.Tooltip.Format[])[0].axisValue
            }</span>
        </div>
        `;
      },
    },
    xAxis: {
      type: "category",
      data: searchHook.data?.list?.reverse().map((i) => String(i.createdTime)),
    },
    yAxis: {
      type: "value",
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
      },
      {
        start: 0,
      },
    ],
    series: [
      {
        data: searchHook.data?.list
          ?.reverse()
          .map((i) => Number(i.value).toFixed(1)),
        type: "line",
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: lighten(token.colorPrimary, 25),
            },
            {
              offset: 0.6,
              color: setAlpha(token.colorPrimary, 0.2),
            },
            {
              offset: 1,
              color: "rgba(255,255,255,0)",
            },
          ]),
        },
        // stack: `${sensorIndex}号传感器`,
        // markPoint: {
        //   data: [
        //     {type: 'max', name: '最大值'},
        //     {type: 'min', name: '最小值'},
        //   ],
        // },
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
