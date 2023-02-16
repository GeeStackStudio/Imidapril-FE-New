import React from "react";
import { PondDto } from "../../../scaffold";
import { Descriptions, Divider, Typography } from "antd";
import Flex from "../Flex";

export function PondDescriptions(props: { pond?: PondDto }) {
  return (
    <Descriptions title="池塘信息">
      <Descriptions.Item label="池塘名称">{props.pond?.name}</Descriptions.Item>
      <Descriptions.Item label="池塘大小">{`${props.pond?.length}m / ${props.pond?.width}m / ${props.pond?.height}m`}</Descriptions.Item>
      <Descriptions.Item label="水体">
        {props.pond?.waterBody}
      </Descriptions.Item>
    </Descriptions>
  );
}
