import React, { useEffect } from "react";

import { useOpenApiFpRequest } from "../../../../Http/useOpenApiRequest";
import {
  WorkScheduleApi,
  WorkScheduleDto,
  WorkType,
} from "../../../../scaffold";
import { useMount } from "ahooks";
import WorkScheduleFinishFeedForm from "./WorkScheduleFinishFeedForm";
import WorkScheduleFinishCheckForm from "./WorkScheduleFinishCheckForm";
import WorkScheduleFinishWeightForm from "./WorkScheduleFinishWeightForm";
import WorkScheduleFinishDeliverWaterInspectForm from "./WorkScheduleFinishDeliverWaterInspectForm";
import WorkScheduleFinishSewageForm from "./WorkScheduleFinishSewageForm";
import WorkScheduleCommonFinishForm from "./WorkScheduleCommonFinishForm";
import { Spin } from "antd";
import WorkScheduleFinishFryForm from "./WorkScheduleFinishFryForm";

function FinishForm(props: { workSchedule: WorkScheduleDto }) {
  switch (props.workSchedule.type) {
    case WorkType.投喂:
      return <WorkScheduleFinishFeedForm workSchedule={props.workSchedule} />;
    case WorkType.日常检查:
      return <WorkScheduleFinishCheckForm workSchedule={props.workSchedule} />;
    case WorkType.测量体长体重:
      return <WorkScheduleFinishWeightForm workSchedule={props.workSchedule} />;
    case WorkType.水样送检:
      return (
        <WorkScheduleFinishDeliverWaterInspectForm
          workSchedule={props.workSchedule}
        />
      );
    case WorkType.排污:
      return <WorkScheduleFinishSewageForm workSchedule={props.workSchedule} />;
    case WorkType.放苗:
      return <WorkScheduleFinishFryForm workSchedule={props.workSchedule} />;
    default:
      return <WorkScheduleCommonFinishForm workSchedule={props.workSchedule} />;
  }
}

const WorkScheduleFinishForm = (props: {
  id: number;
  onSuccess?: () => any;
}) => {
  const findHook = useOpenApiFpRequest(
    WorkScheduleApi,
    WorkScheduleApi.prototype.workScheduleFindGet
  );
  useEffect(() => {
    findHook.requestSync({
      id: props.id,
    });
  }, [props.id]);
  return (
    <Spin spinning={findHook.loading}>
      {findHook.data && <FinishForm workSchedule={findHook.data} />}
    </Spin>
  );
};
export default WorkScheduleFinishForm;
