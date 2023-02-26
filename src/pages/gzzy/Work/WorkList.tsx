import {
  Button,
  DatePicker,
  Descriptions,
  Empty,
  Form,
  message,
  Modal,
  Table,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useBoolean } from "react-use";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import {
  MaterialApi,
  WorkScheduleApi,
  WorkScheduleDto,
  WorkScheduleStatus,
  WorkType,
} from "../../../scaffold";
import { useAntdTable } from "ahooks";
import moment from "moment";
import CultureBatchSelector from "../../../components/shared/CultureBatch/CultureBatchSelector";
import { WorkScheduleTypeTag } from "../../../components/shared/WorkSchedule/WorkScheduleTypeTag";
import { WorkScheduleStatusTag } from "../../../components/shared/WorkSchedule/WorkScheduleStatusTag";
import { ToNumber } from "../../../utils/ToNumber";
import { UseZebra } from "../../../utils/UseZebra";
import UserSelector from "../../../components/shared/User/UserSelector";
import { PageContainer, ProCard } from "@ant-design/pro-components";

export function WorkScheduleListPage() {
  const searchHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleSearchGet
  );
  const [cultureBatchId, setCultureBatchId] = useState<number>();
  const [workerId, setWorkerId] = useState<number>();
  const [timeRange, setTimeRange] = useState<any>([
    moment().endOf("day").subtract(7, "days").startOf("date"),
    moment().startOf("day"),
  ]);
  const isAdd = useBoolean(false);
  const [selected, setSelected] = useState<WorkScheduleDto>();
  const [type, setType] = useState<WorkType>();
  const materialFindHook = useOpenApiFpRequest(
    MaterialApi,
    MaterialApi.prototype.materialFindGet
  );
  const { tableProps, search, loading } = useAntdTable(
    (params) =>
      searchHook.request({
        pi: params.current,
        ps: params.pageSize,
        statusList: [WorkScheduleStatus.已完成],
        workerId,
        type: type,
        cultureBatchId: cultureBatchId,
        scheduleTimeFrom: timeRange
          ? timeRange[0]?.format("YYYY-MM-DD HH:mm:ss")
          : undefined,
        scheduleTimeTo: timeRange
          ? timeRange[1]?.format("YYYY-MM-DD HH:mm:ss")
          : undefined,
      }) as any,
    {
      defaultPageSize: 10,
      onError: (e) => message.error(e.message),
    }
  );
  return (
    <PageContainer
      title="历史任务搜索"
      subTitle="您可以在此处查询已完成的历史任务"
    >
      <ProCard>
        <Form layout={"inline"}>
          <Form.Item label={"时间段"}>
            <DatePicker.RangePicker
              allowClear
              value={timeRange}
              onChange={setTimeRange}
            />
          </Form.Item>
          <Form.Item label={"养殖批次"}>
            <CultureBatchSelector
              allowClear
              onChange={(v) => setCultureBatchId(ToNumber(v))}
              placeholder="请选择养殖批次"
            />
          </Form.Item>
          <Form.Item label={"养殖人员"}>
            <UserSelector
              allowClear
              onChange={(v) => setWorkerId(ToNumber(v))}
              placeholder={"请选择养殖人员"}
            />
          </Form.Item>
          {/*<Form.Item label={'任务类型'}>*/}
          {/*  <WorkScheduleTypeRadio onChange={v => setType(v.target.value)} />*/}
          {/*</Form.Item>*/}
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                search.submit();
              }}
            >
              搜索
            </Button>
          </Form.Item>
        </Form>
      </ProCard>
      <ProCard style={{ marginTop: 16 }}>
        <Table<WorkScheduleDto>
          {...tableProps}
          rowKey={"id"}
          rowClassName={UseZebra}
        >
          <Table.Column<WorkScheduleDto> title="任务名称" dataIndex="name" />
          <Table.Column<WorkScheduleDto>
            title="任务类型"
            dataIndex={["type"]}
            render={(_, row) => <WorkScheduleTypeTag type={_} />}
          />
          <Table.Column<WorkScheduleDto>
            title="任务状态"
            dataIndex={["status"]}
            render={(_, row) => <WorkScheduleStatusTag workSchedule={row} />}
          />
          <Table.Column<WorkScheduleDto>
            title="养殖批次"
            dataIndex={["cultureBatch", "code"]}
          />

          <Table.Column<WorkScheduleDto>
            title="养殖人员"
            dataIndex={["worker", "name"]}
          />
          <Table.Column<WorkScheduleDto>
            title="完成时间"
            dataIndex={"finishTime"}
          />
          <Table.Column<WorkScheduleDto>
            title="任务备注"
            dataIndex="description"
            render={(_, row) => (
              <Typography.Text ellipsis={true} style={{ width: 200 }}>
                {_}
              </Typography.Text>
            )}
          />
          <Table.Column<WorkScheduleDto>
            title="操作"
            render={(text, row) => {
              return (
                <Button.Group>
                  <Button disabled type={"link"}>
                    编辑
                  </Button>
                  {(row.type === WorkType.投喂 ||
                    row.type === WorkType.投放试剂) && (
                    <Button
                      type={"link"}
                      onClick={() => {
                        setSelected(row);
                        if ((row.finishParameter as any)?.materialId)
                          materialFindHook.requestSync({
                            id: (row.finishParameter as any)?.materialId,
                          });
                      }}
                    >
                      物料使用
                    </Button>
                  )}
                  {row.type === WorkType.捕捞 && (
                    <Button
                      type={"link"}
                      onClick={() => {
                        setSelected(row);
                      }}
                    >
                      捕捞量
                    </Button>
                  )}
                  {row.type === WorkType.测量体长体重 && (
                    <Button
                      type={"link"}
                      onClick={() => {
                        setSelected(row);
                      }}
                    >
                      测量结果
                    </Button>
                  )}
                  {row.type === WorkType.放苗 && (
                    <Button
                      type={"link"}
                      onClick={() => {
                        setSelected(row);
                      }}
                    >
                      放苗信息
                    </Button>
                  )}
                </Button.Group>
              );
            }}
          />
        </Table>
        <Modal
          visible={!!selected}
          onCancel={() => setSelected(undefined)}
          footer={null}
        >
          {(selected?.finishParameter as any)?.pondFeedInfoList?.[0]
            ?.dosage && (
            <Descriptions bordered>
              <Descriptions.Item label={materialFindHook.data?.name}>
                {
                  (selected?.finishParameter as any)?.pondFeedInfoList?.[0]
                    ?.dosage
                }{" "}
                kg
              </Descriptions.Item>
            </Descriptions>
          )}
          {selected?.type === WorkType.投放试剂 && (
            <Descriptions bordered>
              <Descriptions.Item>
                {selected.finishParameter.finishRemark}
              </Descriptions.Item>
            </Descriptions>
          )}
          {selected?.type === WorkType.捕捞 && (
            <Descriptions bordered>
              <Descriptions.Item label={"捕捞量"}>
                {selected.finishParameter?.count}
              </Descriptions.Item>
            </Descriptions>
          )}
          {selected?.type === WorkType.测量体长体重 && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label={"平均体重"}>
                {selected.finishParameter?.averageWeight}
              </Descriptions.Item>
              <Descriptions.Item label={"平均体长"}>
                {selected.finishParameter?.averageLength}
              </Descriptions.Item>
              <Descriptions.Item label={"抽检条数"}>
                {selected.finishParameter?.count}
              </Descriptions.Item>
            </Descriptions>
          )}
          {selected?.type === WorkType.放苗 && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label={"放苗数"}>
                {selected.finishParameter?.pondCountInfoList?.[0]?.count}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </ProCard>
    </PageContainer>
  );
}
