import React, { useCallback, useEffect, useRef } from "react";
import Flex from "../Flex";
import { Typography } from "antd";

export function WorkScheduleCalenderLegend() {
  return (
    <Flex direction={"column"}>
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"middle"}
        style={{ marginTop: 16 }}
      >
        <div style={{ width: 60, height: 30, background: "#f5222d" }} />
        <Typography.Text>需进行配置</Typography.Text>
      </Flex>
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"middle"}
        style={{ marginTop: 16 }}
      >
        <div style={{ width: 60, height: 30, background: "#08979c" }} />
        <Typography.Text>已安排</Typography.Text>
      </Flex>
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"middle"}
        style={{ marginTop: 16 }}
      >
        <div style={{ width: 60, height: 30, background: "#389e0d" }} />
        <Typography.Text>已完成</Typography.Text>
      </Flex>
    </Flex>
  );
}
