import React from "react";
import { Card, CardProps } from "antd";
import "./MaterialCard.less";
export function MaterialCard(props: CardProps) {
  return <Card className="MaterialCard" {...props} />;
}
