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
  StoreRecordApi,
  StoreRecordApiFactory,
  StoreRecordDto,
  StoreRecordSaveParams,
  StoreRecordType,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import StoreRecordTypeRadio from "./StoreRecordTypeRadio";
import MaterialSelector from "../Material/MaterialSelector";
import UserSelector from "../User/UserSelector";

const StoreRecordForm = (props: {
  item?: StoreRecordDto;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    StoreRecordApi,
    StoreRecordApi.prototype.storeRecordSavePost
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

  return (
    <div>
      <Form<StoreRecordSaveParams>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              storeRecordSaveParams: {
                id: data.id,
                remark: data.remark,
                materialId: data.materialId,
                type: data.type,
                companyName: data.companyName,
                count: data.count,
                operatorId: data.operatorId,
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
        <Form.Item label="物料种类" name="materialId">
          <MaterialSelector />
        </Form.Item>
        <Form.Item label="出库/入库" name="type">
          <StoreRecordTypeRadio />
        </Form.Item>
        <Form.Item label="出库/入库数量" name="count">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() =>
            form.getFieldValue("type") === StoreRecordType.入库 && (
              <Form.Item label="采购单位" name="companyName">
                <Input placeholder="请输入采购单位" />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item label="操作员" name="operatorId">
          <UserSelector />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea rows={3} />
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
export default StoreRecordForm;
