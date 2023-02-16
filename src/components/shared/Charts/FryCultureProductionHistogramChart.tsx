import React, { CSSProperties } from "react";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts/lib/echarts";
import { EChartsOption } from "echarts";
import Flex from "../Flex";
import { Col, Row, Typography } from "antd";
import "./CultureProductionHistogramChart.less";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { CultureProductionApi, SorterOrder } from "../../../scaffold";
import { useMount } from "ahooks";

export function FryCultureProductionHistogramChart(props: {
  style?: CSSProperties;
}) {
  const searchHook = useOpenApiFpRequest(
    CultureProductionApi,
    CultureProductionApi.prototype.cultureProductionSearchGet
  );
  useMount(() => {
    searchHook.requestSync({
      pi: 1,
      ps: 3,
      sorterKey: "CreatedTime",
      sorterOrder: SorterOrder.Asc,
      platform: "自主创新",
    });
  });

  return (
    <div className="ProductionAnotherHistogramChart" style={props.style}>
      {searchHook.data?.list?.map((i, index) => {
        return (
          <Flex
            key={i.pondGroupName}
            direction={"column"}
            style={{ marginBottom: 4 }}
          >
            <Flex justify={"space-between"}>
              <Typography.Text
                style={{ flex: 1, color: "whitesmoke" }}
                strong={true}
              >
                {i.pondGroupName}
              </Typography.Text>
              {index === 0 && (
                <Row style={{ flex: 0.4, marginLeft: 72 }}>
                  <Col span={12}>
                    <Typography.Text style={{ color: "#363f71" }}>
                      同比
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text style={{ color: "#363f71" }}>
                      环比
                    </Typography.Text>
                  </Col>
                </Row>
              )}
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <div className="bar" style={{ flex: 1 }}>
                <div className="bar-line" style={{ width: i.percent + "%" }} />
              </div>
              <span style={{ width: 50, paddingLeft: 6 }}>{i.percent} %</span>
              <Row style={{ flex: 0.4, marginLeft: 16 }}>
                <Col span={12}>
                  <Typography.Text
                    style={{
                      color:
                        Number(i.yearOnYearBasis) > 0 ? "#0fe37b" : "#de2650",
                    }}
                    strong={true}
                  >
                    {Number(i.yearOnYearBasis)} %
                  </Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text
                    style={{
                      color:
                        Number(i.monthOnMonthBasis) > 0 ? "#0fe37b" : "#de2650",
                    }}
                    strong={true}
                  >
                    {Number(i.monthOnMonthBasis)} %
                  </Typography.Text>
                </Col>
              </Row>
            </Flex>
          </Flex>
        );
      })}
    </div>
  );
}
