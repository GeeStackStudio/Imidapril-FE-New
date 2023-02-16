import React from "react";
import { Divider, Radio, Select } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { BreedApi, CultureBatchType } from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";

export default function CultureBatchRadio(props: RadioProps) {
  // const searchHook = useOpenApiFpRequest(BreedApi, BreedApi.prototype.breedSearchGet);
  // useMount(() => {
  //   searchHook.requestSync({pi: 1, ps: 999});
  // });
  return (
    <Radio.Group {...props}>
      <Radio value={CultureBatchType.仔鱼养殖}>仔鱼养殖</Radio>
      <Radio value={CultureBatchType.亲本养殖}>亲本养殖</Radio>
      <Radio value={CultureBatchType.成鱼养殖}>成鱼养殖</Radio>
      <Radio value={CultureBatchType.温室培育}>温室培育</Radio>
    </Radio.Group>
  );
}
