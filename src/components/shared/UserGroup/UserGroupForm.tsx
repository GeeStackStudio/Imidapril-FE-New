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
  UserGroupApi,
  UserGroupApiFactory,
  UserGroupDto,
  UserGroupSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";

const UserGroupForm = (props: {
  item?: UserGroupDto;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    UserGroupApi,
    UserGroupApi.prototype.userGroupSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<UserGroupSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              userGroupSaveParams: {
                id: data.id,
                name: data.name,
                indexPath: data.indexPath,
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
        <Form.Item label="首页地址" name="indexPath">
          <Input placeholder="请输入水深" />
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
export default UserGroupForm;
