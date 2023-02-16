import React from "react";
import { Progress, ProgressProps } from "antd";
export type UploadSimpleStatus =
  | "未上传"
  | "上传中"
  | "上传失败"
  | "已完成"
  | "已暂停";
export interface ITextProgressProps extends ProgressProps {
  children?: any;
  errorMessage?: string;
  uploadStatus?: UploadSimpleStatus;
  current: number;
  total: number;
}
export default function TextProgress(props: ITextProgressProps) {
  const { children, size, errorMessage, uploadStatus, ...progressProps } =
    props;
  const progress = (props.current / (props.total || 1)) * 100;
  let className = "massa-text-progress ";
  let status = undefined;
  if (uploadStatus === "上传中") {
    status = "active";
  }
  if (uploadStatus === "已完成") {
    status = "success";
  }
  if (uploadStatus === "上传失败" || errorMessage) {
    status = "exception";
    className += "massa-text-progress-exception ";
  }
  return (
    <div className={className + props.className}>
      <Progress
        percent={progress}
        showInfo={false}
        status={status as any}
        {...progressProps}
      />
      <div className="progress-1" style={{ height: props.strokeWidth || 20 }}>
        {props.children}
      </div>
      <div
        className="progress-2"
        style={{ height: props.strokeWidth || 20, left: `-${100 - progress}%` }}
      >
        <div
          className="progress-2-inner"
          style={{
            height: props.strokeWidth || 20,
            left: `${100 - progress}%`,
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
