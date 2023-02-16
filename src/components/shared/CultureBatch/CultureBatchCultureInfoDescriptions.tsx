import { CultureBatchDto, CultureInfo } from "../../../scaffold";
import { Descriptions } from "antd";
import React from "react";

export function CultureBatchCultureInfoDescriptions(props: {
  info?: CultureInfo;
}) {
  return (
    <Descriptions title="养殖信息">
      <Descriptions.Item label="养殖品种">
        {props.info?.variety ?? "尚未养殖"}
      </Descriptions.Item>
      <Descriptions.Item label="养殖尾数">
        {props.info?.count} 尾
      </Descriptions.Item>
      {props.info?.deathRate && (
        <Descriptions.Item label="死亡率">
          {(props.info?.deathRate * 100).toFixed(2)} %
        </Descriptions.Item>
      )}
      {props.info?.deathRate && props.info?.count && (
        <Descriptions.Item label="预计死亡数">
          {((props.info.deathRate / 100) * props.info.count).toFixed(0)} 尾
        </Descriptions.Item>
      )}
      <Descriptions.Item label="预计产量">
        {(props.info?.count ?? 0) -
          ((props.info?.deathRate ?? 0) / 100) * (props.info?.count ?? 0)}{" "}
        尾
      </Descriptions.Item>
      {props.info?.averageLength && (
        <Descriptions.Item label="平均体长">
          {props.info?.averageLength} mm
        </Descriptions.Item>
      )}
      {props.info?.averageWeight && (
        <Descriptions.Item label="平均体重">
          {props.info?.averageWeight} g
        </Descriptions.Item>
      )}
    </Descriptions>
  );
}
