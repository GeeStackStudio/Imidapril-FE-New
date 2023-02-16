import { GiPlantRoots } from "react-icons/all";
import { Modal, Typography } from "antd";
import Flex from "../Flex";
import React from "react";
import { useBoolean } from "react-hanger";
import WorkScheduleFinishSproutForm from "./Finish/WorkScheduleFinishSproutForm";

export function WorkScheduleSproutButton(props: {
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
          backgroundColor: "#08979c",
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
        <GiPlantRoots style={{ color: "#fff" }} fontSize={30} />
        <Typography.Text style={{ marginLeft: 4, color: "#fff" }} strong>
          录入种苗
        </Typography.Text>
      </Flex>
      <Modal
        open={isOperate.value}
        onCancel={isOperate.setFalse}
        title="录入种苗信息"
        footer={null}
        width={"80%"}
      >
        {props.cultureBatchId && (
          <WorkScheduleFinishSproutForm
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
