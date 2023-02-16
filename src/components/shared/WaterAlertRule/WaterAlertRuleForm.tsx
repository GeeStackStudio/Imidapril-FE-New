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
  WaterAlertRuleApi,
  WaterAlertRuleApiFactory,
  WaterAlertRuleDto,
  WaterAlertRuleSaveParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import CultureRuleSelector from "../CultureRule/CultureRuleSelector";
import WaterQualityTypeRadio from "./WaterQualityTypeRadio";
import AlertLevelRadio from "./AlertLevelRadio";

const WaterAlertRuleForm = (props: {
  item?: WaterAlertRuleDto;
  onSuccess?: () => any;
  cultureRuleId?: number;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    WaterAlertRuleApi,
    WaterAlertRuleApi.prototype.waterAlertRuleSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<WaterAlertRuleSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              waterAlertRuleSaveParams: {
                cultureRuleId: props.cultureRuleId ?? data.cultureRuleId,
                ceiling: data.ceiling,
                floor: data.floor,
                type: data.type,
                level: data.level,
                id: data.id,
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
        <Form.Item
          label="养殖规则"
          name="cultureRuleId"
          hidden={!!props.cultureRuleId}
        >
          <CultureRuleSelector placeholder="请选择养殖规则" />
        </Form.Item>
        <Form.Item label="水质数据" name="type">
          <WaterQualityTypeRadio />
        </Form.Item>
        <Form.Item label="预警级别" name="level">
          <AlertLevelRadio />
        </Form.Item>
        <Form.Item label="上限" name="ceiling">
          <InputNumber />
        </Form.Item>
        <Form.Item label="下限" name="floor">
          <InputNumber />
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
export default WaterAlertRuleForm;
