import { UserGroupDto } from "../../../scaffold";
import { Button, Table } from "antd";
import React from "react";
export function UserGroupTable(props: {
  list?: UserGroupDto[];
  onEdit?: (pond: UserGroupDto) => any;
  style?: React.CSSProperties;
}) {
  return (
    <Table<UserGroupDto>
      dataSource={props.list}
      key={"id"}
      size="small"
      pagination={false}
      style={props.style}
    >
      <Table.Column<UserGroupDto> title="名称" dataIndex="name" />
      <Table.Column<UserGroupDto>
        title="操作"
        render={(text, row) => {
          return (
            <Button.Group>
              {props.onEdit && (
                <Button
                  type={"link"}
                  onClick={() => {
                    props.onEdit && props.onEdit(row);
                  }}
                >
                  编辑
                </Button>
              )}
            </Button.Group>
          );
        }}
      />
    </Table>
  );
}
