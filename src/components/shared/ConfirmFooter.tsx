import React, { HTMLAttributes } from "react";
import { Button, Space } from "antd";
interface IConfirmFooterProps extends HTMLAttributes<HTMLDivElement> {
  onCancel: () => any;
  onConfirm: () => any;
  loading?: boolean;
  disabled?: boolean;
  confirmText: string;
}
export default function ConfirmFooter(props: IConfirmFooterProps) {
  const { onConfirm, onCancel, loading, disabled, confirmText, ...divProps } =
    props;
  return (
    <div className={"massa-dialog-footer"} {...divProps}>
      <Space>
        <Button
          type="primary"
          onClick={onConfirm}
          loading={loading}
          disabled={disabled}
        >
          {confirmText}
        </Button>
        <Button onClick={onCancel}>取消</Button>
      </Space>
    </div>
  );
}
