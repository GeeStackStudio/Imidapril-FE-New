import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  message,
  Modal,
  Progress,
  Radio,
  Row,
  Space,
  Spin,
  theme,
  Typography,
} from "antd";
import { CultureRuleDetailTimeline } from "../../components/shared/CultureRule/CultureRuleDetailTimeline";
import CultureBatchSelector from "../../components/shared/CultureBatch/CultureBatchSelector";
import {
  IWorkScheduleTodayTableRef,
  WorkScheduleTodayTable,
} from "../../components/shared/WorkSchedule/WorkScheduleTodayTable";
import { MdAutoAwesome, RiCalendarTodoFill } from "react-icons/all";
import { WorkScheduleCalender } from "../../components/shared/WorkSchedule/WorkScheduleCalender";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { CultureBatchApi, UserApi, WorkScheduleApi } from "../../scaffold";
import WorkScheduleForm from "../../components/shared/WorkSchedule/WorkScheduleForm";
import { AsString } from "../../utils/AsString";
import UserAvatar from "../../components/User/UserAvatar";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { MaterialCard } from "../../components/shared/MaterialCard/MaterialCard";
import Flex from "../../components/shared/Flex";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useMount } from "ahooks";
import { useBoolean } from "react-hanger";
import dayjs from "dayjs";
type ViewType = "list" | "calender";
export function WorkManagePage() {
  const { token } = theme.useToken();
  const isManualDispatch = useBoolean(false);
  const isAutoDispatch = useBoolean(false);
  const userSearchHook = useOpenApiFpRequest(
    UserApi,
    UserApi.prototype.userSearchGet
  );
  const [viewType, setViewType] = useState<ViewType>("list");
  const tableRef =
    useRef<IWorkScheduleTodayTableRef>() as MutableRefObject<IWorkScheduleTodayTableRef>;

  const [timeRange, setTimeRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs(),
    dayjs().endOf("week"),
  ]);
  const [cultureBatchId, setCultureBatchId] = useState<number>();
  const findHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchFindGet
  );
  const currentPeriodHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchCurrentPeriodGet
  );
  const autoCreateHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleAutoCreatePost
  );
  useEffect(() => {
    if (cultureBatchId) {
      findHook.requestSync({
        id: cultureBatchId,
      });
      currentPeriodHook
        .request({
          id: cultureBatchId,
        })
        .then()
        .catch((e) => {
          message.error(e.message);
          currentPeriodHook.setData(undefined);
        });
    }
  }, [cultureBatchId, timeRange]);
  const dateFrom = useMemo(() => {
    return (timeRange[0] as dayjs.Dayjs).diff(
      dayjs(currentPeriodHook.data?.startTime),
      "days"
    );
  }, [timeRange, currentPeriodHook.data]);
  const dateTo = useMemo(() => {
    const localTimeRange = timeRange as dayjs.Dayjs[];
    if (timeRange.length < 2 && !currentPeriodHook.data?.startTime) {
      return undefined;
    }
    return (timeRange[1] as dayjs.Dayjs).diff(
      dayjs(currentPeriodHook.data?.startTime),
      "days"
    );
  }, [timeRange, currentPeriodHook.data]);

  useMount(() => {
    userSearchHook.requestSync({
      pi: 1,
      ps: 999,
    });
  });
  return (
    <PageContainer>
      <ProCard>
        <Flex direction={"row"} justify={"space-between"}>
          <Flex align={"center"}>
            <Typography.Text style={{ fontWeight: 500, fontSize: 22 }}>
              ????????????
            </Typography.Text>
            <Radio.Group
              style={{ marginLeft: 32 }}
              value={viewType}
              onChange={(v) => setViewType(v.target.value)}
            >
              <Radio.Button value="list">????????????</Radio.Button>
              <Radio.Button value="calender">????????????</Radio.Button>
            </Radio.Group>
          </Flex>
          <Flex align={"center"} style={{ marginRight: 32 }}>
            <Button.Group>
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onClick={isManualDispatch.setTrue}
              >
                <RiCalendarTodoFill style={{ marginRight: 4, fontSize: 24 }} />
                <span>???????????????</span>
              </Button>
              <Button
                type="primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onClick={() => isAutoDispatch.setTrue()}
              >
                <MdAutoAwesome
                  style={{ marginRight: 4, fontSize: 24, color: "#fff" }}
                />
                <span>????????????</span>
              </Button>
            </Button.Group>
          </Flex>
        </Flex>
      </ProCard>
      {viewType === "list" && (
        <>
          <Typography.Title level={4}>????????????????????????</Typography.Title>
          <Typography.Text type={"secondary"}>
            ??????????????????????????????????????????
          </Typography.Text>
          <Flex direction={"row"} style={{ flexWrap: "wrap" }}>
            {userSearchHook.data?.list?.map((i) => {
              return (
                <MaterialCard
                  style={{ width: 300, marginTop: 16, marginRight: 16 }}
                  bodyStyle={{ padding: 0 }}
                  key={i.id}
                >
                  <Flex direction={"row"} align={"center"}>
                    <UserAvatar style={{ width: 80, height: 80 }} user={i} />
                    <Flex direction={"column"}>
                      <Typography.Text style={{ marginLeft: 16, fontSize: 16 }}>
                        {i.name}
                      </Typography.Text>
                      <Typography.Text style={{ marginLeft: 16, fontSize: 16 }}>
                        ??????????????????4 ?????????
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </MaterialCard>
              );
            })}
          </Flex>
          <Row gutter={32}>
            <Col span={16} lg={16} md={24} sm={24}>
              <Typography.Title level={4} style={{ marginTop: 32 }}>
                ????????????
              </Typography.Title>
              <Typography.Text type={"secondary"}>
                ????????????????????????????????????
              </Typography.Text>
              <MaterialCard bodyStyle={{ padding: 0 }} style={{ marginTop: 8 }}>
                <WorkScheduleTodayTable ref={tableRef} />
              </MaterialCard>
            </Col>
            <Col span={4} lg={4} md={24} sm={24}>
              <Typography.Title level={4} style={{ marginTop: 32 }}>
                ???????????????
              </Typography.Title>
              <Typography.Text type={"secondary"}>
                ??????????????? = ??????????????? / ????????????
              </Typography.Text>
              <Flex style={{ marginTop: 8 }}>
                <MaterialCard>
                  <Progress
                    percent={63}
                    strokeColor={token.colorPrimary}
                    showInfo={true}
                    type={"circle"}
                  />
                </MaterialCard>
              </Flex>
              {/*<Typography.Title level={4} style={{marginTop: 32}}>*/}
              {/*  ???????????????*/}
              {/*</Typography.Title>*/}
              {/*<Typography.Text type={'secondary'}>??????????????? = ??????????????? / ????????????</Typography.Text>*/}
              {/*<Flex style={{marginTop: 8}}>*/}
              {/*  <MaterialCard>*/}
              {/*    <Progress percent={63} strokeColor={'rgb(78,156,149)'} showInfo={true} type={'circle'} />*/}
              {/*  </MaterialCard>*/}
              {/*</Flex>*/}
            </Col>
            {/*<Col span={4} lg={4} md={24} sm={24}>*/}
            {/*  <Typography.Title level={4} style={{marginTop: 32}}>*/}
            {/*    ???????????????*/}
            {/*  </Typography.Title>*/}
            {/*  <Typography.Text type={'secondary'}>??????????????? = ??????????????? / ????????????</Typography.Text>*/}
            {/*  <Flex style={{marginTop: 8}}>*/}
            {/*    <MaterialCard>*/}
            {/*      <Progress percent={63} strokeColor={'rgb(78,156,149)'} showInfo={true} type={'circle'} />*/}
            {/*    </MaterialCard>*/}
            {/*  </Flex>*/}
            {/*  <Typography.Title level={4} style={{marginTop: 32}}>*/}
            {/*    ???????????????*/}
            {/*  </Typography.Title>*/}
            {/*  <Typography.Text type={'secondary'}>??????????????? = ??????????????? / ????????????</Typography.Text>*/}
            {/*  <Flex style={{marginTop: 8}}>*/}
            {/*    <MaterialCard>*/}
            {/*      <Progress percent={63} strokeColor={'rgb(78,156,149)'} showInfo={true} type={'circle'} />*/}
            {/*    </MaterialCard>*/}
            {/*  </Flex>*/}
            {/*</Col>*/}
          </Row>
        </>
      )}

      {viewType === "calender" && (
        <>
          <Typography.Title level={4}>????????????</Typography.Title>
          <Typography.Text type={"secondary"}>
            ????????????????????????????????????
          </Typography.Text>
          <MaterialCard style={{ marginTop: 8 }}>
            <WorkScheduleCalender height={600} />
          </MaterialCard>
        </>
      )}

      <Modal
        title="??????????????????"
        open={isManualDispatch.value}
        onCancel={isManualDispatch.setFalse}
        footer={null}
        width={1000}
      >
        <WorkScheduleForm
          onSuccess={() => {
            tableRef.current.refresh && tableRef.current.refresh();
            isManualDispatch.setFalse();
          }}
        />
      </Modal>
      <Modal
        title="??????????????????"
        open={isAutoDispatch.value}
        onCancel={isAutoDispatch.setFalse}
        footer={null}
        width={1000}
      >
        <Form>
          <Space direction={"horizontal"}>
            <Form.Item label={"????????????"}>
              <CultureBatchSelector
                allowClear
                value={AsString(cultureBatchId)}
                onChange={(v) =>
                  v
                    ? setCultureBatchId(Number(v))
                    : setCultureBatchId(undefined)
                }
                style={{ width: 360 }}
                placeholder="?????????????????????"
              />
            </Form.Item>
            <Form.Item label={"?????????"}>
              <DatePicker.RangePicker
                allowClear={false}
                value={timeRange}
                onChange={(v) => setTimeRange(v as [dayjs.Dayjs, dayjs.Dayjs])}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  if (!cultureBatchId || timeRange.length < 2) {
                    return;
                  }
                  autoCreateHook
                    .request({
                      workScheduleAutoCreateParams: {
                        from: timeRange[0].format("YYYY-MM-DD HH:mm:ss"),
                        to: timeRange[1].format("YYYY-MM-DD HH:mm:ss"),
                        cultureBatchId: cultureBatchId,
                      },
                    })
                    .then((r) => {
                      message.success("??????????????????");
                    })
                    .catch((e) => message.error(e.message));
                }}
              >
                ????????????
              </Button>
            </Form.Item>
          </Space>
        </Form>
        <MaterialCard style={{ margin: "32px auto", width: 800 }}>
          <Spin spinning={findHook.loading && currentPeriodHook.loading}>
            {findHook.data?.cultureRuleId &&
              currentPeriodHook.data?.cultureRulePeriodId && (
                <CultureRuleDetailTimeline
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  cultureRuleId={findHook.data.cultureRuleId}
                  cultureRulePeriodId={
                    currentPeriodHook.data.cultureRulePeriodId
                  }
                />
              )}
            {!findHook.data?.cultureRuleId && (
              <Empty description="??????????????????????????????" />
            )}
            {findHook.data?.cultureRuleId && !currentPeriodHook.data && (
              <Empty description="???????????????????????????????????????, ??????????????????????????????" />
            )}
          </Spin>
        </MaterialCard>
      </Modal>
    </PageContainer>
  );
}
