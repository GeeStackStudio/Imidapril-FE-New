import React from "react";
import { Divider, Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { PeriodUnitType } from "../../../scaffold";

export default function PeriodUnitTypeSelector(props: SelectProps<string>) {
  return (
    <Select
      {...props}
      showSearch={true}
      filterOption={(word, option) => option?.title.includes(word)}
    >
      <Select.Option value={PeriodUnitType.天} title={PeriodUnitType.天}>
        {PeriodUnitType.天}
      </Select.Option>
      <Select.Option value={PeriodUnitType.小时} title={PeriodUnitType.小时}>
        {PeriodUnitType.小时}
      </Select.Option>
      <Select.Option value={PeriodUnitType.分钟} title={PeriodUnitType.分钟}>
        {PeriodUnitType.分钟}
      </Select.Option>
    </Select>
  );
}
