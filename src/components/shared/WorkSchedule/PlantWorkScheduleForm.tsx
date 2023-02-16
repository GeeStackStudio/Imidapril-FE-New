import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  message,
  notification,
  Input,
  Switch,
  Space,
} from "antd";
import { ConfirmAsync } from "../../../utils/ConfirmAsync";
import {
  WorkScheduleApi,
  WorkScheduleDto,
  WorkScheduleSaveParams,
  WorkType,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import WorkScheduleTypeRadio from "./WorkScheduleTypeRadio";
import CultureBatchSelector from "../CultureBatch/CultureBatchSelector";
import PondSelector from "../Pond/PondSelector";
import moment from "moment";
import UserCardSelector from "../User/UserCardSelector";
import WorkScheduleTypeSelector from "./WorkScheduleTypeSelector";
import Flex from "../Flex";

const PlantWorkScheduleForm = (props: {
  item?: WorkScheduleDto;
  type?: WorkType;
  onSuccess?: () => any;
}) => {
  const [form] = Form.useForm();
  const saveHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleSavePost
  );
  const findHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleFindGet
  );
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue({
        ...props.item,
        scheduleTime: moment(props.item.scheduleTime),
      });
    }
    if (props.type) {
      form.setFieldsValue({
        type: props.type,
      });
    }
  }, [props.item, props.type]);
  useEffect(() => {
    if (props.item?.id) {
      findHook.requestSync({
        id: props.item.id,
      });
    }
  }, [props.item]);

  return (
    <div>
      <Form<WorkScheduleSaveParams>
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
              workScheduleSaveParams: {
                ...data,
                scheduleTime: moment(data.scheduleTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
                name: data.type,
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
        <Form.Item
          label="任务类型"
          required
          name="type"
          style={{ display: props.type ? "none" : "inherit" }}
        >
          <WorkScheduleTypeSelector
            placeholder={"请选择任务的类型"}
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Form.Item
              label="是否是全天任务"
              name="isFullDay"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="全天任务"
                unCheckedChildren="非全天任务"
              />
            </Form.Item>
          )}
        </Form.Item>

        <Space direction={"horizontal"}>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Form.Item label="计划时间" required name="scheduleTime">
                {form.getFieldValue("isFullDay") ? (
                  <DatePicker style={{ width: 200 }} />
                ) : (
                  <DatePicker showTime style={{ width: 200 }} />
                )}
              </Form.Item>
            )}
          </Form.Item>

          <Form.Item shouldUpdate noStyle>
            {() =>
              (!form.getFieldValue("pondGroupId") ||
                form.getFieldValue("type") === WorkType.放苗) && (
                <Form.Item label="池塘" name="pondId">
                  <PondSelector
                    placeholder="选择池塘(可选)"
                    style={{ width: 200 }}
                    allowClear={true}
                  />
                </Form.Item>
              )
            }
          </Form.Item>
          <Form.Item label="生产批次" name="cultureBatchId">
            <CultureBatchSelector placeholder="请选择生产批次" allowClear />
          </Form.Item>
        </Space>
        <Form.Item label="养殖员工" name="workerId">
          <UserCardSelector />
        </Form.Item>
        <Form.Item label="任务备注" name="description">
          <Input.TextArea
            showCount={true}
            placeholder="请输入任务备注,如:任务要求, 任务提醒等"
          />
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
export default PlantWorkScheduleForm;
