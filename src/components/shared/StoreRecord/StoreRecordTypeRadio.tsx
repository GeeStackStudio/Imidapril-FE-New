import React from "react";
import { Divider, Radio, Select, Space, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import {
  CultureBatchType,
  StoreRecordType,
  WorkScheduleApi,
  WorkType,
} from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";

export default function StoreRecordTypeRadio(props: RadioProps) {
  const typeList = [StoreRecordType.出库, StoreRecordType.入库];
  return (
    <Radio.Group {...props}>
      {typeList.map((i) => (
        <Radio value={i} key={i}>
          {i}
        </Radio>
      ))}
    </Radio.Group>
  );
}
