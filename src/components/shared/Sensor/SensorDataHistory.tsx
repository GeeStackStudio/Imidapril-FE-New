import { ProForm, StatisticCard } from "@ant-design/pro-components";
import { DatePicker, Tabs } from "antd";
import * as dayjs from "dayjs";
import { SensorDataLineChart } from "../SensorDataLineChart";
import { WaterQualityType } from "../../../scaffold";
import React, { useState } from "react";

export function SensorDataHistory(props: { sensorId: number }) {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(3, "day"),
    dayjs(),
  ]);
  return (
    <StatisticCard
      title={
        <ProForm layout="inline" submitter={false}>
          <ProForm.Item label={"选择时间范围"}>
            <DatePicker.RangePicker
              value={dateRange}
              onChange={(date, dateString) => {
                console.log(date, dateString);
                date && setDateRange([dayjs(date[0]), dayjs(date[1])]);
              }}
              allowClear={false}
            />
          </ProForm.Item>
        </ProForm>
      }
      chart={
        <div>
          <Tabs defaultActiveKey="温度">
            <Tabs.TabPane tab="温度" key="温度">
              <SensorDataLineChart
                type={WaterQualityType.温度}
                sensorId={props.sensorId}
                timeRange={dateRange}
                unit={"℃"}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="氨氮" key="氨氮">
              <SensorDataLineChart
                type={WaterQualityType.氨氮}
                sensorId={props.sensorId}
                timeRange={dateRange}
                unit={""}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="PH" key="PH">
              <SensorDataLineChart
                type={WaterQualityType.Ph}
                sensorId={props.sensorId}
                timeRange={dateRange}
                unit={""}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="溶解氧" key="溶解氧">
              <SensorDataLineChart
                type={WaterQualityType.溶解氧}
                sensorId={props.sensorId}
                timeRange={dateRange}
                unit={""}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="盐度" key="盐度">
              <SensorDataLineChart
                type={WaterQualityType.盐度}
                sensorId={props.sensorId}
                timeRange={dateRange}
                unit={""}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="浊度" key="浊度">
              <SensorDataLineChart
                type={WaterQualityType.浊度}
                sensorId={props.sensorId}
                timeRange={dateRange}
                unit={""}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      }
    />
  );
}
