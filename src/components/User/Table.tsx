import React, { useEffect } from "react";
import useOpenApi from "../../Http/useOpenApi";
import {
  Gender,
  SorterOrder,
  UserApi,
  UserApiFactory,
  UserDto,
} from "../../scaffold";
import { useAntdTable } from "ahooks";
import { Avatar, message, Space, Table } from "antd";
import UserAvatar from "./UserAvatar";
import UserUpdateInfoBtn from "./UpdateInfoBtn";

export default function UserTable(props: { antDTable: any }) {
  const { tableProps, search, loading } = props.antDTable;

  return (
    <Table<UserDto>
      {...tableProps}
      rowKey={"id"}
      bordered
      className={"massa-table-no-row-border"}
    >
      <Table.Column<UserDto> title="ID" dataIndex="id" sorter />
      <Table.Column<UserDto>
        title="姓名"
        dataIndex={"name"}
        sorter
        render={(_, item) => (
          <Space>
            <UserAvatar user={item} />
            <strong>{item.name}</strong>
          </Space>
        )}
      />
      <Table.Column<UserDto> title="用户名" dataIndex="username" sorter />
      <Table.Column<UserDto> title="邮箱" dataIndex="email" sorter />
      <Table.Column<UserDto> title="部门" dataIndex={["department", "name"]} />
      <Table.Column<UserDto>
        title="状态"
        sorter
        dataIndex="isAble"
        render={(_, item) => (!item.isDelete ? "启用" : "冻结")}
      />
      <Table.Column<UserDto>
        title="操作"
        render={(text, row) => {
          return (
            <Space>
              <UserUpdateInfoBtn
                user={row}
                type={"link"}
                size={"small"}
                onSuccess={search.submit}
              />
            </Space>
          );
        }}
      />
    </Table>
  );
}
