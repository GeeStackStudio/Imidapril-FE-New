import {
  Avatar,
  Button,
  Card,
  Col,
  message,
  Modal,
  Row,
  Table,
  Tabs,
  Typography,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { CultureBatchApi } from "../../scaffold";
import { useMount } from "ahooks";
import { useQueryParams } from "../../utils/useQueryParams";
import { useBoolean } from "react-hanger";
import CultureBatchForm from "../../components/shared/CultureBatch/CultureBatchForm";
import LayoutPage from "../../components/Layout/LayoutPage";
import Flex from "../../components/shared/Flex";
import {
  GiWaterRecycling,
  RiCalendarTodoFill,
  GiFishingNet,
  AiFillCheckCircle,
} from "react-icons/all";
import { CultureBatchTableCtrl } from "../../components/shared/CultureBatch/CultureBatchTableCtrl";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { ProductionStackChart } from "../../components/shared/Charts/ProductionStackChart";

type PageTab = "Working" | "Done";

export function CulturePage() {
  const searchHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchSearchGet
  );
  const query = useQueryParams();
  const isAdd = useBoolean(false);
  const [currentTab, setCurrentTab] = useState<PageTab>("Working");
  const navigate = useNavigate();
  useMount(() => {
    searchHook.request({
      pi: 1,
      ps: 999,
      isDone: false,
    });
  });
  return (
    <PageContainer>
      <Flex direction={"column"} style={{ margin: "auto" }}>
        <Flex style={{ width: "100%" }} direction={"row"}>
          <ProCard style={{ borderRadius: 3, width: 376 }}>
            <Flex direction="row" align={"center"} justify={"space-between"}>
              <Flex direction={"column"}>
                <Typography.Text style={{ fontSize: 32 }}>{14}</Typography.Text>
                <Typography.Text style={{ fontSize: 16 }} type={"secondary"}>
                  今日待完成任务数
                </Typography.Text>
              </Flex>
              <Flex
                style={{
                  position: "absolute",
                  right: -20,
                  background: "rgba(236,82,36,1)",
                  boxShadow: "0 0 10px 3px rgba(236,82,36,0.6)",
                  padding: 8,
                }}
              >
                <RiCalendarTodoFill
                  style={{ fontSize: 40, color: "rgb(255,255,255)" }}
                />
              </Flex>
            </Flex>
          </ProCard>
          <ProCard style={{ borderRadius: 3, marginLeft: 64, width: 376 }}>
            <Flex direction="row" align={"center"} justify={"space-between"}>
              <Flex direction={"column"}>
                <Typography.Text style={{ fontSize: 32 }}>{3}</Typography.Text>
                <Typography.Text style={{ fontSize: 16 }} type={"secondary"}>
                  今日已完成任务
                </Typography.Text>
              </Flex>
              <Flex
                style={{
                  position: "absolute",
                  right: -20,
                  background: "rgba(80,177,133,1)",
                  boxShadow: "0 0 10px 3px rgba(80,177,133,0.6)",
                  padding: 8,
                }}
              >
                <AiFillCheckCircle
                  style={{ fontSize: 40, color: "rgb(255,255,255)" }}
                />
              </Flex>
            </Flex>
          </ProCard>
          <ProCard style={{ borderRadius: 3, marginLeft: 64, width: 376 }}>
            <Flex direction="row" align={"center"} justify={"space-between"}>
              <Flex direction={"column"}>
                <Typography.Text style={{ fontSize: 32 }}>{3}</Typography.Text>
                <Typography.Text style={{ fontSize: 16 }} type={"secondary"}>
                  进行中养殖计划
                </Typography.Text>
              </Flex>
              <Flex
                style={{
                  position: "absolute",
                  right: -20,
                  background: "rgba(109,40,243,1)",
                  padding: 8,
                }}
              >
                <GiFishingNet
                  style={{ fontSize: 40, color: "rgb(255,255,255)" }}
                />
              </Flex>
            </Flex>
          </ProCard>
          <ProCard style={{ borderRadius: 3, marginLeft: 64, width: 376 }}>
            <Flex direction="row" align={"center"} justify={"space-between"}>
              <Flex direction={"column"}>
                <Typography.Text style={{ fontSize: 32 }}>{31}</Typography.Text>
                <Typography.Text style={{ fontSize: 16 }} type={"secondary"}>
                  待处理环境预警
                </Typography.Text>
              </Flex>
              <Flex
                style={{
                  position: "absolute",
                  right: -20,
                  background: "rgba(83,185,216,1)",
                  padding: 8,
                }}
              >
                <GiWaterRecycling
                  style={{ fontSize: 40, color: "rgb(255,255,255)" }}
                />
              </Flex>
            </Flex>
          </ProCard>
        </Flex>
        <Flex style={{ marginTop: 32 }}>
          <ProCard style={{ width: "100%" }} split="vertical">
            <ProCard title="日产量堆叠柱状图" colSpan="40%">
              <ProductionStackChart />
            </ProCard>
            <ProCard
              title="进行中养殖任务"
              subTitle={"查看并管理进行中的养殖任务"}
            >
              <Button
                type="primary"
                onClick={() => {
                  isAdd.setTrue();
                }}
              >
                开始新养殖计划
              </Button>
              <CultureBatchTableCtrl
                onClickDetail={(row) => navigate("/culture/" + row.id)}
                style={{ marginTop: 16 }}
              />
            </ProCard>
          </ProCard>
        </Flex>
      </Flex>

      {/*<Card style={{margin: 16}}>*/}
      {/*  <Table<CultureBatchDto> {...tableProps} rowKey={'id'} rowClassName={UseZebra}>*/}
      {/*    <Table.Column<CultureBatchDto> title="养殖编号" dataIndex="code" />*/}
      {/*    <Table.Column<CultureBatchDto> title="养殖批次类型" dataIndex="type" render={_ => <CultureBatchTypeTag type={_} />} />*/}
      {/*    <Table.Column<CultureBatchDto> title="开始养殖时间" dataIndex="createdTime" />*/}
      {/*    <Table.Column<CultureBatchDto>*/}
      {/*      title="放苗时间"*/}
      {/*      dataIndex="fryTime"*/}
      {/*      render={_ => {*/}
      {/*        return _ ?? '尚未放苗';*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <Table.Column<CultureBatchDto> title="养殖品种" dataIndex={['breed', 'name']} />*/}
      {/*    <Table.Column<CultureBatchDto>*/}
      {/*      title="操作"*/}
      {/*      render={(text, row) => {*/}
      {/*        return (*/}
      {/*          <Button.Group>*/}
      {/*            <Button type={'link'}>编辑</Button>*/}
      {/*            <Button type={'link'}>养殖看板</Button>*/}
      {/*          </Button.Group>*/}
      {/*        );*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </Table>*/}
      {/*</Card>*/}
      <Modal
        title="创建新养殖计划"
        open={isAdd.value}
        width={1000}
        onCancel={isAdd.setFalse}
        footer={null}
      >
        <CultureBatchForm
          onSuccess={(row) => {
            navigate("/cultureDetail/" + row?.id);
          }}
        />
      </Modal>
    </PageContainer>
  );
}
