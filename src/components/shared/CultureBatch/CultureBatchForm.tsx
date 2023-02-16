import React, { CSSProperties, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
  Switch,
} from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  CultureBatchApi,
  CultureBatchApiFactory,
  CultureBatchDto,
  CultureBatchSaveParams,
  CultureBatchType,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import BreedSelector from "../Breed/BreedSelector";
import CultureBatchRadio from "./CultureBatchRadio";
import PondGroupSelector from "../PondGroup/PondGroupSelector";
import CultureRuleSelector from "../CultureRule/CultureRuleSelector";
import { PondTransferSelect } from "../Pond/PondTransferSelect";

const CultureBatchForm = (props: {
  item?: CultureBatchDto;
  type?: CultureBatchType;
  onSuccess?: (data?: CultureBatchDto | undefined) => any;
  style?: CSSProperties;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
    if (props.type) {
      form.setFieldsValue({
        type: props.type,
      });
    }
  }, [props.item, props.type]);

  return (
    <div style={props.style}>
      <Form<CultureBatchSaveParams>
        form={form}
        layout={"vertical"}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              cultureBatchSaveParams: {
                id: data.id,
                type: data.type,
                timePeriod: data.timePeriod,
                breedId: data.breedId,
                cultureRuleId: data.cultureRuleId,
                pondIdList: data.pondIdList,
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
        <Form.Item required label="ID" name="id" style={{ display: "none" }}>
          <Input
            style={{ maxWidth: 400 }}
            placeholder="ID 无需填写"
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          required
          label="养殖类型"
          name="type"
          style={{ display: props.type ? "none" : "inherit" }}
        >
          <CultureBatchRadio style={{ maxWidth: 400 }} />
        </Form.Item>
        <Form.Item
          required
          label="养殖编号"
          name="code"
          style={{ display: props.type ? "none" : "inherit" }}
        >
          <Input placeholder={"请输入养殖编号"} style={{ maxWidth: 400 }} />
        </Form.Item>
        <Form.Item required label="选择养殖品种" name="breedId">
          <BreedSelector style={{ maxWidth: 400 }} placeholder="选择养殖品种" />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Form.Item required label="选择养殖模型" name="cultureRuleId">
              <CultureRuleSelector
                breedId={form.getFieldValue("breedId")}
                style={{ maxWidth: 400 }}
                placeholder={"请选择养殖模型"}
              />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item required label="选择养殖池塘" name="pondIdList">
          <PondTransferSelect leftTitle="所有池塘" rightTitle="已选择池塘" />
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
export default CultureBatchForm;
