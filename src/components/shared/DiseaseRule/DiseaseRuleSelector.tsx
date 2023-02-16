import React from "react";
import { Divider, Select } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { DiseaseRuleApi } from "../../../scaffold";

export default function DiseaseRuleSelector(props: SelectProps<string>) {
  const searchHook = useOpenApiFpRequest(
    DiseaseRuleApi,
    DiseaseRuleApi.prototype.diseaseRuleSearchGet
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
        <Select.Option key={i.id} value={i.id!} title={`${i.name}`}>
          {i.name}
        </Select.Option>
      ))}
    </Select>
  );
}
