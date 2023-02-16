import {
  CultureBatchApi,
  CultureBatchDto,
  CultureBatchToPond,
  PondDto,
} from "../../../scaffold";
import { Button, message, Table } from "antd";
import React, { CSSProperties } from "react";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useAntdTable, useMount } from "ahooks";
import moment from "moment";
import { CultureBatchTable } from "./CultureBatchTable";

export function CultureBatchTableCtrl(props: {
  style?: CSSProperties;
  onClickDetail?: (row: CultureBatchDto) => any;
}) {
  const searchHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchSearchGet
  );
  const { tableProps, search, loading } = useAntdTable(
    (params) =>
      searchHook.request({
        pi: params.current,
        ps: params.pageSize,
      }) as any,
    {
      onError: (e) => message.error(e.message),
    }
  );
  useMount(() => {
    search.submit();
  });

  return (
    <CultureBatchTable
      style={props.style}
      {...tableProps}
      onClickDetail={props.onClickDetail}
    />
  );
}
