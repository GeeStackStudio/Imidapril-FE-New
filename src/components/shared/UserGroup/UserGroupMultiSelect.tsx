import React, { useMemo } from "react";
import { UserGroupApi, UserGroupDto } from "../../../scaffold";
import Flex from "../Flex";
import { Checkbox } from "antd";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { CheckboxGroupProps } from "antd/lib/checkbox";

type IProps = CheckboxGroupProps;
export function UserGroupMultiSelect(props: IProps) {
  const userGroupSearch = useOpenApiFpRequest(
    UserGroupApi,
    UserGroupApi.prototype.userGroupSearchGet
  );
  useMount(() => {
    userGroupSearch.requestSync({
      pi: 1,
      ps: 999,
    });
  });
  return (
    <Checkbox.Group {...props}>
      {userGroupSearch.data?.list?.map((i) => (
        <Checkbox key={i.id} value={i.id}>
          {i.name}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
