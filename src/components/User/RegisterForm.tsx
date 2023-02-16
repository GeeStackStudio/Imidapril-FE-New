import React, {useEffect} from 'react';
import {Button, Form, Input, message, Radio, Space, Switch} from 'antd';
import {useOpenApiFpRequest} from '../../Http/useOpenApiRequest';
import {Gender, UserApi, UserApiFactory, UserDto, UserSaveParams} from '../../scaffold';
import GenderSelector from './GenderSelector';

const UserRegisterForm = (props: {onSuccess?: (res: UserDto) => any; departmentId?: number; onCancel?: () => any}) => {
  const [form] = Form.useForm();
  const registerHook = useOpenApiFpRequest(UserApi, UserApi.prototype.userSavePost);

  function reset() {
    form.setFieldsValue({
      gender: Gender.男,
    });
  }

  useEffect(() => {
    reset();
  }, [props.departmentId]);

  function onSubmit(data: UserSaveParams) {
    registerHook
      .request({userSaveParams: data})
      .then(res => {
        message.success('操作成功');
        reset();
        props.onSuccess && props.onSuccess(res);
      })
      .catch(e => message.error(e.message));
  }

  return (
    <div>
      <Form<UserSaveParams> form={form} onFinish={onSubmit}>
        <Form.Item label="用户名" name="username" rules={[{required: true, message: '请输入用户名'}]}>
          <Input placeholder="请输入用户名（登录用）" />
        </Form.Item>
        <Form.Item label="登录密码" name="password" rules={[{required: true, message: '请输入登录密码'}]}>
          <Input.Password placeholder="请输入登录密码" />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[{required: true, message: '请输入邮箱'}]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item label="姓名" name="name" rules={[{required: true, message: '请输入姓名'}]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value={Gender.男}>男</Radio>
            <Radio value={Gender.女}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <div className={'text-right m-t-16'}>
          <Space>
            <Button type="primary" htmlType={'submit'} style={{width: 120}}>
              保存
            </Button>
            <Button style={{width: 120}} onClick={props.onCancel}>
              取消
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};
export default UserRegisterForm;
