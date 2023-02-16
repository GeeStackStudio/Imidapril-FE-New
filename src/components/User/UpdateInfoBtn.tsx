import React from "react";
import { Button, ButtonProps, Input, message, Modal, Space } from "antd";
import Flex from "../shared/Flex";
import Text from "antd/lib/typography/Text";
import { useBoolean, useInput } from "react-hanger";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { UserApi, UserDto } from "../../scaffold";
import CommonApiErrorHandler from "../../utils/HttpInstance";
import UserEditForm from "./EditForm";

interface IUpdateInfoBtnProps extends ButtonProps {
  user: UserDto;
  onSuccess?: (user: UserDto) => any;
}

export default function UserUpdateInfoBtn(props: IUpdateInfoBtnProps) {
  const { user, ...btnProps } = props;
  const isDialog = useBoolean(false);

  return (
    <div>
      <Button {...btnProps} onClick={isDialog.setTrue}>
        编辑
      </Button>
      <Modal
        title={"编辑用户信息"}
        open={isDialog.value}
        maskClosable={false}
        closable={false}
        footer={false}
      >
        <UserEditForm
          user={props.user}
          onSuccess={(res) => {
            props.onSuccess && props.onSuccess(res);
            isDialog.setFalse();
          }}
          onCancel={isDialog.setFalse}
        />
      </Modal>
    </div>
  );
}
