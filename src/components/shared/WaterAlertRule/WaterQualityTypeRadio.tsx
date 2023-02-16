import React from "react";
import { Divider, Radio, Select, Space, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import {
  CultureBatchType,
  WaterQualityType,
  WorkScheduleApi,
  WorkType,
} from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";

export default function WaterQualityTypeRadio(props: RadioProps) {
  return (
    <Radio.Group {...props}>
      <Radio value={WaterQualityType.温度} key={WaterQualityType.温度}>
        {WaterQualityType.温度}
      </Radio>
      <Radio value={WaterQualityType.溶解氧} key={WaterQualityType.溶解氧}>
        {WaterQualityType.溶解氧}
      </Radio>
      <Radio value={WaterQualityType.Ph} key={WaterQualityType.Ph}>
        {WaterQualityType.Ph}
      </Radio>
      <Radio value={WaterQualityType.氨氮} key={WaterQualityType.氨氮}>
        {WaterQualityType.氨氮}
      </Radio>
      <Radio value={WaterQualityType.盐度} key={WaterQualityType.盐度}>
        {WaterQualityType.盐度}
      </Radio>
      <Radio value={WaterQualityType.浊度} key={WaterQualityType.浊度}>
        {WaterQualityType.浊度}
      </Radio>
      <Radio value={WaterQualityType.Orp} key={WaterQualityType.Orp}>
        {WaterQualityType.Orp}
      </Radio>
    </Radio.Group>
  );
}
