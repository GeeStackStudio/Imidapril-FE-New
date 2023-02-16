import Flex from "./Flex";
import { Slider, Switch, Typography } from "antd";
import { MaterialCardDark } from "./MaterialCard/MaterialCardDark";
import React, { CSSProperties } from "react";

export function VisualDeviceStatusItem(props: {
  name: string;
  isOn?: boolean;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}) {
  return (
    <MaterialCardDark
      shadow={true}
      style={props.style}
      bodyStyle={{ padding: 2, ...props.bodyStyle }}
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        direction={"row"}
        style={{ padding: 12, width: 160 }}
      >
        <Typography.Text style={{ fontSize: 12 }}>{props.name}</Typography.Text>
        <Flex align="center">
          <Typography.Text style={{ fontSize: 12 }}>
            {props.isOn ? "运行" : "关闭"}
          </Typography.Text>
          <div
            style={{
              height: 10,
              width: 10,
              marginLeft: 8,
              background: props.isOn ? "green" : "red",
              borderRadius: "50%",
            }}
          ></div>
        </Flex>
      </Flex>
    </MaterialCardDark>
  );
}
