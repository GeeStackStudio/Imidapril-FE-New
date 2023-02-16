import React, { useMemo } from "react";
import { AlertLevel } from "../../../scaffold";
import { Tag } from "antd";

export function AlertLevelTag(props: { level: AlertLevel }) {
  const color = useMemo(() => {
    switch (props.level) {
      case AlertLevel.严重:
        return "#f5222d";
      case AlertLevel.警报:
        return "#faad14";
      case AlertLevel.提示:
        return "#1890ff";
    }
  }, [props.level]);
  return <Tag color={color}>{props.level}</Tag>;
}
