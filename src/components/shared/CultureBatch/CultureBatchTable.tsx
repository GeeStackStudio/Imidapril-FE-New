import {
  CultureBatchDto,
  CultureBatchToPond,
  PondDto,
} from "../../../scaffold";
import { Button, Table, TableProps } from "antd";
import React from "react";
import { PondCompleteName } from "../../../utils/PondCompleteName";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { UseZebra } from "../../../utils/UseZebra";

interface IProps extends TableProps<CultureBatchDto> {
  onClickDetail?: (row: CultureBatchDto) => any;
}
export function CultureBatchTable(props: IProps) {
  return (
    <Table<CultureBatchDto> rowClassName={UseZebra} {...props}>
      <Table.Column title="养殖编号" dataIndex="code"></Table.Column>
      <Table.Column
        title="养殖品种"
        dataIndex={["breed", "name"]}
      ></Table.Column>
      <Table.Column title="放苗量" dataIndex={["count"]}></Table.Column>
      <Table.Column title="创建时间" dataIndex={["createdTime"]}></Table.Column>
      <Table.Column<CultureBatchDto>
        title="操作"
        render={(text, row) => {
          return (
            <Button.Group>
              {props.onClickDetail && (
                <Button
                  type="link"
                  onClick={() =>
                    props.onClickDetail && props.onClickDetail(row)
                  }
                >
                  查看详情
                </Button>
              )}
            </Button.Group>
          );
        }}
      />
    </Table>
  );
}
