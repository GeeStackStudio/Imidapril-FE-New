import React from "react";
import { Divider, Typography } from "antd";
import { PondDto } from "../scaffold";
export function PondCompleteName(props: { pond: PondDto }) {
  return (
    <div>
      <Typography.Text type={"secondary"}>
        {props.pond.pondGroupToPond?.pondGroup?.workShopToPondGroup?.workShop
          ?.name ?? "无车间"}
      </Typography.Text>
      <Divider type="vertical" />
      <Typography.Text type={"secondary"}>
        {props.pond.pondGroupToPond?.pondGroup?.name ?? "无车间"}
      </Typography.Text>
      <Divider type="vertical" />
      <Typography.Text strong>{props.pond.name}</Typography.Text>
    </div>
  );
}
