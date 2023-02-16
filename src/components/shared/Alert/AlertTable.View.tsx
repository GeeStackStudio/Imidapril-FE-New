import { AlertDto } from "../../../scaffold";
import React from "react";
import { Button, Table, TableProps } from "antd";
import { UseZebra } from "../../../utils/UseZebra";
import { AlertLevelTag } from "./AlertLevelTag";

interface IProps extends TableProps<AlertDto> {
  onEdit?: (row: AlertDto) => any;
}
export function AlertTableView(props: IProps) {
  return (
    <Table<AlertDto> {...props} rowKey={"id"} rowClassName={UseZebra}>
      <Table.Column<AlertDto> title="警报标题" width={120} dataIndex="title" />
      <Table.Column<AlertDto>
        title="警报等级"
        width={100}
        dataIndex="level"
        render={(_) => <AlertLevelTag level={_} />}
      />
      <Table.Column<AlertDto> title="警报简介" dataIndex="description" />
      <Table.Column<AlertDto>
        title="解决方案"
        width={120}
        dataIndex="solution"
      />
      <Table.Column<AlertDto>
        title="养殖批次"
        width={170}
        dataIndex={["cultureBatch", "code"]}
      />
      <Table.Column<AlertDto>
        title="创建者"
        width={120}
        dataIndex={["creator", "name"]}
      />
      <Table.Column<AlertDto>
        title="操作"
        width={120}
        render={(text, row) => {
          return (
            <Button.Group>
              {props.onEdit && (
                <Button
                  type={"link"}
                  onClick={() => props.onEdit && props.onEdit(row)}
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
