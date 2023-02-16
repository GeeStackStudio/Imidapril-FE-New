import { Tag } from "antd";
import React from "react";
import {
  WorkScheduleDto,
  WorkScheduleStatus,
  WorkType,
} from "../../../scaffold";
import { WorkTypeList } from "./WorkScheduleTypeRadio";
const mapList = ["#389e0d", "#096dd9", "#d48806", "#d4b106", "#7cb305"];
export function WorkScheduleStatusTag(props: {
  workSchedule?: WorkScheduleDto;
}) {
  let color = undefined;
  let text: string | undefined = props.workSchedule?.status;
  if (props.workSchedule?.status === "已安排") {
    color = "#08979c";
  } else if (!props.workSchedule?.isReadyToFinish) {
    color = "#f5222d";
    text = "需进行配置";
  } else if (props.workSchedule?.status === "已完成") {
    color = "#389e0d";
  }
  return <Tag color={color}>{text}</Tag>;
}
