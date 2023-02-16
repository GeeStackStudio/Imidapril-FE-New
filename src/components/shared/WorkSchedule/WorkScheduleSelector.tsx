import React from "react";
import { Divider, Select } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { WorkScheduleApi } from "../../../scaffold";

export default function WorkScheduleSelector(props: SelectProps<string>) {
  const searchHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleSearchGet
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
        <Select.Option
          key={i.id}
          value={i.id!}
          title={`${i.name}|${i.description}`}
        >
          {i.name}
          <Divider type="vertical" />
          {i.description}
        </Select.Option>
      ))}
    </Select>
  );
}
