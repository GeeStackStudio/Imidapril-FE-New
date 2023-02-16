import {
  Button,
  Card,
  Form,
  message,
  Table,
  DatePicker,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useAntdTable } from "ahooks";
import CultureBatchSelector from "../../components/shared/CultureBatch/CultureBatchSelector";
import UserAvatar from "../../components/User/UserAvatar";
import Flex from "../../components/shared/Flex";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import {
  BriefApi,
  BriefListUserWorkloadResponseItemDto,
  UserApi,
} from "../../scaffold";
import { PageContainer, ProCard } from "@ant-design/pro-components";
export function WorkloadCostPage() {
  const searchHook = useOpenApiFpRequest(
    UserApi,
    UserApi.prototype.userSearchGet
  );
  const fetchHook = useOpenApiFpRequest(
    BriefApi,
    BriefApi.prototype.briefListUserWorkLoadGet
  );
  const [cultureBatchId, setCultureBatchId] = useState<number>();
  const [timeRange, setTimeRange] = useState<any>([]);
  const { tableProps, search, loading } = useAntdTable(
    async (params) => {
      const response = await fetchHook.request({
        cultureBatchId: cultureBatchId,
        from: timeRange[0]?.format("YYYY-MM-DD 00:00:00"),
        to: timeRange[1]?.format("YYYY-MM-DD 23:29:29"),
      });
      return {
        list: response,
        total: response.length,
      };
    },
    {
      defaultPageSize: 10,
      onError: (e) => message.error(e.message),
    }
  );
  useEffect(() => {
    search.submit();
    searchHook.requestSync({
      pi: 1,
      ps: 999,
    });
  }, [cultureBatchId]);
  return (
    <PageContainer>
      <ProCard>
        <Form layout={"inline"}>
          <Form.Item label="请选择养殖批次">
            <CultureBatchSelector
              style={{ width: 300 }}
              allowClear
              placeholder="请选择养殖批次"
              onChange={(v) => setCultureBatchId(v ? Number(v) : undefined)}
            />
          </Form.Item>
          <Form.Item label="选择时间段">
            <DatePicker.RangePicker
              value={timeRange}
              allowClear
              onChange={setTimeRange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                search.submit();
              }}
            >
              查询
            </Button>
          </Form.Item>
        </Form>
      </ProCard>
      <Flex direction={"row"} style={{ flexWrap: "wrap" }}>
        {searchHook.data?.list?.map((i) => {
          return (
            <ProCard
              style={{ width: 300, marginTop: 16, marginRight: 16 }}
              bodyStyle={{ padding: 0 }}
              key={i.id}
            >
              <Flex direction={"row"} align={"center"}>
                <UserAvatar style={{ width: 80, height: 80 }} user={i} />
                <Flex direction={"column"}>
                  <Typography.Text style={{ marginLeft: 16, fontSize: 15 }}>
                    {i.name}
                  </Typography.Text>
                  <Typography.Text style={{ marginLeft: 16, fontSize: 20 }}>
                    完成任务数:{" "}
                    {tableProps.dataSource.find((ii) => ii.workerId === i.id)
                      ?.count ?? 0}
                  </Typography.Text>
                </Flex>
              </Flex>
            </ProCard>
          );
        })}
      </Flex>

      <ProCard bodyStyle={{ padding: 0 }} style={{ marginTop: 32 }}>
        <Table<BriefListUserWorkloadResponseItemDto>
          {...tableProps}
          rowKey={"id"}
        >
          <Table.Column<BriefListUserWorkloadResponseItemDto>
            title="员工"
            dataIndex="workerName"
          />
          <Table.Column<BriefListUserWorkloadResponseItemDto>
            title="完成任务数"
            dataIndex="count"
          />
        </Table>
      </ProCard>
    </PageContainer>
  );
}
