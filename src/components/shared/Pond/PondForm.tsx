import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  message,
  notification,
  Select,
  Switch,
} from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  PondApi,
  PondApiFactory,
  PondDto,
  PondSaveParams,
  PondType,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";

const PondForm = (props: { item?: PondDto; onSuccess?: () => any }) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(PondApi, PondApi.prototype.pondSavePost);
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<PondSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              pondSaveParams: {
                id: data.id,
                name: data.name,
                height: data.height,
                width: data.width,
                length: data.length,
                waterBody: data.waterBody,
                type: data.type,
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
        <Form.Item label="高度" name="height">
          <Input placeholder="请输入水深" />
        </Form.Item>
        <Form.Item label="长度" name="length">
          <Input placeholder="请输入池塘长度" />
        </Form.Item>
        <Form.Item label="宽度" name="width">
          <Input placeholder="请输入池塘宽度" />
        </Form.Item>
        <Form.Item label="水体" name="waterBody" hidden>
          <Input placeholder="请输入水体" />
        </Form.Item>
        <Form.Item label="类型" name="type">
          <Select>
            <Select.Option value={PondType.苗床}>{PondType.苗床}</Select.Option>
            <Select.Option value={PondType.池塘}>{PondType.池塘}</Select.Option>
          </Select>
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
export default PondForm;
