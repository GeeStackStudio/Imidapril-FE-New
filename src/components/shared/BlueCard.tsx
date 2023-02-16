import React, { CSSProperties } from "react";
import "./BlueCard.less";

export function BlueCard(props: {
  style?: CSSProperties;
  title?: string;
  children?: JSX.Element;
}) {
  return (
    <div className="blue-card">
      <div className="card-container" style={props.style}>
        <div
          className="card-title"
          style={{ visibility: props.title ? "inherit" : "hidden" }}
        >
          <span>{props.title}</span>
        </div>
        <div className="card">
          <div className="card-border-left-top" />
          <div className="card-border-left-bottom" />
          <div className="card-border-right-bottom" />
          <div className="card-border-right-top" />
          {props.children}
        </div>
      </div>
    </div>
  );
}
