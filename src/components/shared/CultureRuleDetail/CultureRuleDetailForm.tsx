import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Switch,
  Typography,
} from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  CultureRuleDetailApi,
  CultureRuleDetailApiFactory,
  CultureRuleDetailDto,
  CultureRuleDetailSaveParams,
  PeriodUnitType,
  RepeatType,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import WorkScheduleTypeRadio from "../WorkSchedule/WorkScheduleTypeRadio";
import RepeatTypeRadio from "./RepeatTypeRadio";
import CultureRuleSelector from "../CultureRule/CultureRuleSelector";
import PeriodUnitTypeSelector from "./PeriodUnitTypeSelector";
import CultureRulePeriodSelector from "../CultureRulePeriod/CultureRulePeriodSelector";
import { useParams } from "react-router-dom";

const CultureRuleDetailForm = (props: {
  item?: CultureRuleDetailDto;
  onSuccess?: () => any;
  cultureRulePeriodId?: number;
  cultureRuleId?: number;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    CultureRuleDetailApi,
    CultureRuleDetailApi.prototype.cultureRuleDetailSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    } else {
      form.setFieldsValue({
        timeSpanUnit: PeriodUnitType.分钟,
        cultureRuleId: props.cultureRuleId,
        cultureRulePeriodId: props.cultureRulePeriodId,
      });
    }
  }, [props.item, props.cultureRuleId, props.cultureRulePeriodId]);

  return (
    <div>
      <Form<CultureRuleDetailSaveParams>
        form={form}
        labelCol={{ span: 5 }}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              cultureRuleDetailSaveParams: {
                type: data.type,
                isGlobalRule: data.isGlobalRule,
                daysFromStart: data.daysFromStart,
                repeatType: data.repeatType,
                repeatInterval: data.repeatInterval,
                timeSpan: data.timeSpan,
                timeSpanUnit: data.timeSpanUnit,
                isFullDay: data.isFullDay,
                preferTime: data.preferTime,
                preferHour: data.preferHour,
                cultureRulePeriodId: data.cultureRulePeriodId,
                cultureRuleId: data.cultureRuleId,
                id: data.id,
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
        <Form.Item required label="ID" name="id" style={{ display: "none" }}>
          <Input placeholder="ID 无需填写" disabled={true} />
        </Form.Item>
        <Form.Item required label="养殖规则" name="cultureRuleId">
          <CultureRuleSelector disabled={!!props.cultureRuleId} />
        </Form.Item>
        <Form.Item required label="工作类型" name="type">
          <WorkScheduleTypeRadio />
        </Form.Item>
        <Form.Item
          label="是否为全局规则"
          name="isGlobalRule"
          valuePropName="checked"
        >
          <Switch disabled={!!props.cultureRulePeriodId} />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() =>
            !form.getFieldValue("isGlobalRule") && (
              <Form.Item label="请选择养殖阶段" name="cultureRulePeriodId">
                <CultureRulePeriodSelector
                  disabled={!!props.cultureRulePeriodId}
                />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item required label="第几天后开始" name="daysFromStart">
          <InputNumber />
        </Form.Item>
        <Form.Item required label="重复方式" name="repeatType">
          <RepeatTypeRadio />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() =>
            form.getFieldValue("repeatType") !== RepeatType.不重复 && (
              <Form.Item required label="重复间隔" name="repeatInterval">
                <InputNumber
                  style={{ width: 200 }}
                  formatter={(v) => (v ?? 0) + form.getFieldValue("repeatType")}
                />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item
          required
          label="是否是全天任务"
          name="isFullDay"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() =>
            !form.getFieldValue("isFullDay") && (
              <Form.Item required label="开始时分">
                <Input.Group
                  compact
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Item noStyle name="preferHour">
                    <InputNumber
                      min={0}
                      max={24}
                      formatter={(v) =>
                        v ? v.toString().padStart(2, "0") : ""
                      }
                      style={{ width: 50 }}
                    />
                  </Form.Item>
                  <Typography.Text
                    strong
                    style={{ marginLeft: 8, fontSize: 18, marginRight: 8 }}
                  >
                    :
                  </Typography.Text>
                  <Form.Item noStyle name="preferTime">
                    <InputNumber
                      min={0}
                      max={60}
                      formatter={(v) =>
                        v ? v.toString().padStart(2, "0") : ""
                      }
                      style={{ width: 50 }}
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item required label="预计持续时长">
          <Input.Group compact>
            <Form.Item noStyle name="timeSpan">
              <InputNumber />
            </Form.Item>
            <Form.Item noStyle name="timeSpanUnit">
              <PeriodUnitTypeSelector />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="请输入任务备注" name="description">
          <Input.TextArea rows={3} placeholder="请输入任务备注" />
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
export default CultureRuleDetailForm;
