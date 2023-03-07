import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  StatisticCard,
} from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import RcResizeObserver from "rc-resize-observer";
import { Table } from "antd";
import "./Overview.less";
import SensorSelector from "../../../components/shared/Sensor/SensorSelector";
import { AsString } from "../../../utils/AsString";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { SensorApi, WaterQualityType } from "../../../scaffold";
import { useMount } from "ahooks";
import { SensorAlertPieChart } from "../../../components/shared/Sensor/SensorAlertPieChart";
import { SensorDataHistory } from "../../../components/shared/Sensor/SensorDataHistory";
import { SensorStatisticCards } from "../../../components/shared/Sensor/SensorStatisticCards";
import { useFirstSensor } from "../../../utils/useFirstSensor";
export function SensorOverviewPage() {
  const [responsive, setResponsive] = useState(false);
  const [sensorId, setSensorId] = useState<number>();
  const firstSensorHook = useFirstSensor();
  const sensorFindHook = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );

  useMount(async () => {
    const item = await firstSensorHook.search();
    item && setSensorId(item?.id);
  });

  useEffect(() => {
    if (!sensorId) return;
    sensorFindHook.requestSync({
      id: sensorId,
    });
  }, [sensorId]);

  return (
    <PageContainer className="SensorOverview">
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          split={responsive ? "horizontal" : "vertical"}
          headerBordered
          bordered
        >
          <ProCard split="horizontal">
            <ProCard
              split="horizontal"
              title={
                <ProForm submitter={false} layout="inline">
                  <ProForm.Item label={"选择传感器"}>
                    <SensorSelector
                      value={AsString(sensorId)}
                      onChange={(v) => {
                        v && setSensorId(Number(v));
                      }}
                      style={{ width: 120 }}
                    />
                  </ProForm.Item>
                </ProForm>
              }
            >
              {sensorId && <SensorStatisticCards sensorId={sensorId} />}
            </ProCard>
            {sensorId && <SensorDataHistory sensorId={sensorId} />}
          </ProCard>
          <ProCard split="horizontal">
            <StatisticCard
              title="水质报警"
              chart={<SensorAlertPieChart height={400} />}
            />
            <StatisticCard title="水质报警历史" chart={<Table />} />
          </ProCard>
        </ProCard>
      </RcResizeObserver>
    </PageContainer>
  );
}
