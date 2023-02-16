import React, { useEffect } from "react";
import { Button, Form, Input, message, notification, Switch } from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  AlertApi,
  AlertApiFactory,
  AlertDto,
  AlertSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";

const AlertForm = (props: { item?: AlertDto; onSuccess?: () => any }) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    AlertApi,
    AlertApi.prototype.alertSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<AlertSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              alertSaveParams: {
                id: data.id,
                title: data.title,
                description: data.description,
                level: data.level,
                solution: data.solution,
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
        <Form.Item label="警报标题" name="title">
          <Input placeholder="请输入警报标题" />
        </Form.Item>
        <Form.Item label="警报级别" name="level">
          {/*<AlertLevelRadio />*/}
        </Form.Item>
        <Form.Item label="警报描述" name="description">
          <Input placeholder="警报描述" />
        </Form.Item>
        <Form.Item label="解决方法" name="solution">
          <Input placeholder="解决方法" />
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
export default AlertForm;
