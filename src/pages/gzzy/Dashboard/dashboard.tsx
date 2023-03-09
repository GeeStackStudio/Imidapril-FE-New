import React, { useEffect, useMemo, useState } from "react";
import {
  Col,
  Descriptions,
  message,
  Row,
  Spin,
  Switch,
  Typography,
} from "antd";
import "./index.less";
import { useMount } from "ahooks";
import HeadImg from "../../../assets/head.png";
import knowledgeStoreImage from "../../../assets/knowledge-store.png";
import productManageImage from "../../../assets/product-manage.png";
import smartDeviceImage from "../../../assets/smart-device.png";
import cultureDataImage from "../../../assets/culture-data.png";
import qualityControlImage from "../../../assets/quality-control.png";
import {
  CultureBriefApi,
  DeviceApi,
  NotificationApi,
  PondApi,
  SorterOrder,
  WaterQualityType,
  WorkShopApi,
} from "../../../scaffold";
import { BlueCard } from "../../../components/shared/BlueCard";
import Flex from "../../../components/shared/Flex";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { PercentChart } from "../../../components/shared/PercentChart";
import { CultureProductionHistogramChart } from "../../../components/shared/Charts/CultureProductionHistogramChart";
import { CultureDataPanel } from "../../../components/shared/Charts/CultureDataPanel";
import { MissionFinishLineChart } from "../../../components/shared/MissionFinishLineChart";
import { useNavigate } from "react-router-dom";

const GzzyAppIndexPage: React.FunctionComponent<any> = () => {
  const history = useNavigate();
  const cultureBriefHook = useOpenApiFpRequest(
    CultureBriefApi,
    CultureBriefApi.prototype.cultureBriefSearchGet
  );
  const notificationSearchHook = useOpenApiFpRequest(
    NotificationApi,
    NotificationApi.prototype.notificationSearchGet
  );
  const deviceSearchHook = useOpenApiFpRequest(
    DeviceApi,
    DeviceApi.prototype.deviceSearchGet
  );
  const pondSearchHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  function refresh() {
    cultureBriefHook.requestSync({
      pi: 1,
      ps: 1,
    });
    notificationSearchHook.requestSync({
      pi: 1,
      ps: 1,
    });
    pondSearchHook.requestSync({
      pi: 1,
      ps: 999,
      sorterOrder: SorterOrder.Asc,
      sorterKey: "name",
    });
    deviceSearchHook.requestSync({
      pi: 1,
      ps: 999,
      sorterOrder: SorterOrder.Asc,
      sorterKey: "name",
    });
  }

  useMount(() => {
    refresh();
  });
  const brief = useMemo(() => {
    return cultureBriefHook.data?.list &&
      cultureBriefHook.data?.list?.length > 0
      ? cultureBriefHook.data?.list[0]
      : undefined;
  }, [cultureBriefHook.data]);
  const notification = useMemo(() => {
    return notificationSearchHook.data?.list &&
      notificationSearchHook.data?.list?.length > 0
      ? notificationSearchHook.data?.list[0]
      : undefined;
  }, [notificationSearchHook.data]);
  return (
    <div className="index-page">
      <Flex
        className="head"
        align={"center"}
        direction="column"
        justify={"center"}
      >
        <img src={HeadImg} alt="head" style={{ margin: "auto", height: 64 }} />
        <Flex direction={"column"} justify={"center"} align={"center"}>
          <span className="title">陆基池塘智慧养殖系统</span>
          {/*<span className="sub-title">循环水精准养殖智能管控和网络化服务行业模式与示范</span>*/}
        </Flex>
      </Flex>
      <Row style={{ margin: 32 }} gutter={32}>
        <Col span={7}>
          <BlueCard
            title={notification?.title ?? "最新公告"}
            style={{ height: 130 }}
          >
            <div style={{ padding: 20 }}>
              <Typography.Text
                style={{
                  color: "white",
                  display: "inline-block",
                  letterSpacing: 1,
                  textIndent: 30,
                }}
                strong
              >
                {notification?.content}
              </Typography.Text>
              <Typography.Text
                style={{
                  color: "white",
                  display: "block",
                  textAlign: "right",
                  letterSpacing: 1,
                  textIndent: 30,
                }}
                strong
              >
                {notification?.createdTime}
              </Typography.Text>
            </div>
          </BlueCard>
          <BlueCard title="养殖计划" style={{ marginTop: 32, height: 470 }}>
            <div style={{ padding: 20 }}>
              <Row style={{ marginTop: 8 }} gutter={16}>
                <Col span={8}>
                  <Flex direction={"column"} align={"center"}>
                    <Typography.Text
                      style={{
                        color: "whitesmoke",
                        fontSize: 16,
                        letterSpacing: 1,
                      }}
                      strong
                    >
                      完成率
                    </Typography.Text>
                    <PercentChart
                      style={{ width: "100%", height: 150, marginTop: 16 }}
                      percent={brief ? Number(brief.percent) / 100 : 0}
                      suffix={"%"}
                    />
                  </Flex>
                </Col>
                <Col span={16}>
                  <MissionFinishLineChart
                    theme="dark"
                    style={{ height: 250 }}
                  />
                </Col>
              </Row>
              <div
                style={{
                  background: "#021a59",
                  textAlign: "center",
                  padding: "4px 0",
                }}
              >
                <Typography.Text
                  style={{ color: "#02c2e5", fontSize: 14 }}
                  strong
                >
                  养殖数据
                </Typography.Text>
              </div>
              {brief && <CultureDataPanel brief={brief} />}
            </div>
          </BlueCard>
          <BlueCard title="产量数据" style={{ marginTop: 32, height: 262 }}>
            <div style={{ padding: 20 }}>
              <CultureProductionHistogramChart style={{ marginTop: 4 }} />
            </div>
          </BlueCard>
        </Col>
        <Col span={16}>
          <Flex
            wrap={"wrap"}
            style={{ height: 632, margin: "auto", overflow: "scroll" }}
          >
            {pondSearchHook.data?.list?.map((i) => (
              <BlueCard
                style={{ width: 292, marginRight: 9, marginTop: 12 }}
                key={i.id}
                title={i.name ?? ""}
              >
                <Flex style={{ padding: 20 }} direction={"column"}>
                  <Flex align={"center"} style={{ marginBottom: 4 }}>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#52c41a",
                      }}
                    ></div>
                    <Typography.Text style={{ marginLeft: 8, color: "white" }}>
                      养殖中
                    </Typography.Text>
                  </Flex>
                  <Descriptions size={"small"} column={1}>
                    <Descriptions.Item
                      label={
                        <Typography.Text style={{ color: "white" }}>
                          养殖批次
                        </Typography.Text>
                      }
                    >
                      <Typography.Text style={{ color: "white" }}>
                        202203
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      labelStyle={{ color: "white" }}
                      contentStyle={{ color: "white" }}
                      label={"养殖周期"}
                    >
                      4 天
                    </Descriptions.Item>
                  </Descriptions>
                </Flex>
              </BlueCard>
            ))}
          </Flex>
          <Row gutter={32}>
            <Col span={12}>
              <BlueCard title="精细管理体系" style={{ marginTop: 32 }}>
                <Flex
                  style={{ padding: 32, height: 243 }}
                  justify={"space-around"}
                  align={"center"}
                >
                  <Flex
                    className="entry-item"
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history("/culture/list");
                    }}
                  >
                    <img src={productManageImage} />
                    <Typography.Text
                      style={{ color: "#02c2e5", marginTop: 8 }}
                      strong
                    >
                      精细化生产管理
                    </Typography.Text>
                  </Flex>
                  <Flex
                    className="entry-item"
                    direction={"column"}
                    align={"center"}
                    style={{ cursor: "pointer" }}
                    justify={"center"}
                  >
                    <img src={knowledgeStoreImage} />
                    <Typography.Text
                      style={{ color: "#02c2e5", marginTop: 8 }}
                      strong
                    >
                      养殖专家知识库
                    </Typography.Text>
                  </Flex>
                  <Flex
                    className="entry-item"
                    direction={"column"}
                    align={"center"}
                    style={{ cursor: "pointer" }}
                    justify={"center"}
                    onClick={() => {
                      history("/device/overview");
                    }}
                  >
                    <img src={smartDeviceImage} />
                    <Typography.Text
                      style={{ color: "#02c2e5", marginTop: 8 }}
                      strong
                    >
                      智能化设备
                    </Typography.Text>
                  </Flex>
                  {/*<Flex*/}
                  {/*  className="entry-item"*/}
                  {/*  direction={"column"}*/}
                  {/*  align={"center"}*/}
                  {/*  style={{ cursor: "pointer" }}*/}
                  {/*  justify={"center"}*/}
                  {/*>*/}
                  {/*  <img src={cultureDataImage} />*/}
                  {/*  <Typography.Text*/}
                  {/*    style={{ color: "#02c2e5", marginTop: 8 }}*/}
                  {/*    strong*/}
                  {/*  >*/}
                  {/*    养殖数据分析*/}
                  {/*  </Typography.Text>*/}
                  {/*</Flex>*/}
                  {/*<Flex*/}
                  {/*  className="entry-item"*/}
                  {/*  direction={"column"}*/}
                  {/*  align={"center"}*/}
                  {/*  justify={"center"}*/}
                  {/*  style={{ cursor: "pointer" }}*/}
                  {/*>*/}
                  {/*  <img src={qualityControlImage} />*/}
                  {/*  <Typography.Text*/}
                  {/*    style={{ color: "#02c2e5", marginTop: 8 }}*/}
                  {/*    strong*/}
                  {/*  >*/}
                  {/*    养殖过程质量控制*/}
                  {/*  </Typography.Text>*/}
                  {/*</Flex>*/}
                </Flex>
              </BlueCard>
            </Col>
            <Col span={12}>
              <BlueCard title="设备控制" style={{ marginTop: 32 }}>
                <div style={{ padding: 20, height: 243, overflow: "scroll" }}>
                  <Row
                    style={{ padding: "4px 0 4px 32px", background: "#0b164e" }}
                  >
                    <Col span={12}>
                      <Typography.Text
                        style={{ color: "whitesmoke", fontSize: 14 }}
                        strong
                      >
                        名称
                      </Typography.Text>
                    </Col>
                    <Col span={4}>
                      <Typography.Text
                        style={{ color: "whitesmoke", fontSize: 14 }}
                        strong
                      >
                        类型
                      </Typography.Text>
                    </Col>
                    <Col span={2}>
                      <Typography.Text
                        style={{ color: "whitesmoke", fontSize: 14 }}
                        strong
                      >
                        状态
                      </Typography.Text>
                    </Col>
                    <Col span={6}>
                      <Flex justify={"center"}>
                        <Typography.Text
                          style={{ color: "whitesmoke", fontSize: 14 }}
                          strong
                        >
                          开关
                        </Typography.Text>
                      </Flex>
                    </Col>
                  </Row>
                  {deviceSearchHook.data?.list?.map((i) => (
                    <Row key={i.id} style={{ padding: "4px 0 4px 32px" }}>
                      <Col span={12}>
                        <Typography.Text
                          style={{ color: "whitesmoke", fontSize: 14 }}
                          strong
                        >
                          {i.name}
                        </Typography.Text>
                      </Col>
                      <Col span={4}>
                        <Typography.Text
                          style={{ color: "rgb(0,255,255)", fontSize: 14 }}
                          strong
                        >
                          关闭中
                        </Typography.Text>
                      </Col>
                      <Col span={2}>
                        <Typography.Text
                          style={{ color: "whitesmoke", fontSize: 14 }}
                          strong
                        >
                          在线
                        </Typography.Text>
                      </Col>
                      <Col span={6}>
                        <Flex justify={"center"}>
                          <Switch />
                        </Flex>
                      </Col>
                    </Row>
                  ))}
                </div>
              </BlueCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default GzzyAppIndexPage;
