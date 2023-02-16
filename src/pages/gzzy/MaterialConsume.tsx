import { Button, Card, Drawer, message, Modal, Table } from "antd";
import React, { useState } from "react";
import { useAntdTable } from "ahooks";
import { useParams } from "react-router-dom";
import { useBoolean } from "react-hanger";
import {
  StoreRecordApi,
  StoreRecordDto,
  StoreRecordType,
} from "../../scaffold";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import StoreRecordOutBoundForm from "../../components/shared/StoreRecord/StoreRecordOutBoundForm";

export function MaterialConsumePage() {
  const searchHook = useOpenApiFpRequest(
    StoreRecordApi,
    StoreRecordApi.prototype.storeRecordSearchGet
  );
  const isAdd = useBoolean(false);
  const isEdit = useBoolean(false);
  const [selected, setSelected] = useState<StoreRecordDto>();
  const routeParams = useParams<{ type?: StoreRecordType }>();
  const { tableProps, search, loading } = useAntdTable(
    (params) =>
      searchHook.request({
        pi: params.current,
        ps: params.pageSize,
        type: StoreRecordType.出库,
      }) as any,
    {
      defaultPageSize: 10,
      onError: (e) => message.error(e.message),
    }
  );
  return (
    <PageContainer>
      <ProCard style={{ marginTop: 32 }} bodyStyle={{ padding: 0 }}>
        <Table<StoreRecordDto> {...tableProps} rowKey={"id"}>
          <Table.Column<StoreRecordDto> title="单据编号" dataIndex="code" />
          <Table.Column<StoreRecordDto>
            title="物料种类"
            dataIndex={["material", "name"]}
          />
          <Table.Column<StoreRecordDto> title="数量" dataIndex="count" />
          <Table.Column<StoreRecordDto> title="类型" dataIndex="type" />
          <Table.Column<StoreRecordDto>
            title="领用人"
            dataIndex={["operator", "name"]}
          />
          <Table.Column<StoreRecordDto> title="备注" dataIndex="remark" />
          <Table.Column<StoreRecordDto>
            title="操作"
            render={(text, row) => {
              return (
                <Button.Group>
                  <Button
                    type={"link"}
                    onClick={() => {
                      isEdit.setTrue();
                      setSelected(row);
                    }}
                  >
                    编辑
                  </Button>
                </Button.Group>
              );
            }}
          />
        </Table>
      </ProCard>
      <Modal
        width={800}
        footer={null}
        open={isAdd.value}
        title="物料领用"
        onCancel={isAdd.setFalse}
      >
        <StoreRecordOutBoundForm
          onSuccess={() => {
            isAdd.setFalse();
            search.submit();
          }}
        />
      </Modal>
      <Modal
        width={800}
        footer={null}
        open={isEdit.value}
        title="领用单编辑"
        onCancel={isEdit.setFalse}
      >
        {selected && (
          <StoreRecordOutBoundForm
            item={selected}
            onSuccess={() => {
              isEdit.setFalse();
              search.submit();
            }}
          />
        )}
      </Modal>
    </PageContainer>
  );
}
