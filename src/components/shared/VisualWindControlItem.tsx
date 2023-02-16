import Flex from "./Flex";
import { Slider, Switch, Typography } from "antd";
import { MaterialCardDark } from "./MaterialCard/MaterialCardDark";
import React, { CSSProperties } from "react";

export function VisualWindControlItem(props: {
  name: string;
  isOn?: boolean;
  percent?: number;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  width?: number;
  onChange?: (v: boolean) => any;
}) {
  return (
    <MaterialCardDark
      shadow={true}
      style={{ ...props.style }}
      bodyStyle={{ padding: 2, ...props.bodyStyle, height: 60 }}
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        direction={"row"}
        style={{ padding: 12, width: props.width ?? 160, height: "100%" }}
      >
        <Typography.Text style={{ fontSize: 12 }}>{props.name}</Typography.Text>
        {props.percent !== undefined && props.percent !== null && (
          <Flex direction={"column"}>
            <Typography.Text>{Number(props.percent) * 100} %</Typography.Text>
            <Slider
              handleStyle={{ backgroundColor: "#2196F3" }}
              trackStyle={{ backgroundColor: "#2196F3" }}
              style={{ width: 80, padding: 0, margin: 0 }}
              value={Number(props.percent) * 100}
              max={100}
              min={0}
            />
          </Flex>
        )}
        {(props.percent === undefined || props.percent === null) && (
          <Switch
            onChange={props.onChange}
            checkedChildren="开启中"
            unCheckedChildren={"关闭中"}
            checked={props.isOn}
          />
        )}
      </Flex>
    </MaterialCardDark>
  );
}
