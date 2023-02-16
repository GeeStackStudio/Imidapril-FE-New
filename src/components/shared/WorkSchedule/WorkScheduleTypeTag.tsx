import { Tag } from "antd";
import React, { CSSProperties } from "react";
import { WorkType } from "../../../scaffold";
import { WorkTypeList } from "./WorkScheduleTypeRadio";
const mapList = ["#389e0d", "#096dd9", "#d48806", "#d4b106", "#7cb305"];
export function WorkScheduleTypeTag(props: {
  type?: WorkType;
  style?: CSSProperties;
}) {
  const color = props.type
    ? mapList[WorkTypeList.indexOf(props.type as any) % mapList.length]
    : "#333";
  return (
    <Tag style={props.style} color={color}>
      {props.type}
    </Tag>
  );
}
