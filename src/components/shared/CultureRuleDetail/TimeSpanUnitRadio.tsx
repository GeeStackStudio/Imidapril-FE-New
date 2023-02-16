import React from "react";
import { Divider, Radio, Select, Space, Typography } from "antd";
import {
  CultureBatchType,
  RepeatType,
  WorkScheduleApi,
  WorkType,
} from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";

export default function RepeatTypeRadio(props: RadioProps) {
  return (
    <Radio.Group {...props}>
      <Radio value={RepeatType.天}>天</Radio>
      <Radio value={RepeatType.小时}>小时</Radio>
      <Radio value={RepeatType.不重复}>不重复</Radio>
    </Radio.Group>
  );
}
