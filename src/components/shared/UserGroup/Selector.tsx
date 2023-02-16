import React from "react";
import { Button, Divider, Modal, Select, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { UserGroupApi } from "../../../scaffold";
import { AsString } from "../../../utils/AsString";
import { PlusOutlined } from "@ant-design/icons";
import { useBoolean } from "react-hanger";

interface IProps extends SelectProps<string> {
  allowAdd?: boolean;
}
export default function UserGroupSelector(props: IProps) {
  const searchHook = useOpenApiFpRequest(
    UserGroupApi,
    UserGroupApi.prototype.userGroupSearchGet
  );
  const isAdd = useBoolean(false);
  useMount(() => {
    searchHook.requestSync({
      pi: 1,
      ps: 999,
      sorterOrder: "Asc",
      sorterKey: "name",
    });
  });
  return (
    <>
      <Select
        dropdownRender={(menu) => {
          return (
            <>
              {menu}
              {props.allowAdd && (
                <>
                  <Divider style={{ margin: "8px 0" }} />
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      isAdd.setTrue();
                    }}
                  >
                    添加
                  </Button>
                </>
              )}
            </>
          );
        }}
        {...props}
        showSearch={true}
        filterOption={(word, option) => option?.title.includes(word)}
      >
        {searchHook?.data?.list?.map((i) => (
          <Select.Option key={i.id} value={i.id!} title={`${i.name}`}>
            {i.name}
            {/*<Divider type="vertical" />*/}
            {/*<Typography.Text type="secondary">{i.userGroupGroupToUserGroup?.userGroupGroup?.name}</Typography.Text>*/}
            {/*<Divider type="vertical" />*/}
            {/*<Typography.Text type="secondary">{i.userGroupGroupToUserGroup?.userGroupGroup?.workShopToUserGroupGroup?.workShop?.name}</Typography.Text>*/}
            <Divider type="vertical" />
            <Typography.Text type="secondary">{i.name}</Typography.Text>
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
