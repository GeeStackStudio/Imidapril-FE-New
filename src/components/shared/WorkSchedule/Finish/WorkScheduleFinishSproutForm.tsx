import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Select,
  Space,
  Switch,
} from "antd";
import WorkScheduleTypeRadio from "../WorkScheduleTypeRadio";
import { useOpenApiFpRequest } from "../../../../Http/useOpenApiRequest";
import { ConfirmAsync } from "../../../../utils/ConfirmAsync";
import {
  PeriodUnitType,
  PondApi,
  PondType,
  WorkScheduleApi,
  WorkScheduleDto,
  WorkScheduleFinishSproutParam,
  WorkScheduleFinishSproutParamItem,
  WorkType,
} from "../../../../scaffold";
import moment from "moment";
import MaterialSelector from "../../Material/MaterialSelector";
import { PlusOutlined } from "@ant-design/icons";
import { useMount } from "ahooks";
import { useBoolean } from "react-hanger";

const WorkScheduleFinishSproutForm = (props: {
  item?: WorkScheduleDto;
  cultureBatchId: number;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleFinishSproutPost
  );
  const pondSearchHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  const [unitCount, setUnitCount] = useState<number>();
  const isManual = useBoolean(false);
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue({
        id: props.item.id,
        ...props.item.finishParameter,
        list: pondSearchHook.data?.list?.map((i) => {
          return {
            pondId: i.id,
            count: 0,
          };
        }),
        type: WorkType.种苗,
        finishTime: moment(props.item.finishParameter.finishTime),
      });
    } else {
      form.setFieldsValue({
        list: pondSearchHook.data?.list?.map((i) => {
          return {
            pondId: i.id,
            count: 0,
          };
        }),
      });
    }
  }, [props.item, pondSearchHook.data]);
  useMount(() => {
    pondSearchHook.requestSync({
      pi: 1,
      ps: 999,
      type: PondType.苗床,
      sorterOrder: "Asc",
      sorterKey: "name",
    });
  });

  function getPondName(key: number) {
    const list = form.getFieldValue(
      "list"
    ) as WorkScheduleFinishSproutParamItem[];
    const pondId = list[key].pondId;
    return pondSearchHook.data?.list?.find((i) => i.id === pondId)?.name;
  }

  return (
    <div>
      <Form<WorkScheduleFinishSproutParam>
        form={form}
        layout="vertical"
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              workScheduleFinishSproutParam: {
                id: data.id,
                finishRemark: data.finishRemark,
                finishTime: moment(data.finishTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
                list: data.list,
                cultureBatchId: props.cultureBatchId,
                type: WorkType.种苗,
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
        <Form.Item label={"每个苗床盆数"}>
          <InputNumber
            value={unitCount}
            min={0}
            onChange={(v) => {
              v && setUnitCount(v);
              const list = pondSearchHook.data?.list?.map((i) => {
                return {
                  pondId: i.id,
                  count: v,
                };
              });
              form.setFieldsValue({
                list,
              });
            }}
          />
          <Button type={"link"} onClick={() => isManual.toggle()}>
            {isManual.value ? "批量设置" : "对苗床单独设置"}
          </Button>
        </Form.Item>

        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key}>
                  <Form.Item noStyle shouldUpdate hidden={!isManual.value}>
                    {() => (
                      <Form.Item
                        {...field}
                        label={`${getPondName(field.key)}`}
                        name={[field.name, "count"]}
                        rules={[{ required: true, message: "缺少种苗盆数" }]}
                      >
                        <InputNumber min={0} />
                      </Form.Item>
                    )}
                  </Form.Item>
                </Space>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item label="种苗时间" name="finishTime">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="其他备注" name="finishRemark">
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
export default WorkScheduleFinishSproutForm;
