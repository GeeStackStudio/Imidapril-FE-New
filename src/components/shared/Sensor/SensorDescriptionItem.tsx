import { Sensor } from "../../../scaffold";
import Flex from "../Flex";
import React from "react";

export function SensorDescriptionItem(props: {
  label: string;
  data?: string | number;
  unit?: string;
  sensor?: Sensor;
}) {
  return (
    <Flex align="flex-start" direction="column" style={{ padding: 16 }}>
      <span className="description-title">{props.label}</span>
      <span className="description-content">
        {props.data} {props.unit}
      </span>
    </Flex>
  );
}
