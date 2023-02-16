import React from "react";
import { Tag } from "antd";
import { CultureBatchStatus } from "../../../scaffold";

export function CultureBatchStatusTag(props: { status: CultureBatchStatus }) {
  let color = "#2196F3";
  if (props.status == CultureBatchStatus.养殖前准备) {
    color = "#2db7f5";
  } else if (props.status == CultureBatchStatus.养殖中) {
    color = "#108ee9";
  } else if (props.status == CultureBatchStatus.已结束) {
    color = "#87d068";
  }
  return <Tag color={color}>{props.status}</Tag>;
}
