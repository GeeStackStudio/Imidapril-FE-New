import React, { useEffect } from "react";
import { Divider, Typography, Select, Space, Button, Modal } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { BreedApi, BreedType } from "../../../scaffold";
import { PlusOutlined } from "@ant-design/icons";
import { useBoolean } from "react-hanger";
import BreedForm from "./BreedForm";

export interface IProps extends SelectProps<string> {
  type?: BreedType;
  allowAdd?: boolean;
}

export default function BreedSelector(props: IProps) {
  const searchHook = useOpenApiFpRequest(
    BreedApi,
    BreedApi.prototype.breedSearchGet
  );
  const isAdd = useBoolean(false);

  function refresh() {
    searchHook.requestSync({ pi: 1, ps: 999, type: props.type });
  }

  useEffect(() => {
    refresh();
  }, [props.allowAdd, props.type]);
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
        style={{ minWidth: 300 }}
        {...props}
        showSearch={true}
        filterOption={(word, option) => option?.title.includes(word)}
      >
        {searchHook?.data?.list?.map((i) => (
          <Select.Option
            key={i.id}
            value={i.id!}
            title={`${i.name}|${i.description}`}
          >
            {i.name}
            <Divider type="vertical" />
            <Typography.Text ellipsis={true} style={{ width: 200 }}>
              {i.description}
            </Typography.Text>
          </Select.Option>
        ))}
      </Select>
      <Modal
        title={"添加品种"}
        footer={null}
        open={isAdd.value}
        onCancel={() => {
          isAdd.setFalse();
          refresh();
        }}
      >
        <BreedForm
          onSuccess={() => {
            isAdd.setFalse();
            refresh();
          }}
        />
      </Modal>
    </>
  );
}
