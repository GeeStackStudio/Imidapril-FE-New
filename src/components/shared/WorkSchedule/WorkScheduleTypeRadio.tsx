import React from "react";
import { Divider, Radio, Select, Space, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { CultureBatchType, WorkScheduleApi, WorkType } from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";
export const WorkTypeList = [
  WorkType.养殖前清塘,
  WorkType.养殖前消毒,
  WorkType.养殖前刷塘,
  WorkType.养殖前生物池冲洗,
  WorkType.养殖前检查清洗,
  WorkType.养殖前蒙网,
  WorkType.投喂,
  WorkType.日常检查,
  WorkType.测量体长体重,
  WorkType.水样送检,
  WorkType.排污,
  WorkType.试苗,
  WorkType.放苗,
  WorkType.投放试剂,
  WorkType.排水,
  WorkType.分池,
  WorkType.产道检验,
  WorkType.受精任务,
  WorkType.洗卵清洁,
  WorkType.亲本挑选,
  WorkType.催产打针,
  WorkType.仔鱼称重,
  WorkType.捕捞,
];

export default function WorkScheduleTypeRadio(props: RadioProps) {
  return (
    <Radio.Group {...props}>
      <Space direction="vertical">
        {[
          WorkType.养殖前清塘,
          WorkType.养殖前消毒,
          WorkType.养殖前刷塘,
          WorkType.养殖前生物池冲洗,
          WorkType.养殖前检查清洗,
          WorkType.养殖前蒙网,
        ].map((i) => (
          <Radio value={i} key={i}>
            {i}
          </Radio>
        ))}
      </Space>
      <Space direction="vertical">
        {[
          WorkType.投喂,
          WorkType.日常检查,
          WorkType.测量体长体重,
          WorkType.水样送检,
          WorkType.排污,
          WorkType.试苗,
          WorkType.捕捞,
        ].map((i) => (
          <Radio value={i} key={i}>
            {i}
          </Radio>
        ))}
      </Space>
      <Space direction="vertical">
        {[
          WorkType.放苗,
          WorkType.投放试剂,
          WorkType.排水,
          WorkType.分池,
          WorkType.产道检验,
          WorkType.受精任务,
        ].map((i) => (
          <Radio value={i} key={i}>
            {i}
          </Radio>
        ))}
      </Space>
      <Space direction="vertical">
        {[
          WorkType.洗卵清洁,
          WorkType.亲本挑选,
          WorkType.催产打针,
          WorkType.仔鱼称重,
        ].map((i) => (
          <Radio value={i} key={i}>
            {i}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
}
