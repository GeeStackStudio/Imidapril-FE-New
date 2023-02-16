import React from "react";
import { Avatar, AvatarProps } from "antd";
import { UserDto } from "../../scaffold";
interface IUserAvatarProps extends AvatarProps {
  user: UserDto;
}
export default function UserAvatar(props: IUserAvatarProps) {
  const { user, ...avatarProps } = props;
  return (
    <Avatar
      {...avatarProps}
      src={
        "https://geestack-public.oss-cn-shanghai.aliyuncs.com/captopril/avatar.JPG"
      }
      shape={"square"}
      gap={6}
    >
      {user.name ? user.name[0] : ""}
    </Avatar>
  );
}
