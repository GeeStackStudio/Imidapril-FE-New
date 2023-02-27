import React from "react";
import { Sensor } from "../../../scaffold";
import Flex from "../Flex";
import { SensorDescriptionItem } from "./SensorDescriptionItem";

export function SensorCard(props: { sensor?: Sensor }) {
  return (
    <div>
      <div
        className="card-title"
        style={{
          marginTop: 32,
        }}
      >
        <div className="card-title-background" />
        <div className="card-title-background1" />
        <div className="card-title-background2" />
        <div className="card-title-background3" />
        <div className="card-title-text">{props.sensor?.name}</div>
      </div>
      <div
        className="card"
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingTop: 8,
        }}
      >
        <Flex direction="row">
          <SensorDescriptionItem
            label="温度"
            data={props.sensor?.temperature}
            unit={"℃"}
          />
          <SensorDescriptionItem
            label="溶解氧"
            data={props.sensor?.dissolvedOxygen}
          />
          <SensorDescriptionItem label="PH" data={props.sensor?.ph} />
          <SensorDescriptionItem label="浊度" data={props.sensor?.turbidity} />
          <SensorDescriptionItem
            label="氨氮"
            data={props.sensor?.ammoniaNitrogen}
          />
          <SensorDescriptionItem label="盐度" data={props.sensor?.salinity} />
        </Flex>
      </div>
    </div>
  );
}
