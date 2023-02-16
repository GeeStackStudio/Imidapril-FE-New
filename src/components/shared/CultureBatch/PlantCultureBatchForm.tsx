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
  BreedType,
  CultureBatchApi,
  CultureBatchApiFactory,
  CultureBatchDto,
  CultureBatchSaveParams,
  CultureBatchType,
  PondType,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import BreedSelector from "../Breed/BreedSelector";
import CultureBatchRadio from "./CultureBatchRadio";
import PondGroupSelector from "../PondGroup/PondGroupSelector";
import CultureRuleSelector from "../CultureRule/CultureRuleSelector";
import { PondTransferSelect } from "../Pond/PondTransferSelect";
import { PondMultiSelect } from "../Pond/PondMultiSelect";

const PlantCultureBatchForm = (props: {
  item?: CultureBatchDto;
  onSuccess?: (data?: CultureBatchDto | undefined) => any;
  style?: CSSProperties;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchSavePost
  );
  useEffect(() => {
    form.setFieldsValue({
      type: CultureBatchType.温室培育,
    });
    if (props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.item]);

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
        <Form.Item required label="ID" name="id" hidden={true}>
          <Input
            style={{ maxWidth: 400 }}
            placeholder="ID 无需填写"
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          required
          label="生产类型"
          name="type"
          hidden={true}
          initialValue={CultureBatchType.温室培育}
        >
          <Input style={{ maxWidth: 400 }} placeholder="生产类型无需填写" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item required label="生产批次号" name="code">
              <Input
                placeholder={"请输入生产批次号"}
                style={{ maxWidth: 400 }}
              />
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {() => (
                <Form.Item required label="选择生产模型" name="cultureRuleId">
                  <CultureRuleSelector
                    breedId={form.getFieldValue("breedId")}
                    style={{ maxWidth: 400 }}
                    placeholder={"请选择生产模型"}
                  />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item required label="选择生产品种" name="breedId">
              <BreedSelector
                allowAdd={true}
                type={BreedType.植物}
                style={{ maxWidth: 400 }}
                placeholder="选择生产品种"
              />
            </Form.Item>
            <Form.Item required label="选择生产苗床" name="pondIdList">
              <PondMultiSelect type={PondType.苗床} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType={"submit"}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default PlantCultureBatchForm;
