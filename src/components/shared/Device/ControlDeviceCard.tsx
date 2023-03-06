import Flex from "../Flex";
import React, { CSSProperties, useEffect } from "react";
import { useBoolean } from "react-hanger";
import { message, Spin, Switch, Typography } from "antd";
import {
  ControlCabinetApi,
  ControlCabinetDto,
  DeviceDto,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { BsFan } from "react-icons/bs";
import { TbMeat } from "react-icons/tb";
import "./ControlDeviceCard.less";
export interface DeviceControlItem {
  device: DeviceDto;
  controlCabinet?: ControlCabinetDto;
  isOn: boolean;
}
export function ControlDeviceCard(props: {
  item: DeviceControlItem;
  style?: CSSProperties;
}) {
  const isOn = useBoolean(false);
  const turnOnHook = useOpenApiFpRequest(
    ControlCabinetApi,
    ControlCabinetApi.prototype.controlCabinetTurnOnPost
  );
  const turnOffHook = useOpenApiFpRequest(
    ControlCabinetApi,
    ControlCabinetApi.prototype.controlCabinetTurnOffPost
  );
  useEffect(() => {
    if (
      props.item.controlCabinet?.status &&
      props.item.device.channel !== undefined &&
      props.item.device.channel !== null
    ) {
      isOn.setValue(
        props.item.controlCabinet?.status[props.item.device.channel] === "1"
      );
    }
  }, [props.item]);
  const background = props.item.device.name?.includes("投饵机")
    ? "linear-gradient(rgba(75,198,239), rgba(108,148,219,1)"
    : "linear-gradient(rgba(56,234,189), rgba(76,189,190))";
  const shadowColor = props.item.device.name?.includes("投饵机")
    ? "rgba(67,126,169,1)"
    : "rgba(55,171,157,1)";
  return (
    <Flex
      className="ControlDeviceCard"
      key={props.item.device.id}
      style={{
        background,
        borderRadius: 14,
        overflow: "hidden",
        minHeight: 180,
        ...props.style,
        boxShadow: `0 0 32px 5px ${shadowColor}`,
      }}
      direction={"column"}
    >
      <Flex
        style={{
          width: 100,
          height: 30,
          borderBottomRightRadius: 14,
          background: "#454545",
          justifyContent: "center",
          fontWeight: 500,
        }}
        align={"center"}
      >
        <Typography.Text style={{ color: "#fff", padding: 8 }}>
          {props.item.device.name}
        </Typography.Text>
      </Flex>
      <Flex
        align={"center"}
        justify={"center"}
        style={{
          borderRadius: "50%",
          background: "#fff",
          width: 120,
          height: 120,
          alignSelf: "center",
          borderWidth: 0,
          marginTop: 16,
          boxShadow: "0 0 0 8px rgba(33,33,33,0.1)",
        }}
      >
        <Flex
          align={"center"}
          justify={"center"}
          style={{
            borderRadius: "50%",
            background: "#fff",
            width: 105,
            height: 105,
            alignSelf: "center",
            borderWidth: 0,
            boxShadow: "0 0 0 8px " + shadowColor,
          }}
        >
          {props.item.device.name?.includes("增氧机") && (
            <BsFan
              className={isOn.value ? "icon-spinning" : undefined}
              style={{ fontSize: 60, color: "#666" }}
            />
          )}
          {props.item.device.name?.includes("投饵机") && (
            <TbMeat
              className={isOn.value ? "icon-spinning" : undefined}
              style={{ fontSize: 60, color: "#666" }}
            />
          )}
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        style={{ padding: "8px 16px", marginTop: 32 }}
      >
        <Typography.Text strong style={{ color: "#efefef", fontSize: 16 }}>
          电源
        </Typography.Text>
        <Switch
          style={{ boxShadow: "0 4px 16px 2px " + shadowColor }}
          checked={isOn.value}
          onChange={(v) => {
            isOn.setValue(v);
            if (v) {
              turnOnHook
                .request({
                  controlCabinetTurnOnParams: {
                    id: Number(props.item.controlCabinet?.id),
                    channel: Number(props.item.device.channel),
                  },
                })
                .then((r) => {
                  message.success(props.item.device.name + "开启成功");
                })
                .catch((e) => message.error(e.message));
            } else {
              turnOffHook
                .request({
                  controlCabinetTurnOffParams: {
                    id: Number(props.item.controlCabinet?.id),
                    channel: Number(props.item.device.channel),
                  },
                })
                .then((r) => {
                  message.success(props.item.device.name + "关闭成功");
                })
                .catch((e) => message.error(e.message));
            }
          }}
        />
      </Flex>
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        style={{
          padding: "8px 16px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography.Text strong style={{ color: "#efefef", fontSize: 16 }}>
          控制柜
        </Typography.Text>
        <Typography.Text strong style={{ color: "#efefef", fontSize: 16 }}>
          {props.item.controlCabinet?.name}
        </Typography.Text>
      </Flex>
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        style={{
          padding: "8px 16px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography.Text strong style={{ color: "#efefef", fontSize: 16 }}>
          通道
        </Typography.Text>
        <Typography.Text strong style={{ color: "#efefef", fontSize: 16 }}>
          {Number(props.item.device.channel) + 1}
        </Typography.Text>
      </Flex>
    </Flex>
  );
}
