import React, { useMemo } from "react";
import { Card, Divider, Select, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { UserApi } from "../../../scaffold";
import UserAvatar from "../../User/UserAvatar";
import Flex from "../Flex";
import { MaterialCard } from "../MaterialCard/MaterialCard";

export default function UserCardSelector(props: {
  value?: number;
  onChange?: (value?: number) => any;
  theme?: "dark" | "light";
}) {
  const searchHook = useOpenApiFpRequest(
    UserApi,
    UserApi.prototype.userSearchGet
  );
  useMount(() => {
    searchHook.requestSync({ pi: 1, ps: 999 });
  });
  const selectedUser = useMemo(() => {
    if (!props.value) return;
    return searchHook.data?.list?.find((i) => i.id === props.value);
  }, [props.value, searchHook.data]);
  return (
    <Flex direction={"row"} style={{ flexWrap: "wrap" }}>
      {searchHook.data?.list?.map((u) =>
        props.theme === "light" ? (
          <Card
            style={{
              width: 150,
              cursor: "pointer",
              marginRight: 8,
              borderColor:
                props.value === u.id ? "rgb(100,180,189)" : undefined,
              borderWidth: props.value === u.id ? 3 : undefined,
            }}
            onClick={() => {
              props.onChange && props.onChange(u.id);
            }}
            bodyStyle={{ padding: 8 }}
            key={u.id}
          >
            <Flex align={"center"}>
              <UserAvatar user={u} />
              <Typography.Text style={{ marginLeft: 8 }}>
                {u.name}
              </Typography.Text>
            </Flex>
          </Card>
        ) : (
          <MaterialCard
            style={{
              width: 150,
              cursor: "pointer",
              marginRight: 8,
              borderColor:
                props.value === u.id ? "rgb(100,180,189)" : undefined,
              borderWidth: props.value === u.id ? 3 : undefined,
            }}
            onClick={() => {
              props.onChange && props.onChange(u.id);
            }}
            bodyStyle={{ padding: 8 }}
            key={u.id}
          >
            <Flex align={"center"}>
              <UserAvatar user={u} />
              <Typography.Text style={{ marginLeft: 8 }}>
                {u.name}
              </Typography.Text>
            </Flex>
          </MaterialCard>
        )
      )}
    </Flex>
  );
}
