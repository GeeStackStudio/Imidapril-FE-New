import React, { CSSProperties, useMemo } from "react";
import { Card, CardProps } from "antd";
import "./MaterialCard.less";
interface IProps extends CardProps {
  shadow?: boolean;
  blur?: number;
}
export function MaterialCardDark(props: IProps) {
  const { shadow, ...rest } = props;
  const style = useMemo<CSSProperties>(() => {
    if (props.shadow) {
      return {
        boxShadow: "1px 1px 6px 1px #002329",
      };
    } else {
      return {
        boxShadow: undefined,
      };
    }
  }, [props.shadow]);
  return (
    <Card
      bordered={false}
      {...props}
      className={`MaterialCardDark dark-background ${props.className || ""}`}
      style={{ ...props.style }}
      bodyStyle={{
        ...style,
        ...props.bodyStyle,
        backdropFilter: props.blur ? `blur(${props.blur}px)` : undefined,
      }}
    />
  );
}
