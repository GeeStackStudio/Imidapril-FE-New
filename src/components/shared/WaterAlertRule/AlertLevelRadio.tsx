import React from "react";
import { Divider, Radio, Select, Space, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import {
  AlertLevel,
  CultureBatchType,
  WaterQualityType,
  WorkScheduleApi,
  WorkType,
} from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";

export default function AlertLevelRadio(props: RadioProps) {
  return (
    <Radio.Group {...props}>
      <Radio value={AlertLevel.提示} key={AlertLevel.提示}>
        {AlertLevel.提示}
      </Radio>
      <Radio value={AlertLevel.警报} key={AlertLevel.警报}>
        {AlertLevel.警报}
      </Radio>
      <Radio value={AlertLevel.严重} key={AlertLevel.严重}>
        {AlertLevel.严重}
      </Radio>
    </Radio.Group>
  );
}
