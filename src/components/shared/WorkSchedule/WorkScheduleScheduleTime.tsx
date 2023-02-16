import React from "react";
import { WorkScheduleDto } from "../../../scaffold";
import moment from "moment";

export function WorkScheduleScheduleTime(props: {
  workSchedule?: WorkScheduleDto;
}) {
  if (props.workSchedule?.isFullDay) {
    return (
      <div>
        {moment(props?.workSchedule?.scheduleTime).format("YYYY-MM-DD 全天")}
      </div>
    );
  } else {
    return <div>{props?.workSchedule?.scheduleTime}</div>;
  }
}
