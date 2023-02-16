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
  WorkScheduleFinishSewageParam,
} from "../../../../scaffold";
import moment from "moment";
import MaterialSelector from "../../Material/MaterialSelector";

const WorkScheduleFinishSewageForm = (props: {
  workSchedule: WorkScheduleDto;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleFinishSewagePost
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
      <Form<WorkScheduleFinishSewageParam>
        form={form}
        onFinish={async (data) => {
          await ConfirmAsync({
            title: "确认",
            content: "您是否确认要提交此表单？",
            maskClosable: true,
          });
          saveHook
            .request({
              workScheduleFinishSewageParam: {
                id: data.id,
                finishRemark: data.finishRemark,
                finishTime: moment(data.finishTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
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
        <Form.Item label="任务完成时间" name="finishTime">
          <DatePicker showTime />
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
export default WorkScheduleFinishSewageForm;
