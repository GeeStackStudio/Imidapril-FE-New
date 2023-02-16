import React, { useEffect } from "react";
import { Button, Form, Input, message, notification, Switch } from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  MaterialTypeApi,
  MaterialTypeApiFactory,
  MaterialTypeDto,
  MaterialTypeSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";

const MaterialTypeTypeForm = (props: {
  item?: MaterialTypeDto;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    MaterialTypeApi,
    MaterialTypeApi.prototype.materialTypeSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<MaterialTypeSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              materialTypeSaveParams: {
                id: data.id,
                name: data.name,
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
export default MaterialTypeTypeForm;
