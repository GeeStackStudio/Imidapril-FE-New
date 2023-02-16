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
  CultureRulePeriodApi,
  CultureRulePeriodApiFactory,
  CultureRulePeriodDto,
  CultureRulePeriodSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import BreedSelector from "../Breed/BreedSelector";
import PondGroupSelector from "../PondGroup/PondGroupSelector";
import WorkScheduleTypeRadio from "../WorkSchedule/WorkScheduleTypeRadio";
import CultureRuleSelector from "../CultureRule/CultureRuleSelector";

const CultureRulePeriodForm = (props: {
  item?: CultureRulePeriodDto;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    CultureRulePeriodApi,
    CultureRulePeriodApi.prototype.cultureRulePeriodSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<CultureRulePeriodSaveParams>
        form={form}
        labelCol={{ span: 4 }}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              cultureRulePeriodSaveParams: {
                name: data.name,
                id: data.id,
                cultureRuleId: data.cultureRuleId,
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
        <Form.Item label="养殖阶段名称" name="name">
          <Input placeholder="请输入养殖阶段名称" />
        </Form.Item>
        <Form.Item label="养殖规则" name="cultureRuleId">
          <CultureRuleSelector placeholder="请选择养殖规则" />
        </Form.Item>
        <Form.Item label="养殖阶段备注" name="description">
          <Input placeholder="请输入养殖阶段备注" />
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
export default CultureRulePeriodForm;
