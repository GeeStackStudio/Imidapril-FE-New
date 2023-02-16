import React from "react";
import { Divider, Select, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { UserApi } from "../../../scaffold";

export default function UserSelector(props: SelectProps<string>) {
  const searchHook = useOpenApiFpRequest(
    UserApi,
    UserApi.prototype.userSearchGet
  );
  useMount(() => {
    searchHook.requestSync({ pi: 1, ps: 999 });
  });
  return (
    <Select
      style={{ minWidth: 300 }}
      {...props}
      showSearch={true}
      filterOption={(word, option) => option?.title.includes(word)}
    >
      {searchHook?.data?.list?.map((i) => (
        <Select.Option
          key={i.id}
          value={i.id!}
          title={`${i.name}|${i.username}`}
        >
          {i.name}
          <Divider type="vertical" />
          <Typography.Text type="secondary">{i.role}</Typography.Text>
        </Select.Option>
      ))}
    </Select>
  );
}
