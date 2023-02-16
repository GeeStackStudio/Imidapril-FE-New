import React from "react";
import { Radio } from "antd";
import { WorkType } from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";

export default function PlantWorkScheduleTypeRadio(props: RadioProps) {
  return (
    <Radio.Group {...props}>
      {[
        WorkType.种苗,
        WorkType.浇水,
        WorkType.疏盆,
        WorkType.刷洗青苔,
        WorkType.打药,
        WorkType.日常检查,
      ].map((i) => (
        <Radio value={i} key={i}>
          {i}
        </Radio>
      ))}
    </Radio.Group>
  );
}
