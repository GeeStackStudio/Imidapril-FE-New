import React, { useMemo } from "react";
import { PondApi, PondDto, PondType } from "../../../scaffold";
import Flex from "../Flex";
import {
  Checkbox,
  CheckboxProps,
  Col,
  Divider,
  Row,
  Transfer,
  Typography,
} from "antd";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { AsString } from "../../../utils/AsString";
import { AsNumber } from "../../../utils/AsNumber";
import { useMount } from "ahooks";
import { CheckboxGroupProps } from "antd/lib/checkbox";

interface IProps extends CheckboxGroupProps {
  type?: PondType;
}
export function PondMultiSelect(props: IProps) {
  const pondSearch = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  useMount(() => {
    pondSearch.requestSync({
      pi: 1,
      ps: 999,
      type: props.type,
    });
  });
  return (
    <Checkbox.Group {...props}>
      {pondSearch.data?.list?.map((i) => (
        <Checkbox key={i.id} value={i.id}>
          {i.name}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
