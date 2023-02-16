import React from "react";
import { Divider, Radio, Select } from "antd";
import { BreedApi, BreedType, CultureBatchType } from "../../../scaffold";
import { RadioProps } from "antd/lib/radio";

export default function BreedTypeRadio(props: RadioProps) {
  // const searchHook = useOpenApiFpRequest(BreedApi, BreedApi.prototype.breedSearchGet);
  // useMount(() => {
  //   searchHook.requestSync({pi: 1, ps: 999});
  // });
  return (
    <Radio.Group {...props}>
      <Radio value={BreedType.动物}>动物</Radio>
      <Radio value={BreedType.植物}>植物</Radio>
    </Radio.Group>
  );
}
