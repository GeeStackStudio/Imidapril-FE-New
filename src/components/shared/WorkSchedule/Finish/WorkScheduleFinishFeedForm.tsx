import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Select,
  Switch,
} from "antd";
import WorkScheduleTypeRadio from "../WorkScheduleTypeRadio";
import { useOpenApiFpRequest } from "../../../../Http/useOpenApiRequest";
import { ConfirmAsync } from "../../../../utils/ConfirmAsync";
import {
  PeriodUnitType,
  WorkScheduleApi,
  WorkScheduleDto,
  WorkScheduleFinishFeedParam,
} from "../../../../scaffold";
import moment from "moment";
import MaterialSelector from "../../Material/MaterialSelector";

const WorkScheduleFinishFeedForm = (props: {
  workSchedule: WorkScheduleDto;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleFinishFeedPost
  );
  useEffect(() => {
    if (props.workSchedule) {
      console.log(props.workSchedule);
      form.setFieldsValue({
        id: props.workSchedule.id,
        ...props.workSchedule.finishParameter,
        finishTime: moment(props.workSchedule.finishParameter.finishTime),
      });
    }
  }, [props.workSchedule]);

  return (
    <div>
      <Form<WorkScheduleFinishFeedParam>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              workScheduleFinishFeedParam: {
                dosage: data.dosage,
                pondId: data.pondId,
                materialId: data.materialId,
                dosageUnit: data.dosageUnit,
                finishRemark: data.finishRemark,
                finishTime: moment(data.finishTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
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
        <Form.Item label="使用饲料" name="materialId">
          <MaterialSelector />
        </Form.Item>
        <Form.Item label="任务完成时间" name="finishTime">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="饲料用量">
          <Input.Group compact>
            <Form.Item name={["dosage"]} noStyle initialValue={0}>
              <InputNumber />
            </Form.Item>
            <Form.Item name={["dosageUnit"]} noStyle initialValue={"g"}>
              <Select>
                <Select.Option value="ml">ml</Select.Option>
                <Select.Option value="l">l</Select.Option>
                <Select.Option value="g">g</Select.Option>
                <Select.Option value="kg">kg</Select.Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="备注" name="finishRemark">
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
export default WorkScheduleFinishFeedForm;
