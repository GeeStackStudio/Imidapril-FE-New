import React from "react";
import { Tag } from "antd";
import { CultureBatchStatus, MaterialTypeDto } from "../../../scaffold";
const colors = ["#2196F3", "#87d068", "#108ee9"];

export function MaterialTypeTag(props: { type?: MaterialTypeDto }) {
  const color = colors[(props.type?.id ?? 0) % colors.length];
  return <Tag color={color}>{props.type?.name}</Tag>;
}
