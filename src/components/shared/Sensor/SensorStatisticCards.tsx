import { ProCard, ProForm, StatisticCard } from "@ant-design/pro-components";
import { DatePicker, Tabs, Typography } from "antd";
import * as dayjs from "dayjs";
import { SensorDataLineChart } from "../SensorDataLineChart";
import { SensorApi, WaterQualityType } from "../../../scaffold";
import React, { CSSProperties, useEffect, useState } from "react";
import SensorSelector from "./SensorSelector";
import { AsString } from "../../../utils/AsString";
import { SensorDataHistory } from "./SensorDataHistory";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
const { Statistic } = StatisticCard;
import "./SensorStatisticCards.less";
export function SensorStatisticCards(props: {
  sensorId: number;
  style?: CSSProperties;
}) {
  const sensorFindHook = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  useEffect(() => {
    props.sensorId && sensorFindHook.requestSync({ id: props.sensorId });
  }, [props.sensorId]);
  const sensorId = props.sensorId;
  return (
    <ProCard
      split="horizontal"
      className="SensorStatisticCards"
      style={props.style}
    >
      <ProCard split="horizontal">
        <ProCard split="vertical">
          <StatisticCard
            statistic={{
              title: "PH",
              value: sensorFindHook.data?.ph,
              valueRender: (value) => (
                <div className="statics-card-value">{value}</div>
              ),
              description: (
                <Statistic title="较本月平均 PH" value="0.1" trend="down" />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: "溶解氧",
              value: sensorFindHook.data?.dissolvedOxygen,
              valueRender: (value) => (
                <div className="statics-card-value">{value}</div>
              ),
              description: (
                <Statistic title="较本月平均 溶解氧" value="0" trend="up" />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: "浊度",
              value: sensorFindHook.data?.turbidity,
              valueRender: (value) => (
                <div className="statics-card-value">{value}</div>
              ),
              description: (
                <Statistic title="较本月平均浊度" value="0" trend="up" />
              ),
            }}
          />
        </ProCard>
        <ProCard split="vertical">
          <StatisticCard
            statistic={{
              title: "氨氮",
              value: sensorFindHook.data?.ammoniaNitrogen,
              valueRender: (value) => (
                <div className="statics-card-value">{value}</div>
              ),
              description: (
                <Statistic title="较本月平均 氨氮" value="0" trend="up" />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: "温度",
              value: sensorFindHook.data?.temperature,
              valueRender: (value) => (
                <div className="statics-card-value">{value}</div>
              ),
              description: (
                <Statistic title="较本月平均温度" value="0" trend="down" />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: "盐度",
              value: sensorFindHook.data?.salinity,
              valueRender: (value) => (
                <div className="statics-card-value">{value}</div>
              ),
              description: (
                <Statistic title="较本月平均盐度" value="0" trend="down" />
              ),
            }}
          />
        </ProCard>
      </ProCard>
    </ProCard>
  );
}
