import { message } from "antd";
import React, { useEffect, useRef } from "react";
import { EChartOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { Moment } from "moment";
import { SensorDataApi, SensorValueType } from "../../scaffold";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";

export const SensorDataLineChart = (props: {
  style?: React.CSSProperties;
  type: SensorValueType;
  unit: string;
  theme?: string;
  sensorId?: number;
  timeRange?: Array<Moment>;
}) => {
  const chart = useRef() as React.MutableRefObject<ReactEcharts>;
  const searchHook = useOpenApiFpRequest(
    SensorDataApi,
    SensorDataApi.prototype.sensorDataSearchGet
  );
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
    color: ["rgba(250, 167, 37,1)", "rgba(58, 166, 166,1)"],
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
    series: [
      {
        data: searchHook.data?.list
          ?.reverse()
          .map((i) => Number(i.value).toFixed(1)),
        type: "line",
        smooth: true,
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
