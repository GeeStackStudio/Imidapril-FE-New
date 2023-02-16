import React, { CSSProperties } from "react";

export function ColoredDivider(props: {
  style?: CSSProperties;
  color?: string;
}) {
  return (
    <div
      style={{
        width: 4,
        height: 30,
        background: props.color ?? "#2196F3",
        marginRight: 8,
        ...props.style,
      }}
    />
  );
}
