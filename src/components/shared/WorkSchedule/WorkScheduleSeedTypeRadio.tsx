import React from "react";
import { Divider, Radio, Select, Space, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { CultureBatchType, WorkScheduleApi, WorkType } from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";
export const SeedWorkTypeList = [
  WorkType.仔鱼称重,
  WorkType.洗卵清洁,
  WorkType.催产打针,
  WorkType.产道检验,
  WorkType.受精任务,
  WorkType.洗卵清洁,
  WorkType.亲本挑选,
  WorkType.投喂,
  WorkType.日常检查,
  WorkType.测量体长体重,
  WorkType.水样送检,
  WorkType.排污,
  WorkType.放苗,
  WorkType.投放试剂,
  WorkType.排水,
  WorkType.分池,
  WorkType.捕捞,
];

export default function WorkScheduleSeedTypeRadio(props: RadioProps) {
  return (
    <Radio.Group {...props}>
      {SeedWorkTypeList.map((i) => (
        <Radio value={i} key={i}>
          {i}
        </Radio>
      ))}
    </Radio.Group>
  );
}
