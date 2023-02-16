import { CultureBatchToPond, PondDto } from "../../../scaffold";
import { Button, Table } from "antd";
import React from "react";
import { PondCompleteName } from "../../../utils/PondCompleteName";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { UseZebra } from "../../../utils/UseZebra";

export function CultureBatchToPondTable(props: {
  list?: CultureBatchToPond[];
  size?: SizeType;
  onEdit?: (pond: PondDto) => any;
}) {
  return (
    <Table<CultureBatchToPond>
      dataSource={props.list}
      key={"id"}
      size={props.size}
      pagination={false}
    >
      <Table.Column<CultureBatchToPond>
        title="名称"
        dataIndex={["pond", "name"]}
        render={(i, row) => row.pond?.name}
      />
      <Table.Column<CultureBatchToPond>
        title="长*宽*高"
        render={(_, row) =>
          `${row.pond?.length}m * ${row.pond?.width}m * ${row.pond?.height}m`
        }
      />
      {/*<Table.Column<CultureBatchToPond> title="水体" dataIndex={['pond', 'waterBody']} />*/}
      <Table.Column<CultureBatchToPond>
        title="种苗时间"
        dataIndex={"fryTime"}
        render={(_) => _ ?? "尚未放苗"}
      />
      <Table.Column<CultureBatchToPond>
        title="株数"
        dataIndex={"count"}
        render={(_) => _ ?? "尚未养殖"}
      />
      <Table.Column<CultureBatchToPond>
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
