import { RiPencilRuler2Line } from "react-icons/all";
import { Modal, Typography } from "antd";
import Flex from "../Flex";
import React from "react";
import { useBoolean } from "react-hanger";
import WorkScheduleFinishSproutForm from "./Finish/WorkScheduleFinishSproutForm";
import WorkScheduleFinishWeightForm from "./Finish/WorkScheduleFinishWeightForm";
import WorkScheduleFinishPlantMeasureForm from "./Finish/WorkScheduleFinishPlantMeasureForm";

export function WorkSchedulePlantMeasureButton(props: {
  cultureBatchId?: number;
  onSuccess?: () => any;
}) {
  const isOperate = useBoolean(false);
  return (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        direction={"row"}
        style={{
          backgroundColor: "#1890ff",
          padding: 8,
          cursor: "pointer",
          width: 150,
          margin: 4,
        }}
        onClick={() => {
          isOperate.setTrue();
          // tabLayout.goTo(`/app/workSchedule/calender?cultureBatchId=${findHook.data?.id}`);
        }}
      >
        <RiPencilRuler2Line style={{ color: "#fff" }} fontSize={30} />
        <Typography.Text style={{ marginLeft: 4, color: "#fff" }} strong>
          测量体长体重
        </Typography.Text>
      </Flex>
      <Modal
        open={isOperate.value}
        onCancel={isOperate.setFalse}
        title="录入信息"
        footer={null}
      >
        {props.cultureBatchId && (
          <WorkScheduleFinishPlantMeasureForm
            cultureBatchId={props.cultureBatchId}
            onSuccess={() => {
              isOperate.setFalse();
              props.onSuccess && props.onSuccess();
            }}
          />
        )}
      </Modal>
    </>
  );
}
