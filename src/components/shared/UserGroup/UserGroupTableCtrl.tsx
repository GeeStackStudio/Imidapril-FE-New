import { UserGroupApi, UserGroupDto } from "../../../scaffold";
import { Button, message, Table } from "antd";
import React, { CSSProperties } from "react";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useAntdTable, useMount } from "ahooks";
import moment from "moment";
import { UserGroupTable } from "./UserGroupTable";

export function UserGroupTableCtrl(props: {
  style?: CSSProperties;
  onClickDetail?: (row: UserGroupDto) => any;
}) {
  const searchHook = useOpenApiFpRequest(
    UserGroupApi,
    UserGroupApi.prototype.userGroupSearchGet
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

  return <UserGroupTable style={props.style} {...tableProps} />;
}
