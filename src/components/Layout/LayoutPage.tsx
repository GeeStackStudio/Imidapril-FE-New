import React, { CSSProperties } from "react";
import LayoutHeader from "./LayoutHeader";

export default function LayoutPage(props: {
  header?: any;
  style?: CSSProperties;
  children?: any;
}) {
  return (
    <div style={{ background: "transparent" }}>
      {props.header && <LayoutHeader>{props.header}</LayoutHeader>}
      <div style={props.style} className={"AppLayoutMainBody"}>
        {props.children}
      </div>
    </div>
  );
}
