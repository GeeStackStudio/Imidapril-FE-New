import { PondDto } from "../../../scaffold";
import { Button, Table } from "antd";
import React from "react";

export function PondTable(props: {
  list?: PondDto[];
  onEdit?: (pond: PondDto) => any;
}) {
  return (
    <Table<PondDto>
      dataSource={props.list}
      key={"id"}
      size="small"
      pagination={false}
    >
      <Table.Column<PondDto> title="名称" dataIndex="name" />
      <Table.Column<PondDto>
        title="长宽高"
        render={(_, row) => `${row.length}m * ${row.width}m * ${row.height}m`}
      />
      <Table.Column<PondDto> title="水体" dataIndex="waterBody" />
      <Table.Column<PondDto>
        title="养殖品种"
        dataIndex={["cultureInfo", "variety"]}
        render={(_) => _ ?? "尚未养殖"}
      />
      <Table.Column<PondDto>
        title="养殖时长"
        dataIndex={["cultureInfo", "timePeriod"]}
        render={(_) => _ ?? "尚未养殖"}
      />
      <Table.Column<PondDto>
        title="尾数"
        dataIndex={["cultureInfo", "count"]}
        render={(_) => _ ?? "尚未养殖"}
      />
      <Table.Column<PondDto>
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
