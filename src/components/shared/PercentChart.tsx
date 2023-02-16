import React, { CSSProperties, useMemo } from "react";
import EChartsReact from "echarts-for-react";
import { Typography } from "antd";
import Flex from "./Flex";

export function PercentChart(props: {
  style?: CSSProperties;
  percent: number;
  value?: string | number;
  suffix?: string;
}) {
  const list = useMemo(() => {
    return Array(100)
      .fill({
        value: 100,
        name: "NotFinished",
      })
      .map((i, index) => {
        if (index < props.percent * 100) {
          return {
            value: 100,
            name: "Finished",
          };
        }
        return i;
      });
  }, [props.percent]);
  return (
    <div style={{ position: "relative", ...props.style }}>
      <EChartsReact
        theme="dark"
        style={{ height: "100%", width: "100%" }}
        option={{
          backgroundColor: "",
          grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          series: [
            {
              color: ["#00d7fe", "#005dba"],
              name: "访问来源",
              type: "pie",
              radius: ["60%", "100%"],
              itemStyle: {
                borderRadius: 0,
                borderColor: "rgba(88,88,88,0.2)",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              data: list,
            },
          ],
        }}
      />
      <Flex
        style={{
          position: "absolute",
          color: "white",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        align={"center"}
        justify={"center"}
      >
        <Typography.Text style={{ fontSize: 26, color: "#02effe" }}>
          {props.value ? props.value : props.percent * 100}
          {props.suffix}
        </Typography.Text>
      </Flex>
    </div>
  );
}
