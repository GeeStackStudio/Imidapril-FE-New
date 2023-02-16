import React from "react";
import { Alert, Button } from "antd";

export default function ErrorAndCancel(props: {
  errorMessage: string;
  onCancel: () => any;
}) {
  if (!props.errorMessage) return <div />;
  return (
    <div>
      <Alert message={props.errorMessage} type={"error"} showIcon />
      <div className={"massa-dialog-footer"}>
        <Button style={{ width: 120 }} onClick={props.onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
}
