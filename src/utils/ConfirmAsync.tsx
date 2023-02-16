import React, { ReactNode } from "react";
import { Modal } from "antd";
import { ModalFuncProps } from "antd/lib/modal/Modal";

export function ConfirmAsync(props: ModalFuncProps) {
  return new Promise((resolve, reject) => {
    return Modal.confirm({
      ...props,
      okText: props.okText || "确认",
      cancelText: props.cancelText || "取消",
      onOk: () => {
        return resolve(undefined);
      },
      onCancel: () => {
        return reject(undefined);
      },
    });
  });
}

export function ConfirmDelete() {
  return ConfirmAsync({
    title: "确认",
    content: "您是否确认要删除？",
    maskClosable: true,
  });
}
