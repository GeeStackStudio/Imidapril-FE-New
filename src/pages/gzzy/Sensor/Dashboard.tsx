import React, { useState } from "react";
import "./Dashboard.less";
import { useInterval, useMount } from "ahooks";
import { Col, DatePicker, Form, Row } from "antd";
import moment, { Moment } from "moment";
import {
  SensorApi,
  SensorApiFactory,
  SensorValueType,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import Flex from "../../../components/shared/Flex";
import { SensorDataLineChart } from "../../../components/shared/SensorDataLineChart";
import { SensorDescriptionItem } from "../../../components/shared/Sensor/SensorDescriptionItem";
import { SensorCard } from "../../../components/shared/Sensor/SensorCard";

const SensorDashboardPage = () => {
  const [currentTime, setCurrentTime] = useState<Moment>(moment());
  const queryHook1 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook2 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook3 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook4 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook5 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook6 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook7 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook8 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook9 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  const queryHook10 = useOpenApiFpRequest(
    SensorApi,
    SensorApi.prototype.sensorFindGet
  );
  useMount(() => {
    queryHook1.requestSync({
      id: 8,
    });
    queryHook2.requestSync({
      id: 10,
    });
    queryHook3.requestSync({
      id: 7,
    });
    queryHook4.requestSync({
      id: 6,
    });
    queryHook5.requestSync({
      id: 5,
    });
    queryHook6.requestSync({
      id: 4,
    });
    queryHook7.requestSync({
      id: 3,
    });
    queryHook8.requestSync({
      id: 2,
    });
    queryHook9.requestSync({
      id: 1,
    });
    queryHook10.requestSync({
      id: 9,
    });
  });

  const [temperatureTimeRange, setTemperatureTimeRange] = useState<Moment[]>([
    moment().subtract(1, "day"),
    moment().add(1, "day"),
  ]);
  useInterval(() => {
    setCurrentTime(moment());
  }, 1000);

  return (
    <div className="page">
      <video autoPlay muted loop id="video">
        <source
          src="http://exservan-public.oss-cn-shanghai.aliyuncs.com/video.mp4"
          type="video/mp4"
        />
      </video>
      <div className="content" style={{ marginLeft: 16 }}>
        <div className="left" style={{ marginTop: 32 }}>
          <div className="card title-card">
            <h1>水质在线监测系统</h1>
          </div>
          <div className="card">
            <Row
              style={{
                width: "100%",
                padding: 16,
                display: "flex",
                alignItems: "center",
              }}
              gutter={16}
            >
              <Col span={12}>
                <iframe
                  scrolling="no"
                  height="100"
                  frameBorder="0"
                  allowTransparency={true}
                  src="https://i.tianqi.com?c=code&id=35&color=%23FFFFFF&icon=1&site=34&py=taishan"
                />
              </Col>
              <Col span={10}>
                <div
                  className="date"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span className="date-text">
                      {currentTime.format("YYYY")}
                    </span>
                    <span className="date-divider">/</span>
                    <span className="date-text">
                      {currentTime.format("MM")}
                    </span>
                    <span className="date-divider">/</span>
                    <span className="date-text">
                      {currentTime.format("DD")}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "rgb(58,166,166)",
                      fontSize: 8,
                    }}
                  >
                    {currentTime.format("ddd")}
                  </span>
                </div>
                <div className="time">
                  <span className="time-text">{currentTime.format("HH")}</span>
                  <span className="time-divider">:</span>
                  <span className="time-text">{currentTime.format("mm")}</span>
                  <span className="time-divider">:</span>
                  <span className="time-text">{currentTime.format("ss")}</span>
                </div>
              </Col>
            </Row>
          </div>

          <SensorCard sensor={queryHook1.data} />
          <SensorCard sensor={queryHook2.data} />
        </div>
        <div
          className="middle"
          style={{
            marginLeft: 16,
            marginRight: 16,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <SensorCard sensor={queryHook3.data} />
          <SensorCard sensor={queryHook4.data} />
          <SensorCard sensor={queryHook5.data} />
          <SensorCard sensor={queryHook6.data} />
        </div>
        <div
          className="right"
          style={{
            marginLeft: 16,
            marginRight: 16,
            flex: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <SensorCard sensor={queryHook7.data} />
          <SensorCard sensor={queryHook8.data} />
          <SensorCard sensor={queryHook9.data} />
          <SensorCard sensor={queryHook10.data} />
        </div>
      </div>
    </div>
  );
};
export default SensorDashboardPage;
