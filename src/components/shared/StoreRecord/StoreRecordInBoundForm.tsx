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
import UserCardSelector from "../User/UserCardSelector";

const StoreRecordInBoundForm = (props: {
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
    } else {
      form.setFieldsValue({
        type: StoreRecordType.入库,
      });
    }
  }, [props.item]);

  return (
    <div>
      <Form<StoreRecordSaveParams>
        form={form}
        labelCol={{
          span: 3,
        }}
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
                unitPrice: data.unitPrice,
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
        <Form.Item label="采购物料种类" name="materialId">
          <MaterialSelector placeholder={"请选择物料种类"} />
        </Form.Item>
        <Form.Item label="出库/入库" name="type" style={{ display: "none" }}>
          <StoreRecordTypeRadio />
        </Form.Item>
        <Form.Item label="采购数量" name="count" initialValue={0}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() =>
            form.getFieldValue("type") === StoreRecordType.入库 && (
              <Form.Item label="采购来源" name="companyName">
                <Input placeholder="请输入采购来源" />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() =>
            form.getFieldValue("type") === StoreRecordType.入库 && (
              <Form.Item label="单价" name="unitPrice">
                <Input placeholder="请输入采购单价" />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item label="操作员" name="operatorId">
          <UserCardSelector />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea rows={3} placeholder={"请输入备注"} />
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
export default StoreRecordInBoundForm;
