import React, { useEffect } from "react";
import { Button, Form, Input, message, notification, Switch } from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  CultureBatchApi,
  CultureBatchApiFactory,
  CultureBatchConfigurePeriodParams,
  CultureBatchDto,
  CultureBatchSaveParams,
  CultureRuleApi,
  CultureRulePeriodDto,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import CultureRulePeriodSelector from "../CultureRulePeriod/CultureRulePeriodSelector";

const CultureBatchConfigurePeriodForm = (props: {
  onSuccess?: () => any;
  id: number;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchConfigurePeriodPost
  );
  const findHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchFindGet
  );
  const listPeriodHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchListPeriodGet
  );
  const listRulePeriodHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleListPeriodGet
  );
  const currentPeriodHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchCurrentPeriodGet
  );

  async function predicateNextPeriod(): Promise<
    CultureRulePeriodDto | undefined
  > {
    try {
      const batch = await findHook.request({
        id: props.id,
      });
      const batchPeriods = await listPeriodHook.request({
        id: props.id,
      });
      const currentPeriod = await currentPeriodHook.request({
        id: props.id,
      });
      const rulePeriods = await listRulePeriodHook.request({
        id: Number(batch.cultureRuleId),
      });
      if (rulePeriods.length === 0) {
        throw new Error("养殖规则未指定阶段");
      }
      if (batchPeriods.length === 0) {
        return rulePeriods![0];
      }
      const currentIndexInRule = rulePeriods.findIndex(
        (i) => i.id === currentPeriod.cultureRulePeriodId
      );
      if (currentIndexInRule + 1 > rulePeriods.length - 1) {
        throw new Error("您已到达养殖最后一个阶段");
      }
      console.log(currentIndexInRule);
      console.log("下一阶段: " + rulePeriods[currentIndexInRule + 1].name);
      return rulePeriods[currentIndexInRule + 1];
    } catch (e) {
      notification.warning({
        message: "注意",
        description: e.message,
      });
    }
  }

  useEffect(() => {
    if (props.id) {
      predicateNextPeriod().then((r) => {
        form.setFieldsValue({
          id: props.id,
          cultureRulePeriodId: r?.id,
        });
      });
    }
  }, [props.id]);
  return (
    <div>
      <Form<CultureBatchConfigurePeriodParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              cultureBatchConfigurePeriodParams: {
                id: data.id,
                cultureRulePeriodId: data.cultureRulePeriodId,
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
        <Form.Item label="请选择进入的养殖阶段" name="cultureRulePeriodId">
          {findHook.data?.cultureRuleId && (
            <CultureRulePeriodSelector
              cultureRuleId={findHook.data?.cultureRuleId}
            />
          )}
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
export default CultureBatchConfigurePeriodForm;
