import React, { useEffect } from "react";
import { Button, Form, Input, message, notification, Switch } from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  CultureRuleApi,
  CultureRuleApiFactory,
  CultureRuleDto,
  CultureRuleSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import BreedSelector from "../Breed/BreedSelector";
import PondGroupSelector from "../PondGroup/PondGroupSelector";

const CultureRuleForm = (props: {
  item?: CultureRuleDto;
  onSuccess?: (row?: CultureRuleDto) => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<CultureRuleSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              cultureRuleSaveParams: {
                id: data.id,
                name: data.name,
                breedId: data.breedId,
                description: data.description,
                remark: data.remark,
              },
            })
            .then((r) => {
              notification.success({
                message: "操作成功",
              });
              props.onSuccess && props.onSuccess(r);
            })
            .catch((e) => message.error(e.message));
        }}
      >
        <Form.Item label="ID" name="id" style={{ display: "none" }}>
          <Input placeholder="ID 无需填写" disabled={true} />
        </Form.Item>
        <Form.Item label="名称" name="name">
          <Input placeholder="请输入养殖计划名称" />
        </Form.Item>
        <Form.Item label="简介" name="description">
          <Input placeholder="请输入养殖计划简介" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input placeholder="请输入养殖计划备注" />
        </Form.Item>
        <Form.Item label="选择养殖品种" name="breedId">
          <BreedSelector />
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
export default CultureRuleForm;
