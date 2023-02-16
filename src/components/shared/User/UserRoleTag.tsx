import { Tag } from "antd";
import React, { CSSProperties } from "react";
import { UserRole, WorkType } from "../../../scaffold";
export const UserRoleList = [
  UserRole.管理员,
  UserRole.生产队长,
  UserRole.养殖人员,
];
const mapList = ["#389e0d", "#096dd9", "#d48806", "#d4b106", "#7cb305"];
export function UserRoleTag(props: { role?: UserRole; style?: CSSProperties }) {
  const color = props.role
    ? mapList[UserRoleList.indexOf(props.role) % mapList.length]
    : "#333";
  return (
    <Tag style={props.style} color={color}>
      {props.role}
    </Tag>
  );
}
