import React from "react";
import { Divider, Radio, Select, Space, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { CultureBatchType, WorkScheduleApi, WorkType } from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";

export default function WorkScheduleTypeSelector(props: SelectProps<WorkType>) {
  return (
    <Select {...props}>
      <Select.OptGroup key="日常任务">
        {[
          WorkType.投喂,
          WorkType.日常检查,
          WorkType.测量体长体重,
          WorkType.水样送检,
          WorkType.排污,
          WorkType.试苗,
          WorkType.捕捞,
        ].map((i) => (
          <Select.Option value={i} key={i}>
            {i}
          </Select.Option>
        ))}
      </Select.OptGroup>
      <Select.OptGroup key="养殖前任务">
        {[
          WorkType.养殖前清塘,
          WorkType.养殖前消毒,
          WorkType.养殖前刷塘,
          WorkType.养殖前生物池冲洗,
          WorkType.养殖前检查清洗,
          WorkType.养殖前蒙网,
        ].map((i) => (
          <Select.Option value={i} key={i}>
            {i}
          </Select.Option>
        ))}
      </Select.OptGroup>
    </Select>
  );
}
