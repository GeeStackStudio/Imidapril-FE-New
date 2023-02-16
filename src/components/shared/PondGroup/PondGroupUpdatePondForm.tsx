import React, { useEffect, useMemo } from "react";
import {
  Button,
  Descriptions,
  Divider,
  Form,
  message,
  notification,
  Transfer,
  Typography,
} from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  PondApi,
  PondDto,
  PondGroupApi,
  PondGroupDto,
  PondGroupToPondDto,
  PondGroupUpdatePondParams,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { useMount } from "ahooks";
import { useArray } from "react-hanger";
import Flex from "../Flex";
import { PondTransferSelect } from "../Pond/PondTransferSelect";

const PondGroupUpdatePondForm = (props: {
  pondGroup: PondGroupDto;
  value: PondGroupToPondDto[];
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const pondSearch = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  const pondGroupToPondList = useArray<PondGroupToPondDto>([]);
  useMount(() => {
    pondSearch.requestSync({
      pi: 1,
      ps: 999,
    });
  });
  const saveHook = useOpenApiFpRequest(
    PondGroupApi,
    PondGroupApi.prototype.pondGroupUpdatePondPost
  );
  useEffect(() => {
    if (props.pondGroup) {
      pondGroupToPondList.setValue(props.value);
      form.setFieldsValue({
        pondIdList: props.value.map((i) => String(i.pondId)),
      });
    }
  }, [props.pondGroup, props.value]);

  return (
    <div>
      <Descriptions title="产线信息">
        <Descriptions.Item label="产线名称">
          {props.pondGroup?.name}
        </Descriptions.Item>
      </Descriptions>
      <Form<PondGroupUpdatePondParams>
        form={form}
        onFinish={async (data) => {
          console.log(data);
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              pondGroupUpdatePondParams: {
                id: Number(props.pondGroup.id),
                pondIdList: data.pondIdList,
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
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Form.Item label="包含池塘" name="pondIdList">
              <PondTransferSelect
                disableWhen={(i) =>
                  !!i.pondGroupToPond &&
                  i.pondGroupToPond.pondGroupId != props.pondGroup.id
                }
              />
            </Form.Item>
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
export default PondGroupUpdatePondForm;
