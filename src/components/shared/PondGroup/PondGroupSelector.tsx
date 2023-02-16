import React from "react";
import { Divider, Select, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { PondGroupApi } from "../../../scaffold";

export default function PondGroupSelector(props: SelectProps<string>) {
  const searchHook = useOpenApiFpRequest(
    PondGroupApi,
    PondGroupApi.prototype.pondGroupSearchGet
  );
  useMount(() => {
    searchHook.requestSync({ pi: 1, ps: 999 });
  });
  return (
    <Select
      style={{ minWidth: 230 }}
      {...props}
      showSearch={true}
      filterOption={(word, option) => option?.title.includes(word)}
    >
      {searchHook?.data?.list?.map((i) => (
        <Select.Option key={i.id} value={i.id!} title={`${i.name}`}>
          {i.name}
          <Divider type="vertical" />
          <Typography.Text type="secondary">
            {i.workShopToPondGroup?.workShop?.name}
          </Typography.Text>
          <Divider type="vertical" />
          <Typography.Text type="secondary">
            对应 {i.pondGroupToPonds?.map((i) => i.pond?.name).length} 个池塘
          </Typography.Text>
        </Select.Option>
      ))}
    </Select>
  );
}
