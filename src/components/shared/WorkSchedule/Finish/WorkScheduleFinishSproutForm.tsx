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
        type: WorkType.η§θ,
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
      type: PondType.θεΊ,
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
            title: "η‘?θ?€",
            content: "ζ¨ζ―ε¦η‘?θ?€θ¦ζδΊ€ζ­€θ‘¨εοΌ",
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
                type: WorkType.η§θ,
              },
            })
            .then(() => {
              notification.success({
                message: "ζδ½ζε",
              });
              props.onSuccess && props.onSuccess();
            })
            .catch((e) => message.error(e.message));
        }}
      >
        <Form.Item label="ID" name="id" style={{ display: "none" }}>
          <Input placeholder="ID ζ ιε‘«ε" disabled={true} />
        </Form.Item>
        <Form.Item label={"ζ―δΈͺθεΊηζ°"}>
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
            {isManual.value ? "ζΉιθ?Ύη½?" : "ε―ΉθεΊεη¬θ?Ύη½?"}
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
                        rules={[{ required: true, message: "ηΌΊε°η§θηζ°" }]}
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
        <Form.Item label="η§θζΆι΄" name="finishTime">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="εΆδ»ε€ζ³¨" name="finishRemark">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType={"submit"}>
            ζδΊ€
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default WorkScheduleFinishSproutForm;
