import React, { useEffect } from "react";
import { Button, Form, Input, message, notification, Switch } from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  MaterialApi,
  MaterialApiFactory,
  MaterialDto,
  MaterialSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import MaterialTypeTypeSelector from "../MaterialType/MaterialTypeSelector";

const MaterialForm = (props: { item?: MaterialDto; onSuccess?: () => any }) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    MaterialApi,
    MaterialApi.prototype.materialSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<MaterialSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              materialSaveParams: {
                id: data.id,
                name: data.name,
                typeId: data.typeId,
                description: data.description,
              },
            })
            .then(() => {
              notification.success({
                message: "操作成功",
              });
              props.onSuccess && props.onSuccess();
            })
            .catch((e) => message.error(e.message));
        }}
      >
        <Form.Item label="ID" name="id" style={{ display: "none" }}>
          <Input placeholder="ID 无需填写" disabled={true} />
        </Form.Item>
        <Form.Item label="名称" name="name">
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item label="分类" name="typeId">
          <MaterialTypeTypeSelector allowAdd />
        </Form.Item>
        <Form.Item label="简介" name="description">
          <Input placeholder="请输入简介" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType={"submit"}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default MaterialForm;
