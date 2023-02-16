import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  message,
  notification,
  Radio,
  Switch,
} from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  UserApi,
  UserApiFactory,
  UserDto,
  UserRole,
  UserSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import UserGroupSelector from "../UserGroup/Selector";

const UserForm = (props: { item?: UserDto; onSuccess?: () => any }) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(UserApi, UserApi.prototype.userSavePost);
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<UserSaveParams>
        labelCol={{ span: 2 }}
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              userSaveParams: {
                id: data.id,
                name: data.name,
                username: data.username,
                password: data.password,
                role: data.role,
                userGroupId: data.userGroupId,
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
        <Form.Item label="用户名" name="username">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item label="用户组" name="userGroupId">
          <UserGroupSelector placeholder="请输入所在用户组" />
        </Form.Item>
        <Form.Item label="角色" name="role">
          <Radio.Group>
            <Radio value={UserRole.管理员}>管理员</Radio>
            <Radio value={UserRole.生产队长}>生产队长</Radio>
            <Radio value={UserRole.养殖人员}>养殖人员</Radio>
          </Radio.Group>
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
export default UserForm;
