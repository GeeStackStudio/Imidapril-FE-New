import React from "react";
import { Tooltip } from "antd";
import { UploadSimpleStatus } from "./TextProgress";

export default function SlicingPartStatusBlock(props: {
  status: UploadSimpleStatus;
  errorMessage: string;
}) {
  let className = "massa-slicing-part-block";
  if (props.status === "上传中")
    className += " massa-slicing-part-block-uploading";
  if (props.status === "已完成")
    className += " massa-slicing-part-block-finished";
  if (props.status === "上传失败")
    className += " massa-slicing-part-block-error";
  if (props.errorMessage)
    return (
      <Tooltip title={props.errorMessage}>
        <div className={className} style={{ cursor: "pointer" }} />
      </Tooltip>
    );
  return <div className={className} />;
}
