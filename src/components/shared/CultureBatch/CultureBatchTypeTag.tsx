import { Tag } from "antd";
import React from "react";
import { CultureBatchType, WorkType } from "../../../scaffold";
const mapList = ["#389e0d", "#096dd9", "#d48806", "#d4b106", "#7cb305"];
export const CultureBatchTypeList = [
  CultureBatchType.亲本养殖,
  CultureBatchType.仔鱼养殖,
  CultureBatchType.成鱼养殖,
  CultureBatchType.温室培育,
];
export function CultureBatchTypeTag(props: { type?: CultureBatchType }) {
  const color = props.type
    ? mapList[CultureBatchTypeList.indexOf(props.type) % mapList.length]
    : "#333";
  return <Tag color={color}>{props.type}</Tag>;
}
