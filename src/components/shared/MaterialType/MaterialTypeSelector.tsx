import React from "react";
import { Button, Divider, Modal, Select } from "antd";
import { SelectProps } from "antd/lib/select";
import useOpenApi from "../../../Http/useOpenApi";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { MaterialTypeApi } from "../../../scaffold";
import { PlusOutlined } from "@ant-design/icons";
import { useBoolean } from "react-hanger";
import MaterialForm from "../Material/MaterialForm";
import MaterialTypeForm from "./MaterialTypeForm";
interface IProps extends SelectProps<string> {
  allowAdd?: boolean;
  onSuccess?: () => void;
}
export default function MaterialTypeTypeSelector(props: IProps) {
  const searchHook = useOpenApiFpRequest(
    MaterialTypeApi,
    MaterialTypeApi.prototype.materialTypeSearchGet
  );
  const isAdd = useBoolean(false);
  function refresh() {
    searchHook.requestSync({ pi: 1, ps: 999 });
  }
  useMount(() => {
    refresh();
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
          <Select.Option
            key={i.id}
            value={i.id!}
            title={`${i.name}|${i.description}`}
          >
            {i.name}
            <Divider type="vertical" />
            {i.description}
          </Select.Option>
        ))}
      </Select>
      <Modal
        open={isAdd.value}
        onCancel={isAdd.setFalse}
        footer={null}
        title={"新建生产资料种类"}
      >
        <MaterialTypeForm
          onSuccess={() => {
            isAdd.setFalse();
            refresh();
            props.onSuccess && props.onSuccess();
          }}
        />
      </Modal>
    </>
  );
}
