import moment from "moment";
import React from "react";
import { Divider, Select, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { CultureBatchApi, PondGroupApi } from "../../../scaffold";

export default function CultureBatchSelector(props: SelectProps<string>) {
  const searchHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchSearchGet
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
        <Select.Option key={i.id} value={i.id!} title={`${i.code}`}>
          {i.code}
          <Divider type="vertical" />
          <Typography.Text type="secondary">{i.type}</Typography.Text>
          <Divider type="vertical" />
          <Typography.Text type="secondary">{i.breed?.name}</Typography.Text>
        </Select.Option>
      ))}
    </Select>
  );
}
