import React from "react";
import { Divider, Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { NotificationApi } from "../../../scaffold";

export default function NotificationSelector(props: SelectProps<string>) {
  const searchHook = useOpenApiFpRequest(
    NotificationApi,
    NotificationApi.prototype.notificationSearchGet
  );
  useMount(() => {
    searchHook.requestSync({ pi: 1, ps: 999 });
  });
  return (
    <Select
      {...props}
      showSearch={true}
      filterOption={(word, option) => option?.title.includes(word)}
    >
      {searchHook?.data?.list?.map((i) => (
        <Select.Option key={i.id} value={i.id!} title={`${i.title}`}>
          {i.title}
        </Select.Option>
      ))}
    </Select>
  );
}
