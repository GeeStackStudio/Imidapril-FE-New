import React from "react";
import { UserGroupDto } from "../../../scaffold";
import { Descriptions, Divider, Typography } from "antd";
import Flex from "../Flex";

export function UserGroupDescriptions(props: { userGroup?: UserGroupDto }) {
  return (
    <Descriptions title="用户组">
      <Descriptions.Item label="名称">
        {props.userGroup?.name}
      </Descriptions.Item>
    </Descriptions>
  );
}
