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
            message: "??????",
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
    return "??????";
  }, [findHook.data]);
  const cultureName = useMemo(() => {
    return "??????";
  }, [findHook.data]);
  return (
    <PageContainer
      title={`????????????: ${findHook.data?.code}`}
      subTitle={
        <div>
          <CultureBatchTypeTag type={findHook.data?.type} />
          <span>
            ?????????????????????{currentPeriodHook.data?.cultureRulePeriod?.name}
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
                  ??????????????????
                </Button>
                <Button
                  style={{ backgroundColor: "#08979c" }}
                  type={"primary"}
                  onClick={() => {
                    isAutoCreate.setTrue();
                  }}
                >
                  ??????????????????
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
                    ??????????????????
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
                      ??????????????????
                    </Button>
                  )}
                {isLastPeriodHook.data?.isLastCulturePeriod && (
                  <Button
                    type={"primary"}
                    onClick={async () => {
                      await ConfirmAsync({
                        title: "??????",
                        content: `???????????????????????????${cultureName}?????????`,
                      });
                      if (findHook.data?.id) {
                        try {
                          await finishHook.request({
                            cultureBatchFinishParams: {
                              id: findHook.data.id,
                            },
                          });
                          notification.success({
                            message: "????????????",
                            description: `???${cultureName}????????????????????????`,
                          });
                        } catch (e) {
                          notification.error({
                            message: `??????${cultureName}????????????`,
                            description: e.message,
                          });
                        } finally {
                          refresh();
                        }
                      }
                    }}
                  >
                    ??????????????????
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
        <Tabs.TabPane tab="????????????" key="Basic" />
        <Tabs.TabPane tab="?????????" key="Death" />
        {findHook.data?.type === CultureBatchType.???????????? && (
          <Tabs.TabPane tab="????????????" key="GrowInfo" />
        )}
        {findHook.data?.type !== CultureBatchType.???????????? && (
          <Tabs.TabPane tab="????????????" key="GrowInfo" />
        )}
        <Tabs.TabPane tab="????????????" key="Today" />
        <Tabs.TabPane tab="????????????" key="Work" />
        <Tabs.TabPane tab="????????????" key="Alert" />
      </Tabs>
      <div style={{ margin: "auto", zIndex: 3 }}>
        {currentTab === "Basic" && (
          <div>
            <Row gutter={32}>
              <Col span={6}>
                <Typography.Title level={4}>
                  {cultureName}????????????
                </Typography.Title>
                <ProCard style={{ height: 260, overflow: "auto" }}>
                  <Descriptions column={1}>
                    <Descriptions.Item label="????????????">
                      <Typography.Text strong style={{ color: "#0676ED" }}>
                        {findHook.data?.code}
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="????????????">
                      <Typography.Text strong style={{ color: "#0676ED" }}>
                        {findHook.data?.breed?.name}
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="??????????????????">
                      <Typography.Text>
                        {currentPeriodHook.data?.cultureRulePeriod?.name}
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="????????????">
                      {findHook.data?.cultureRule?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="??????????????????">
                      {findHook.data?.startedTime}{" "}
                    </Descriptions.Item>
                    <Descriptions.Item label={fryName + "??????"}>
                      <Typography.Text
                        strong
                        type={!findHook.data?.fryTime ? "danger" : undefined}
                      >
                        {findHook.data?.fryTime ?? "??????" + fryName}
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
                    <Typography.Title level={4}>????????????</Typography.Title>
                    <ProForm
                      submitter={false}
                      layout="inline"
                      style={{ marginTop: 16 }}
                    >
                      <ProForm.Item label={"???????????????"}>
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
                    ??????{cultureName}??????
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
            </Row>
            {/*{listPondHook && (*/}
            {/*  <>*/}
            {/*    <Typography.Title style={{marginTop: 16}} level={4}>*/}
            {/*      ?????????{cultureName}??????*/}
            {/*    </Typography.Title>*/}
            {/*    <ProCard bodyStyle={{padding: 0}}>*/}
            {/*      <CultureBatchToPondTable list={listPondHook.data} />*/}
            {/*    </ProCard>*/}
            {/*  </>*/}
            {/*)}*/}
            <Row gutter={32}>
              <Col span={12}>
                <Typography.Title style={{ marginTop: 16 }} level={4}>
                  ????????????
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
                  ??????????????????
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
            <Typography.Title level={4}>????????????????????????</Typography.Title>
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
            <Typography.Title level={4}>????????????</Typography.Title>
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
            <Typography.Title level={4}>??????????????????</Typography.Title>
            <ProCard>
              <DeathCountHistory style={{ height: 500 }} cultureBatchId={id} />
            </ProCard>
          </div>
        )}
      </div>
      <Drawer
        open={isConfigurePeriod.value}
        onClose={isConfigurePeriod.setFalse}
        title="??????????????????"
        width={500}
      >
        <Flex direction="column" style={{ marginBottom: 8 }}>
          <Typography.Title level={4}>??????????????????</Typography.Title>
          <Typography.Paragraph>
            <Typography.Text>
              ??????????????????????????????????????????,?????????????????????????????????????????????????????????????????????.
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Typography.Text>
              ??????????????????:
              {currentPeriodHook.data?.cultureRulePeriod?.name ??
                "????????????????????????"}
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
        title={`??????????????????`}
        footer={null}
      >
        <WorkScheduleForm />
      </Modal>
      <Modal
        width={1000}
        open={isAutoCreate.value}
        okText="??????????????????"
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
                message: "??????????????????",
              });
              isAutoCreate.setFalse();
            })
            .catch((e) => message.error(e.message));
        }}
        onCancel={isAutoCreate.setFalse}
        title={`??????????????????`}
      >
        <Typography.Text>??????????????????????????????????????????????????????</Typography.Text>
        <Form style={{ marginBottom: 16 }}>
          <Form.Item label="??????????????????">
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
        title={`?????????????????? ${currentWork?.name}`}
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
        title={`??????????????????`}
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
