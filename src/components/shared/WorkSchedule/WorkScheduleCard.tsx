import React, { CSSProperties } from "react";
import Flex from "../Flex";
import { Button, Card, Descriptions, Tag, Typography } from "antd";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { WorkScheduleDto, WorkScheduleStatus } from "../../../scaffold";

export function WorkScheduleCard(props: {
  workSchedule: WorkScheduleDto;
  onClickEdit?: () => any;
  onClickFinish?: () => any;
  style?: CSSProperties;
}) {
  let color;
  if (props.workSchedule.status === WorkScheduleStatus.已安排) {
    color = "#08979c";
  }
  if (props.workSchedule.status === WorkScheduleStatus.进行中) {
    color = "#1890ff";
  }
  if (props.workSchedule.status === WorkScheduleStatus.已完成) {
    color = "#389e0d";
  }
  return (
    <Card key={props.workSchedule.id} style={props.style}>
      <Flex justify="space-between">
        <Flex align={"center"}>
          <Typography.Text strong style={{ fontSize: 16 }}>
            {props.workSchedule.name}
          </Typography.Text>
          <Tag color={"#2196F3"} style={{ marginLeft: 8, fontSize: 8 }}>
            {props.workSchedule.type}
          </Tag>
          {props.workSchedule.isFullDay && (
            <Tag color={"#974314"} style={{ marginLeft: 2, fontSize: 8 }}>
              全天任务
            </Tag>
          )}
          <Tag color={color} style={{ marginLeft: 2, fontSize: 8 }}>
            {props.workSchedule.status}
          </Tag>
          {props.onClickEdit && (
            <EditOutlined
              style={{ marginLeft: 2, color: "#2196F3", cursor: "pointer" }}
              onClick={props.onClickEdit}
            />
          )}
        </Flex>
        {props.onClickFinish &&
          props.workSchedule.status &&
          [WorkScheduleStatus.已安排, WorkScheduleStatus.进行中].includes(
            props.workSchedule.status as any
          ) && (
            <Button
              type="primary"
              shape={"round"}
              onClick={props.onClickFinish}
            >
              完成任务
            </Button>
          )}
        {props.workSchedule.status === WorkScheduleStatus.已完成 && (
          <Button
            type="primary"
            shape="round"
            style={{ background: "#52c41a", border: "none" }}
            icon={<CheckOutlined />}
            onClick={props.onClickFinish}
          >
            已完成
          </Button>
        )}
      </Flex>

      <Typography.Text type={"secondary"}>
        {props.workSchedule.description}
      </Typography.Text>
      <Descriptions size={"small"} column={1} style={{ marginTop: 16 }}>
        <Descriptions.Item label="分配养殖人员">
          {props.workSchedule.worker?.name}
        </Descriptions.Item>
        <Descriptions.Item label="预计时间">
          {props.workSchedule.isFullDay
            ? moment(props.workSchedule.scheduleTime).format("YYYY-MM-DD")
            : props.workSchedule.scheduleTime}
        </Descriptions.Item>
        <Descriptions.Item label="预计时长">
          {props.workSchedule.period !== 0 &&
            !props.workSchedule.period &&
            "未指定预计时长"}
          {(props.workSchedule.period === 0 || props.workSchedule.period) &&
            props.workSchedule.period + String(props.workSchedule.periodUnit)}
        </Descriptions.Item>
        <Descriptions.Item label="预计结束时间">
          {!props.workSchedule.scheduleEndTime && "未指定预计时长"}
          {props.workSchedule.scheduleEndTime &&
            (props.workSchedule.isFullDay
              ? moment(props.workSchedule.scheduleEndTime).format("YYYY-MM-DD")
              : props.workSchedule.scheduleEndTime)}
        </Descriptions.Item>
        <Descriptions.Item label="产线/池塘">
          {props.workSchedule.pondGroup?.name ?? props.workSchedule.pond?.name}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
