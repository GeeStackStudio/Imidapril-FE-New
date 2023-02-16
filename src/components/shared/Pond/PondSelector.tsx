import React from "react";
import { Button, Divider, Modal, Select, Typography } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { PondApi, PondType } from "../../../scaffold";
import { AsString } from "../../../utils/AsString";
import { PlusOutlined } from "@ant-design/icons";
import { useBoolean } from "react-hanger";

interface IProps extends SelectProps<string> {
  type?: PondType;
  allowAdd?: boolean;
}
export default function PondSelector(props: IProps) {
  const searchHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  const isAdd = useBoolean(false);
  useMount(() => {
    searchHook.requestSync({
      pi: 1,
      ps: 999,
      type: props.type,
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
            {/*<Typography.Text type="secondary">{i.pondGroupToPond?.pondGroup?.name}</Typography.Text>*/}
            {/*<Divider type="vertical" />*/}
            {/*<Typography.Text type="secondary">{i.pondGroupToPond?.pondGroup?.workShopToPondGroup?.workShop?.name}</Typography.Text>*/}
            {/*<Divider type="vertical" />*/}
            {/*<Typography.Text type="secondary">{i.type}</Typography.Text>*/}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
