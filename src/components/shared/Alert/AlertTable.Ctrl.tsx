import React, { useEffect } from "react";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { AlertApi } from "../../../scaffold";
import { useAntdTable } from "ahooks";
import { message } from "antd";
import { AlertTableView } from "./AlertTable.View";

export function AlertTableCtrl(props: { cultureBatchId?: number }) {
  const searchHook = useOpenApiFpRequest(
    AlertApi,
    AlertApi.prototype.alertSearchGet
  );
  const { tableProps, search } = useAntdTable(
    async (params) => {
      const res = await searchHook.request({
        pi: params.current,
        ps: params.pageSize,
        cultureBatchId: props.cultureBatchId,
      });
      return {
        list: res.list as any[],
        total: Number(res.total),
      };
    },
    {
      onError: (e) => message.error(e.message),
    }
  );
  useEffect(() => {
    search.submit();
  }, [props.cultureBatchId]);
  return <AlertTableView {...tableProps} />;
}
