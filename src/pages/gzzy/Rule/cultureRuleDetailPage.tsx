import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";

import {
  CultureRuleApi,
  CultureRuleDetailApi,
  CultureRuleDetailDto,
  CultureRulePeriodApi,
  CultureRulePeriodDto,
  PondApi,
  RepeatType,
} from "../../../scaffold";
import CultureRulePeriodForm from "../../../components/shared/CultureRulePeriod/CultureRulePeriodForm";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import {
  CultureRulePeriodSortableCard,
  CultureRulePeriodSortableCardRef,
} from "../../../components/shared/CultureRulePeriod/CultureRulePeriodSortableCard";
import PlantCultureRuleDetailForm from "../../../components/shared/CultureRuleDetail/PlantCultureRuleDetailForm";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import React, { useEffect, useRef, useState } from "react";
import { CultureRuleDetailTimeCalender } from "../../../components/shared/CultureRule/CultureRuleDetailTimeCalender";
import Flex from "../../../components/shared/Flex";
import { useParams } from "react-router-dom";
import { BeautifiedEmpty } from "../../../components/shared/BeautifiedEmpty/BeautifiedEmpty";
import { useBoolean } from "react-hanger";
import {
  Button,
  Descriptions,
  message,
  Modal,
  notification,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { useMount } from "ahooks";

export function CultureRuleDetailPage() {
  const findHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleFindGet
  );
  const removeDetailHook = useOpenApiFpRequest(
    CultureRuleDetailApi,
    CultureRuleDetailApi.prototype.cultureRuleDetailRemovePost
  );
  const removePeriodHook = useOpenApiFpRequest(
    CultureRulePeriodApi,
    CultureRulePeriodApi.prototype.cultureRulePeriodRemovePost
  );
  const findPeriodHook = useOpenApiFpRequest(
    CultureRulePeriodApi,
    CultureRulePeriodApi.prototype.cultureRulePeriodFindGet
  );
  const listCultureRulePeriodHook = useOpenApiFpRequest(
    CultureRulePeriodApi,
    CultureRulePeriodApi.prototype.cultureRulePeriodSearchGet
  );
  const listCultureRuleDetailHook = useOpenApiFpRequest(
    CultureRuleDetailApi,
    CultureRuleDetailApi.prototype.cultureRuleDetailSearchGet
  );
  const findCultureRuleDetailHook = useOpenApiFpRequest(
    CultureRuleDetailApi,
    CultureRuleDetailApi.prototype.cultureRuleDetailFindGet
  );
  const routeParams = useParams<{ id: string }>();
  const cardsRef =
    useRef<CultureRulePeriodSortableCardRef>() as React.MutableRefObject<CultureRulePeriodSortableCardRef>;
  const isAddPeriod = useBoolean(false);
  const isAddDetail = useBoolean(false);
  const [editingPeriod, setEditingPeriod] = useState<CultureRulePeriodDto>();
  const [currentTab, setCurrentTab] = useState("Config");
  const [currentDetailId, setCurrentDetailId] = useState<number>();
  const [currentPeriodId, setCurrentPeriodId] = useState<number>();
  const pondSearchHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );

  useMount(() => {
    pondSearchHook.requestSync({
      pi: 1,
      ps: 999,
    });
  });

  function refreshRuleDetail(cultureRuleId: number, periodId?: number) {
    if (periodId) {
      findPeriodHook.requestSync({
        id: periodId,
      });
    } else {
      findPeriodHook.setData(undefined);
    }
    listCultureRuleDetailHook.requestSync({
      cultureRulePeriodId: periodId,
      cultureRuleId: cultureRuleId,
      pi: 1,
      ps: 999,
    });
  }

  function refresh() {
    if (routeParams) {
      const ruleId = Number(routeParams.id);
      findHook.requestSync({
        id: Number(routeParams.id),
      });
      cardsRef.current?.refresh();
      listCultureRulePeriodHook.requestSync({
        pi: 1,
        ps: 999,
        cultureRuleId: ruleId,
      });
      refreshRuleDetail(ruleId, currentPeriodId);
    }
  }
  async function removeDetail(row: CultureRuleDetailDto) {
    await ConfirmAsync({
      title: "您确认要删除吗?",
      content: "删除之后,数据将无法恢复",
    });
    removeDetailHook
      .request({
        cultureRuleDetailRemoveParams: {
          id: Number(row.id),
        },
      })
      .then(() => {
        refresh();
        notification.success({
          message: "删除成功",
          description: "您已成功删除此任务配置",
        });
      })
      .catch((e) => message.error(e.message));
  }

  async function removePeriod(row: CultureRuleDetailDto) {
    await ConfirmAsync({
      title: "您确认要删除吗?",
      content: "删除之后,生产阶段的配置将一并删除",
    });
    setCurrentPeriodId(undefined);
    removePeriodHook
      .request({
        cultureRulePeriodRemoveParams: {
          id: Number(row.id),
        },
      })
      .then((r) => {
        refresh();
        notification.success({
          message: "删除成功",
          description: "您已成功删除此生产阶段",
        });
      })
      .catch((e) => message.error(e.message));
  }

  useMount(() => {
    refresh();
  });

  useEffect(() => {
    if (routeParams) {
      refreshRuleDetail(Number(routeParams?.id), currentPeriodId);
    }
  }, [currentPeriodId]);

  useEffect(() => {
    if (currentDetailId) {
      findCultureRuleDetailHook.requestSync({
        id: currentDetailId,
      });
    }
  }, [currentDetailId]);

  return (
    <PageContainer
      title={`生产规则配置 : ${findHook.data?.name}`}
      subTitle={`您正在配置 ${findHook.data?.name} 生产规则，您可以配置各个阶段的生产任务，智能排程将自动按照任务进行安排`}
      extra={
        <Button onClick={isAddPeriod.setTrue} type="primary">
          添加生产阶段
        </Button>
      }
      tabList={[
        {
          tab: "配置",
          key: "Config",
        },
        {
          tab: "预览",
          key: "Preview",
        },
      ]}
    >
      {currentTab === "Config" && (
        <Flex direction={"row"} style={{ margin: "0 32px 32px 0" }}>
          {findHook.data?.id && (
            <CultureRulePeriodSortableCard
              ref={cardsRef}
              showGlobal={true}
              style={{ width: 300 }}
              onItemClick={(row) => {
                setCurrentPeriodId(row?.id);
              }}
              onEditClick={(row) => {
                setEditingPeriod(row);
              }}
              onRemoveClick={(row) => {
                row && removePeriod(row);
              }}
              id={findHook.data.id}
            />
          )}
          <Flex direction={"column"} style={{ marginLeft: 32, width: "100%" }}>
            <Typography.Title level={4}>
              {findPeriodHook.data?.name ?? "全局规则"}
              <Button
                type="primary"
                onClick={isAddDetail.setTrue}
                style={{ marginLeft: 20 }}
              >
                添加
              </Button>
            </Typography.Title>
            {listCultureRuleDetailHook.data?.list?.length === 0 && (
              <ProCard>
                <BeautifiedEmpty title={"尚未配置规则"} />
              </ProCard>
            )}
            <Flex wrap={"wrap"}>
              {listCultureRuleDetailHook.data?.list?.map((i) => (
                <ProCard
                  size="small"
                  title={
                    <Flex direction={"row"} justify={"space-between"}>
                      <div>
                        <span style={{ color: "#2196F3" }}>{i.type}</span> 规则
                      </div>
                      <div>
                        <Typography.Link
                          style={{ color: "#2196F3", cursor: "pointer" }}
                          onClick={() => {
                            setCurrentDetailId(i.id);
                          }}
                        >
                          修改
                        </Typography.Link>
                        <Typography.Link
                          style={{ marginLeft: 4, cursor: "pointer" }}
                          onClick={() => {
                            removeDetail(i);
                          }}
                          type={"danger"}
                        >
                          删除
                        </Typography.Link>
                      </div>
                    </Flex>
                  }
                  key={i.id}
                  style={{ width: 300, margin: 8 }}
                >
                  <Descriptions column={1}>
                    {/*<Descriptions.Item label="任务类型">*/}
                    {/*  <Tag color="#2196F3">{i.type}</Tag>*/}
                    {/*</Descriptions.Item>*/}

                    <Descriptions.Item label="任务预计开始时间">
                      {i.isFullDay && <Tag color="#1890ff">全天任务</Tag>}
                      {!i.isFullDay && (
                        <Tag color="#13c2c2">
                          {i.preferHour?.toString().padStart(2, "0")} :{" "}
                          {i.preferTime?.toString().padStart(2, "0")}
                        </Tag>
                      )}
                    </Descriptions.Item>
                    {!i.cultureRulePeriodId && (
                      //全局任务
                      <Descriptions.Item label="任务开始时间">
                        <Typography.Text>
                          自开始生产 {i.daysFromStart} 天后
                        </Typography.Text>
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="任务开始日期">
                      <Typography.Text>第 {i.daysFromStart} 天</Typography.Text>
                    </Descriptions.Item>
                    {i.repeatType !== RepeatType.不重复 && (
                      <>
                        <Descriptions.Item label="任务重复方式">
                          <Typography.Text>
                            每 {i.repeatInterval} {i.repeatType}
                          </Typography.Text>
                        </Descriptions.Item>
                      </>
                    )}
                    {i.repeatType === RepeatType.不重复 && (
                      <>
                        <Descriptions.Item label="重复方式">
                          <Typography.Text>{RepeatType.不重复}</Typography.Text>
                        </Descriptions.Item>
                      </>
                    )}
                    <Descriptions.Item label="任务持续时长">
                      <Typography.Text>
                        {i.timeSpan}
                        {i.timeSpanUnit}
                      </Typography.Text>
                    </Descriptions.Item>
                  </Descriptions>
                </ProCard>
              ))}
            </Flex>
          </Flex>
        </Flex>
      )}
      {currentTab === "Preview" && (
        <Flex direction={"row"} style={{ margin: "0 32px 32px 0" }}>
          {findHook.data?.id && (
            <CultureRulePeriodSortableCard
              showGlobal={false}
              style={{ width: 300 }}
              onItemClick={(row) => {
                setCurrentPeriodId(row?.id);
              }}
              onEditClick={(row) => {
                setEditingPeriod(row);
              }}
              onRemoveClick={(row) => {
                row && removePeriod(row);
              }}
              id={findHook.data.id}
            />
          )}
          {currentPeriodId && findHook.data?.id && (
            <ProCard style={{ marginLeft: 32 }}>
              <Typography.Title level={4}>
                {findPeriodHook.data?.name}
              </Typography.Title>
              <Typography.Text type={"secondary"}>
                {findPeriodHook.data?.description}
              </Typography.Text>
              <CultureRuleDetailTimeCalender
                width={"100%"}
                style={{ marginTop: 32, flex: 1 }}
                cultureRuleId={findHook.data?.id}
                cultureRulePeriodId={currentPeriodId}
              />
            </ProCard>
          )}
        </Flex>
      )}
      <Modal
        footer={null}
        visible={isAddPeriod.value}
        onCancel={isAddPeriod.setFalse}
        title="添加生产阶段"
        width={700}
      >
        <CultureRulePeriodForm
          onSuccess={() => {
            isAddPeriod.setFalse();
            refresh();
          }}
        />
      </Modal>
      <Modal
        footer={null}
        visible={!!editingPeriod}
        onCancel={() => setEditingPeriod(undefined)}
        title="编辑生产阶段"
        width={700}
      >
        <CultureRulePeriodForm
          item={editingPeriod}
          onSuccess={() => {
            setCurrentPeriodId(editingPeriod?.id);
            setEditingPeriod(undefined);
            refresh();
          }}
        />
      </Modal>
      <Modal
        footer={null}
        visible={isAddDetail.value}
        onCancel={isAddDetail.setFalse}
        title="添加任务配置"
        width={700}
        destroyOnClose={true}
      >
        <PlantCultureRuleDetailForm
          onSuccess={() => {
            isAddDetail.setFalse();
            refresh();
          }}
          cultureRuleId={findPeriodHook.data?.cultureRuleId}
          cultureRulePeriodId={findPeriodHook.data?.id}
        />
      </Modal>
      <Modal
        footer={null}
        visible={!!currentDetailId}
        onCancel={() => setCurrentDetailId(undefined)}
        title="修改任务配置"
        width={700}
        destroyOnClose={true}
      >
        {findCultureRuleDetailHook.data && (
          <PlantCultureRuleDetailForm
            item={findCultureRuleDetailHook.data}
            onSuccess={() => {
              setCurrentDetailId(undefined);
              refresh();
            }}
            cultureRuleId={findPeriodHook.data?.cultureRuleId}
            cultureRulePeriodId={findPeriodHook.data?.id}
          />
        )}
      </Modal>
    </PageContainer>
  );
}
