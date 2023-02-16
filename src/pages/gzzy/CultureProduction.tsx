import React, { useEffect, useState } from "react";
import { Button, Card, Form, message, Table } from "antd";
import { useBoolean } from "react-use";
import { useAntdTable, useMount } from "ahooks";
import { useNavigate } from "react-router-dom";
import {
  BriefApi,
  CultureBatchApi,
  CultureBatchDto,
  CultureBatchType,
  CultureBriefApi,
} from "../../scaffold";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import {PageContainer, ProCard} from "@ant-design/pro-components";

export function CultureProductionPage() {
  const searchHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchSearchGet
  );
  const cultureBriefHook = useOpenApiFpRequest(
    CultureBriefApi,
    CultureBriefApi.prototype.cultureBriefSearchGet
  );
  const briefHook = useOpenApiFpRequest(
    BriefApi,
    BriefApi.prototype.briefCountCultureGet
  );
  const navigate = useNavigate();
  const isAdd = useBoolean(false);
  const { tableProps, search, loading } = useAntdTable(
    (params) =>
      searchHook.request({
        pi: params.current,
        ps: params.pageSize,
      }) as any,
    {
      defaultPageSize: 10,
      onError: (e) => message.error(e.message),
    }
  );
  useMount(() => {
    briefHook.requestSync({
      type: CultureBatchType.温室培育,
    });
  });
  function getCount(cultureBatchId?: number) {
    return briefHook.data?.list?.find(
      (i) => i.cultureBatchId === cultureBatchId
    )?.total;
  }
  return (
    <PageContainer>
      <ProCard bodyStyle={{ padding: 0 }} style={{ marginTop: 32 }}>
        <Table<CultureBatchDto> {...tableProps} rowKey={"id"}>
          <Table.Column<CultureBatchDto> title="养殖编号" dataIndex="code" />
          <Table.Column<CultureBatchDto>
            title="放苗时间"
            dataIndex="fryTime"
            render={(_) => {
              return _ ?? "尚未放苗";
            }}
          />
          <Table.Column<CultureBatchDto>
            title="养殖品种"
            dataIndex={["breed", "name"]}
          />
          <Table.Column<CultureBatchDto>
            title="死亡数"
            dataIndex={["deathCount"]}
            render={(txt) => txt}
          />
          <Table.Column<CultureBatchDto>
            title="放苗量"
            dataIndex={["cultureInfo", "count"]}
            render={(_, row) => {
              return getCount(row.id);
            }}
          />
          <Table.Column<CultureBatchDto>
            title="预计产量"
            dataIndex={["cultureInfo", "count"]}
            render={(_, row) => {
              const count = getCount(row.id) ?? 0;
              return count - (row.deathCount ?? 0);
            }}
          />
          <Table.Column<CultureBatchDto>
            title="操作"
            render={(text, row) => {
              return (
                <Button.Group>
                  <Button
                    type={"link"}
                    onClick={() => {
                      navigate("/visual/app/cultureBatch/detail/" + row.id);
                    }}
                  >
                    查看生产信息
                  </Button>
                </Button.Group>
              );
            }}
          />
        </Table>
      </ProCard>
    </PageContainer>
  );
}
