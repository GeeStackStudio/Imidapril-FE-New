import Flex from "./Flex";
import React, { CSSProperties } from "react";
import "./VisualBlueCard.less";
export function VisualBlueCard(props: {
  style?: CSSProperties;
  children?: React.ReactNode;
  title?: string | React.ReactNode;
}) {
  return (
    <div className="VisualBlueCard" style={props.style}>
      <img
        alt="top"
        style={{ width: "100%", marginLeft: 8, marginTop: 4, height: 30 }}
        src="https://geestack-public.oss-cn-shanghai.aliyuncs.com/Imidapril/card-title-bg.png"
      />
      <Flex
        style={{
          height: 30,
          position: "absolute",
          right: 0,
          left: 0,
          top: 4,
          fontWeight: 500,
          fontSize: 16,
        }}
        align={"center"}
        justify={"center"}
      >
        {props.title}
      </Flex>
      <img
        alt="top"
        style={{
          width: 30,
          position: "absolute",
          right: 8,
          top: 6,
          height: 24,
        }}
        src="https://imidapril.oss-cn-shanghai.aliyuncs.com/more.png"
      />
      <Flex>{props.children}</Flex>
    </div>
  );
}
