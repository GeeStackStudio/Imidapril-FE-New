import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import {
  CultureBatchApi,
  CultureBatchType,
  CultureRuleApi,
  WorkScheduleApi,
  WorkScheduleDto,
} from "../../scaffold";
import { useBoolean } from "react-hanger";
import PlantWorkScheduleForm from "../../components/shared/WorkSchedule/PlantWorkScheduleForm";
import { AverageHeightHistory } from "../../components/shared/CultureBatch/AverageHeightHistoryLineChart";
import {
  WorkScheduleCalender,
  WorkScheduleCalenderRef,
} from "../../components/shared/WorkSchedule/WorkScheduleCalender";
import WorkScheduleForm from "../../components/shared/WorkSchedule/WorkScheduleForm";
import moment, { Moment } from "moment";
import { ConfirmAsync } from "../../utils/ConfirmAsync";
import { LeafCountHistory } from "../../components/shared/CultureBatch/LeafCountHistoryLineChart";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WorkScheduleSproutButton } from "../../components/shared/WorkSchedule/WorkScheduleSproutButton";
import Flex from "../../components/shared/Flex";
import { useParams } from "react-router-dom";
import { useUnity } from "../../hooks/useUnity";
import CultureBatchConfigurePeriodForm from "../../components/shared/CultureBatch/CultureBatchConfigurePeriodForm";
import { DeathCountHistory } from "../../components/shared/CultureBatch/DeathReportHistoryLineChart";
import { WorkSchedulePlantMeasureButton } from "../../components/shared/WorkSchedule/WorkSchedulePlantMeasureButton";
import { WorkScheduleTodayTable } from "../../components/shared/WorkSchedule/WorkScheduleTodayTable";
import { UnityContext } from "../../utils/UnityContext";
import { CultureBatchTypeTag } from "../../components/shared/CultureBatch/CultureBatchTypeTag";
import { CultureRuleDetailDateTimeline } from "../../components/shared/CultureRule/CultureRuleDetailDateTimeline";
import { WorkScheduleDeathReportButton } from "../../components/shared/WorkSchedule/WorkScheduleDeathReportButton";
import {
  PageContainer,
  PageHeader,
  ProCard,
  ProForm,
} from "@ant-design/pro-components";
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Drawer,
  Form,
  message,
  Modal,
  notification,
  Row,
  Steps,
  Switch,
  Tabs,
  Typography,
} from "antd";
import { useMount } from "ahooks";
import { AsString } from "../../utils/AsString";
import { SensorStatisticCards } from "../../components/shared/Sensor/SensorStatisticCards";
import SensorSelector from "../../components/shared/Sensor/SensorSelector";
import { useFirstSensor } from "../../utils/useFirstSensor";

type PageTab =
  | "Basic"
  | "Culture"
  | "GrowInfo"
  | "Work"
  | "Today"
  | "Death"
  | "Alert"
  | "CultureLog";

export function CultureDetailPage() {
  const [sensorId, setSensorId] = useState<number>();
  const listRulePeriodHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleListPeriodGet
  );
  const findHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchFindGet
  );
  const listPondHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchListPondGet
  );
  const listPeriodHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchListPeriodGet
  );
  const currentPeriodHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchCurrentPeriodGet
  );
  const isLastPeriodHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchIsLastCulturePeriodGet
  );
  const autoCreateHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleAutoCreatePost
  );
  const finishHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchFinishPost
  );
  const firstSensorHook = useFirstSensor();
  const isAddWork = useBoolean(false);
  const [currentWork, setCurrentWork] = useState<WorkScheduleDto>();
  const [currentTab, setCurrentTab] = useState<PageTab>("Basic");
  const routeParams = useParams<{ id: string }>();
  const isConfigurePeriod = useBoolean(false);
  const isAutoCreate = useBoolean(false);
  const isManualCreate = useBoolean(false);
  const [id, setId] = useState<number>(Number(routeParams?.id));
  const [timeRange, setTimeRange] = useState<any>([
    moment(),
    moment().endOf("week"),
  ]);
  const [key, setKey] = useState(Math.random);
  const calendar =
    useRef<WorkScheduleCalenderRef>() as MutableRefObject<WorkScheduleCalenderRef>;
  const [periodIndex, setPeriodIndex] = useState<number>();
  const unityIframe = useContext(UnityContext);
  const unity = useUnity(unityIframe.iframe);

  function refresh() {
    setKey(Math.random());
    console.log(calendar.current);
    calendar.current?.refresh && calendar.current?.refresh();
    console.log(calendar.current);
    if (routeParams) {
      findHook
        .request({
          id: Number(routeParams.id),
        })
        .then((r) => {
          r.cultureRuleId &&
            listRulePeriodHook
              .request({
                id: r.cultureRuleId,
              })
              .then((periodList) => {
                currentPeriodHook
                  .request({
                    id: Number(routeParams.id),
                  })
                  .then((current) => {
                    console.log(current);
                    console.log(periodList);
                    const i = periodList.findIndex(
                      (i) => i.id === current.cultureRulePeriodId
                    );
                    setPeriodIndex(i);
                  })
                  .catch((e) => {
                    isConfigurePeriod.setTrue();
                  });
              })
              .catch((e) => {
                message.error(e.message);
              });
        })
        .catch((e) => {
          message.error(e.message);
        });
      isLastPeriodHook
        .request({
          id: Number(routeParams.id),
        })
        .catch((e) =>
          notification.warning({
            message: "注意",
            description: e.message,
          })
        );
      listPeriodHook
        .request({
          id: Number(routeParams.id),
        })
        .then()
        .catch((e) => {
          message.error(e.message);
        });
    }
  }

  useEffect(() => {
    if (!listPondHook.data || periodIndex === undefined) {
      return;
    }
    listPondHook.data?.forEach((i) => {
      const code = "A";
      unity.sendMessage("Miaopan" + code, "LoadMiaopan", [
        i.pond?.name?.trim(),
        1,
      ]);
    });
  }, [periodIndex, listPondHook.data]);
  useMount(async () => {
    refresh();
    const item = await firstSensorHook.search();
    item && setSensorId(item.id);
  });

  useEffect(() => {
    if (findHook.data?.id) {
      listPondHook.requestSync({
        id: findHook.data?.id,
      });
    }
    if (findHook.data?.cultureRuleId) {
      listRulePeriodHook.requestSync({
        id: Number(findHook.data.cultureRuleId),
      });
    }
  }, [findHook.data]);

  const currentPeriodIdIndex = useMemo(() => {
    if (currentPeriodHook.data && listRulePeriodHook.data) {
      const ids = listRulePeriodHook.data.map((i) => i.id);
      return ids.indexOf(currentPeriodHook.data.cultureRulePeriodId);
    }
    return -1;
  }, [listRulePeriodHook.data, currentPeriodHook.data]);

  const dateFrom = useMemo(() => {
    const localTimeRange = timeRange as Moment[];
    if (timeRange.length == 0 && !currentPeriodHook.data?.startTime) {
      return undefined;
    }
    return (timeRange[0] as Moment).diff(
      moment(currentPeriodHook.data?.startTime),
      "days"
    );
  }, [timeRange, currentPeriodHook.data]);
  const dateTo = useMemo(() => {
    const localTimeRange = timeRange as Moment[];
    if (timeRange.length < 2 && !currentPeriodHook.data?.startTime) {
      return undefined;
    }
    return (timeRange[1] as Moment).diff(
      moment(currentPeriodHook.data?.startTime),
      "days"
    );
  }, [timeRange, currentPeriodHook.data]);

  const fryName = useMemo(() => {
    return "放苗";
  }, [findHook.data]);
  const cultureName = useMemo(() => {
    return "生产";
  }, [findHook.data]);
  return (
    <PageContainer
      title={`生产批次: ${findHook.data?.code}`}
      subTitle={
        <div>
          <CultureBatchTypeTag type={findHook.data?.type} />
          <span>
            当前生产阶段：{currentPeriodHook.data?.cultureRulePeriod?.name}
          </span>
        </div>
      }
      extra={
        <div>
          {!findHook.data?.isDone && (
            <>
              <Button.Group>
                <Button
                  onClick={() => {
                    isManualCreate.setTrue();
                    // tabLayout.goTo(`/app/workSchedule/calender?cultureBatchId=${findHook.data?.id}`);
                  }}
                >
                  手动安排工作
                </Button>
                <Button
                  style={{ backgroundColor: "#08979c" }}
                  type={"primary"}
                  onClick={() => {
                    isAutoCreate.setTrue();
                  }}
                >
                  自动安排工作
                </Button>
              </Button.Group>
              <Button.Group style={{ marginLeft: 16 }}>
                {!listPeriodHook.data && (
                  <Button
                    type={"primary"}
                    onClick={() => {
                      isConfigurePeriod.setTrue();
                    }}
                  >
                    配置生产阶段
                  </Button>
                )}
                {listPeriodHook.data &&
                  !isLastPeriodHook.data?.isLastCulturePeriod && (
                    <Button
                      type={"primary"}
                      onClick={() => {
                        isConfigurePeriod.setTrue();
                      }}
                    >
                      进入下一阶段
                    </Button>
                  )}
                {isLastPeriodHook.data?.isLastCulturePeriod && (
                  <Button
                    type={"primary"}
                    onClick={async () => {
                      await ConfirmAsync({
                        title: "提示",
                        content: `您确认是否要完成此${cultureName}计划？`,
                      });
                      if (findHook.data?.id) {
                        try {
                          await finishHook.request({
                            cultureBatchFinishParams: {
                              id: findHook.data.id,
                            },
                          });
                          notification.success({
                            message: "操作成功",
                            description: `此${cultureName}计划已经成功完成`,
                          });
                        } catch (e) {
                          notification.error({
                            message: `完成${cultureName}计划失败`,
                            description: e.message,
                          });
                        } finally {
                          refresh();
                        }
                      }
                    }}
                  >
                    完成生产计划
                  </Button>
                )}
              </Button.Group>
            </>
          )}
        </div>
      }
      className="CultureBatchDetail"
    >
      <Tabs
        defaultValue={currentTab}
        onChange={(v) => setCurrentTab(v as PageTab)}
      >
        <Tabs.TabPane tab="基础信息" key="Basic" />
        <Tabs.TabPane tab="死亡率" key="Death" />
        {findHook.data?.type === CultureBatchType.温室培育 && (
          <Tabs.TabPane tab="生长信息" key="GrowInfo" />
        )}
        {findHook.data?.type !== CultureBatchType.温室培育 && (
          <Tabs.TabPane tab="体长体重" key="GrowInfo" />
        )}
        <Tabs.TabPane tab="今日任务" key="Today" />
        <Tabs.TabPane tab="工作日历" key="Work" />
        <Tabs.TabPane tab="警报信息" key="Alert" />
      </Tabs>
      <div style={{ margin: "auto", zIndex: 3 }}>
        {currentTab === "Basic" && (
          <div>
            <Row gutter={32}>
              <Col span={8}>
                <Typography.Title level={4}>
                  {cultureName}基本信息
                </Typography.Title>
                <ProCard style={{ height: 260, overflow: "auto" }}>
                  <Descriptions column={1}>
                    <Descriptions.Item label="生产批号">
                      <Typography.Text strong style={{ color: "#0676ED" }}>
                        {findHook.data?.code}
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="生产品种">
                      <Typography.Text strong style={{ color: "#0676ED" }}>
                        {findHook.data?.breed?.name}
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="当前生产阶段">
                      <Typography.Text>
                        {currentPeriodHook.data?.cultureRulePeriod?.name}
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="生产规则">
                      {findHook.data?.cultureRule?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="开始生产时间">
                      {findHook.data?.startedTime}{" "}
                    </Descriptions.Item>
                    <Descriptions.Item label={fryName + "时间"}>
                      <Typography.Text
                        strong
                        type={!findHook.data?.fryTime ? "danger" : undefined}
                      >
                        {findHook.data?.fryTime ?? "尚未" + fryName}
                      </Typography.Text>
                    </Descriptions.Item>
                  </Descriptions>
                </ProCard>
              </Col>
              <Col span={10}>
                <div>
                  <Flex
                    direction={"row"}
                    align="center"
                    justify={"space-between"}
                  >
                    <Typography.Title level={4}>环境数据</Typography.Title>
                    <ProForm
                      submitter={false}
                      layout="inline"
                      style={{ marginTop: 16 }}
                    >
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
                  </Flex>
                  {sensorId && (
                    <SensorStatisticCards
                      style={{ height: 260 }}
                      sensorId={sensorId}
                    />
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Typography.Title level={4}>
                    当前{cultureName}阶段
                  </Typography.Title>
                  <ProCard style={{ height: 260, overflow: "auto" }}>
                    <Steps
                      size="small"
                      direction={"vertical"}
                      current={currentPeriodIdIndex}
                    >
                      {listRulePeriodHook.data?.map((i) => (
                        <Steps.Step
                          key={i.id}
                          title={i.name}
                          description={
                            <Flex direction={"column"}>
                              <Typography.Text ellipsis={true}>
                                {i.description}
                              </Typography.Text>
                            </Flex>
                          }
                        />
                      ))}
                    </Steps>
                  </ProCard>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Typography.Title level={4}>操作</Typography.Title>
                  <ProCard
                    style={{ overflow: "auto" }}
                    bodyStyle={{ height: 260 }}
                  >
                    <Flex wrap={"wrap"}>
                      <WorkScheduleSproutButton
                        cultureBatchId={findHook.data?.id}
                        onSuccess={() => refresh()}
                      />
                      <WorkSchedulePlantMeasureButton
                        cultureBatchId={findHook.data?.id}
                        onSuccess={() => refresh()}
                      />
                      <WorkScheduleDeathReportButton
                        cultureBatchId={findHook.data?.id}
                        onSuccess={() => refresh()}
                      />
                    </Flex>

                    <Flex wrap={"wrap"}>
                      <Flex
                        justify={"space-between"}
                        align={"center"}
                        direction={"row"}
                        style={{ padding: 12, width: 144 }}
                      >
                        <Typography.Text style={{ fontSize: 12 }}>
                          喷淋系统
                        </Typography.Text>
                        <Switch
                          onChange={(v) => {
                            unity.sendMessage(
                              "Scripts",
                              "CameraToZheyangwangPos"
                            );
                            if (v) {
                              unity.sendMessage("Scripts", "PenlinAllOn");
                            } else {
                              unity.sendMessage("Scripts", "PenlinAllOff");
                            }
                          }}
                          checkedChildren="开启中"
                          unCheckedChildren={"关闭中"}
                        />
                      </Flex>
                      <Flex
                        justify={"space-between"}
                        align={"center"}
                        direction={"row"}
                        style={{ padding: 12, width: 144 }}
                      >
                        <Typography.Text style={{ fontSize: 12 }}>
                          通风系统
                        </Typography.Text>
                        <Switch
                          onChange={(v) => {
                            unity.sendMessage(
                              "Scripts",
                              "NavigateWindControlSystem"
                            );
                            if (v) {
                              for (let i = 1; i <= 14; i++) {
                                unity.sendMessage("Scripts", "FS" + i + "Open");
                              }
                            } else {
                              for (let i = 1; i <= 14; i++) {
                                unity.sendMessage(
                                  "Scripts",
                                  "FS" + i + "Close"
                                );
                              }
                            }
                          }}
                          checkedChildren="开启中"
                          unCheckedChildren={"关闭中"}
                        />
                      </Flex>
                      <Flex
                        justify={"space-between"}
                        align={"center"}
                        direction={"row"}
                        style={{ padding: 12, width: 144 }}
                      >
                        <Typography.Text style={{ fontSize: 12 }}>
                          光照系统
                        </Typography.Text>
                        <Switch
                          onChange={(v) => {
                            unity.sendMessage(
                              "Scripts",
                              "CameraToZheyangwangPos"
                            );
                            if (v) {
                              for (let i = 1; i <= 3; i++) {
                                unity.sendMessage(
                                  "Scripts",
                                  "Zheyangwang" + i + "LOpen"
                                );
                                unity.sendMessage(
                                  "Scripts",
                                  "Zheyangwang" + i + "ROpen"
                                );
                              }
                            } else {
                              for (let i = 1; i <= 3; i++) {
                                unity.sendMessage(
                                  "Scripts",
                                  "Zheyangwang" + i + "LClose"
                                );
                                unity.sendMessage(
                                  "Scripts",
                                  "Zheyangwang" + i + "RClose"
                                );
                              }
                            }
                          }}
                          checkedChildren="开启中"
                          unCheckedChildren={"关闭中"}
                        />
                      </Flex>
                    </Flex>
                  </ProCard>
                </div>
              </Col>
            </Row>
            {/*{listPondHook && (*/}
            {/*  <>*/}
            {/*    <Typography.Title style={{marginTop: 16}} level={4}>*/}
            {/*      各苗床{cultureName}情况*/}
            {/*    </Typography.Title>*/}
            {/*    <ProCard bodyStyle={{padding: 0}}>*/}
            {/*      <CultureBatchToPondTable list={listPondHook.data} />*/}
            {/*    </ProCard>*/}
            {/*  </>*/}
            {/*)}*/}
            <Row gutter={32}>
              <Col span={12}>
                <Typography.Title style={{ marginTop: 16 }} level={4}>
                  平均体长
                </Typography.Title>
                <ProCard>
                  <AverageHeightHistory
                    key={key}
                    style={{ height: 200 }}
                    cultureBatchId={id}
                  />
                </ProCard>
              </Col>
              <Col span={12}>
                <Typography.Title style={{ marginTop: 16 }} level={4}>
                  叶片变化情况
                </Typography.Title>
                <ProCard>
                  <LeafCountHistory
                    key={key}
                    style={{ height: 200 }}
                    cultureBatchId={id}
                  />
                </ProCard>
              </Col>
            </Row>
          </div>
        )}
        {currentTab === "Today" && (
          <div>
            <Typography.Title level={4}>今日任务完成情况</Typography.Title>
            <ProCard bodyStyle={{ padding: 0 }}>
              <WorkScheduleTodayTable cultureBatchId={findHook.data?.id} />
            </ProCard>
          </div>
        )}
        {currentTab === "Work" && (
          <ProCard>
            <WorkScheduleCalender />
          </ProCard>
        )}
        {currentTab === "GrowInfo" && (
          <div>
            <Typography.Title level={4}>生长信息</Typography.Title>
            <ProCard>
              <AverageHeightHistory
                style={{ height: 500 }}
                cultureBatchId={id}
              />
            </ProCard>
          </div>
        )}
        {currentTab === "Death" && (
          <div>
            <Typography.Title level={4}>死亡率趋势图</Typography.Title>
            <ProCard>
              <DeathCountHistory style={{ height: 500 }} cultureBatchId={id} />
            </ProCard>
          </div>
        )}
      </div>
      <Drawer
        open={isConfigurePeriod.value}
        onClose={isConfigurePeriod.setFalse}
        title="配置生产阶段"
        width={500}
      >
        <Flex direction="column" style={{ marginBottom: 8 }}>
          <Typography.Title level={4}>配置生产阶段</Typography.Title>
          <Typography.Paragraph>
            <Typography.Text>
              生产过程中划分为多个生产阶段,各个生产阶段会根据规则库自动生成不同的工作任务.
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Typography.Text>
              当前生产阶段:
              {currentPeriodHook.data?.cultureRulePeriod?.name ??
                "尚未配置生产阶段"}
            </Typography.Text>
          </Typography.Paragraph>
          <Steps
            size="small"
            progressDot
            direction="vertical"
            current={currentPeriodIdIndex}
          >
            {listRulePeriodHook.data?.map((i) => (
              <Steps.Step
                key={i.id}
                title={i.name}
                description={i.description}
              />
            ))}
          </Steps>
        </Flex>

        {findHook.data?.id && (
          <CultureBatchConfigurePeriodForm
            id={findHook.data.id}
            onSuccess={() => {
              isConfigurePeriod.setFalse();
              refresh();
            }}
          />
        )}
      </Drawer>

      <Modal
        width={800}
        open={isAddWork.value}
        onCancel={isAddWork.setFalse}
        title={`添加工作安排`}
        footer={null}
      >
        <WorkScheduleForm />
      </Modal>
      <Modal
        width={1000}
        open={isAutoCreate.value}
        okText="确认安排工作"
        onOk={() => {
          if (!findHook.data?.id || timeRange.length != 2) {
            return;
          }
          autoCreateHook
            .request({
              workScheduleAutoCreateParams: {
                from: timeRange[0].format("YYYY-MM-DD HH:mm:ss"),
                to: timeRange[1].format("YYYY-MM-DD HH:mm:ss"),
                cultureBatchId: findHook.data?.id,
              },
            })
            .then((r) => {
              notification.success({
                message: "自动排程成功",
              });
              isAutoCreate.setFalse();
            })
            .catch((e) => message.error(e.message));
        }}
        onCancel={isAutoCreate.setFalse}
        title={`自动安排工作`}
      >
        <Typography.Text>您可以根据生产规则，自动安排下周工作</Typography.Text>
        <Form style={{ marginBottom: 16 }}>
          <Form.Item label="请选择时间段">
            <DatePicker.RangePicker
              allowClear={false}
              value={timeRange}
              onChange={(v) => {
                console.log(v);
                setTimeRange(v);
              }}
            />
          </Form.Item>
        </Form>
        <div style={{ height: 600, overflow: "auto" }}>
          {timeRange && timeRange.length > 0 && (
            <CultureRuleDetailDateTimeline
              dateFromMoment={timeRange[0]}
              dateFrom={dateFrom}
              dateTo={dateTo}
              cultureRuleId={findHook.data?.cultureRuleId}
              cultureRulePeriodId={currentPeriodHook.data?.cultureRulePeriodId}
            />
          )}
        </div>
      </Modal>
      <Modal
        width={800}
        open={!!currentWork}
        onCancel={() => setCurrentWork(undefined)}
        title={`修改工作安排 ${currentWork?.name}`}
        footer={null}
      >
        <PlantWorkScheduleForm
          item={currentWork}
          onSuccess={() => {
            setCurrentWork(undefined);
            refresh();
          }}
        />
      </Modal>
      <Modal
        width={800}
        open={isManualCreate.value}
        onCancel={() => isManualCreate.setFalse()}
        title={`手动安排工作`}
        footer={null}
      >
        <PlantWorkScheduleForm
          onSuccess={() => {
            isManualCreate.setFalse();
            refresh();
          }}
        />
      </Modal>
    </PageContainer>
  );
}
