import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Switch,
} from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  DiseaseRuleApi,
  DiseaseRuleApiFactory,
  DiseaseRuleDto,
  DiseaseRuleSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import CultureRuleSelector from "../CultureRule/CultureRuleSelector";

const DiseaseRuleForm = (props: {
  item?: DiseaseRuleDto;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    DiseaseRuleApi,
    DiseaseRuleApi.prototype.diseaseRuleSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<DiseaseRuleSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              diseaseRuleSaveParams: {
                cultureRuleId: data.cultureRuleId,
                id: data.id,
                name: data.name,
                description: data.description,
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
        <Form.Item label="养殖规则" name="cultureRuleId">
          <CultureRuleSelector placeholder="请选择养殖规则" />
        </Form.Item>
        <Form.Item label="病害名称" name="name">
          <Input placeholder="请输入病害名称" />
        </Form.Item>
        <Form.Item label="病害简介" name="description">
          <Input.TextArea rows={10} placeholder="请输入病害简介" />
        </Form.Item>
        <Form.Item label="病害解决方案" name="solution">
          <Input.TextArea rows={10} placeholder="请输入病害解决方案" />
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
export default DiseaseRuleForm;
