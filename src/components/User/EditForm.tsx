import React, {useEffect} from 'react';
import {Button, Form, Input, message, Radio, Space, Switch} from 'antd';
import {useOpenApiFpRequest} from '../../Http/useOpenApiRequest';
import {Gender, UserApi, UserApiFactory, UserDto, UserSaveParams} from '../../scaffold';

const UserEditForm = (props: {onSuccess?: (res: UserDto) => any; user: UserDto; onCancel?: () => any}) => {
  const [form] = Form.useForm();
  const updateHook = useOpenApiFpRequest(UserApi, UserApi.prototype.userSavePost);

  function reset() {
    form.setFieldsValue({
      ...props.user,
    });
  }

  useEffect(() => {
    reset();
  }, [props.user]);

  function onSubmit(data: UserSaveParams) {
    updateHook
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
        <Form.Item label="ID" name="id" rules={[{required: true}]}>
          <Input placeholder="请输入 ID" disabled />
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
        <Form.Item label="是否启用" name="able">
          <Radio.Group>
            <Radio value={true}>启用</Radio>
            <Radio value={false}>冻结</Radio>
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
export default UserEditForm;
