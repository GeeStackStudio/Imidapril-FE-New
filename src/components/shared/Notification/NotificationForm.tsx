import React, { useEffect } from "react";
import { Button, Form, Input, message, notification, Switch } from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  NotificationApi,
  NotificationApiFactory,
  NotificationDto,
  NotificationSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";

const NotificationForm = (props: {
  item?: NotificationDto;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    NotificationApi,
    NotificationApi.prototype.notificationSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<NotificationSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              notificationSaveParams: {
                id: data.id,
                title: data.title,
                content: data.content,
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
        <Form.Item label="标题" name="title">
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="通知内容" name="content">
          <Input.TextArea placeholder="请输入通知内容" rows={5} />
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
export default NotificationForm;
