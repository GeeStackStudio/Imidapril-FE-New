import moment from "moment";
import React, { useEffect } from "react";
import { Divider, Select } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { CultureRuleApi, PondGroupApi } from "../../../scaffold";

interface IProps extends SelectProps<string> {
  breedId?: number;
}
export default function CultureRuleSelector(props: IProps) {
  const searchHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleSearchGet
  );
  useEffect(() => {
    searchHook.requestSync({ pi: 1, ps: 999, breedId: props.breedId });
  }, [props.breedId]);
  return (
    <Select
      {...props}
      showSearch={true}
      filterOption={(word, option) => option?.title.includes(word)}
    >
      {searchHook?.data?.list?.map((i) => (
        <Select.Option key={i.id} value={i.id!} title={`${i.name}`}>
          {i.name}
          <Divider type="vertical" />
          {i.breed?.name}
        </Select.Option>
      ))}
    </Select>
  );
}
