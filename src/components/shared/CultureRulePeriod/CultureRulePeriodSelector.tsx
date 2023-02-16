import moment from "moment";
import React, { useMemo } from "react";
import { Divider, Select } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import {
  CultureRuleApi,
  CultureRulePeriodApi,
  PondGroupApi,
} from "../../../scaffold";

interface IProps extends SelectProps<string> {
  cultureRuleId?: number;
}

export default function CultureRulePeriodSelector(props: IProps) {
  const listHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleListPeriodGet
  );
  const searchHook = useOpenApiFpRequest(
    CultureRulePeriodApi,
    CultureRulePeriodApi.prototype.cultureRulePeriodSearchGet
  );
  useMount(() => {
    if (props.cultureRuleId) {
      listHook.requestSync({
        id: props.cultureRuleId,
      });
    } else {
      searchHook.requestSync({
        pi: 1,
        ps: 999,
      });
    }
  });
  const list = useMemo(() => {
    return props.cultureRuleId ? listHook.data : searchHook.data?.list;
  }, [listHook.data, searchHook.data]);
  return (
    <Select
      {...props}
      showSearch={true}
      filterOption={(word, option) => option?.title.includes(word)}
    >
      {list?.map((i) => (
        <Select.Option key={i.id} value={i.id!} title={`${i.name}`}>
          {i.name}
        </Select.Option>
      ))}
    </Select>
  );
}
