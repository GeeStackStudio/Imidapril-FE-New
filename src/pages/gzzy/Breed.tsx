import { Button, Card, message, Modal, Table } from "antd";
import React, { useState } from "react";
import { useAntdTable } from "ahooks";
import { useNavigate } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;
import { useBoolean } from "react-hanger";
import { BreedApi, BreedDto } from "../../scaffold";
import BreedForm from "../../components/shared/Breed/BreedForm";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { PageContainer, ProCard } from "@ant-design/pro-components";

export function BreedPage() {
  const searchHook = useOpenApiFpRequest(
    BreedApi,
    BreedApi.prototype.breedSearchGet
  );
  const isAdd = useBoolean(false);
  const [selected, setSelected] = useState<BreedDto>();
  const history = useNavigate();
  const { tableProps, search, loading } = useAntdTable(
    (params) =>
      searchHook.request({
        pi: params.current,
        ps: params.pageSize,
      }) as any,
    {
      defaultPageSize: 10,
      onError: (e) => message.error(e.message),
    }
  );
  return (
    <PageContainer>
      <ProCard style={{ margin: 16 }}>
        <Table<BreedDto> {...tableProps} rowKey={"id"}>
          <Table.Column<BreedDto> title="名称" dataIndex="name" />
          <Table.Column<BreedDto> title="简介" dataIndex="description" />
          <Table.Column<BreedDto>
            title="操作"
            render={(text, row) => {
              return (
                <Button.Group>
                  <Button
                    type={"link"}
                    onClick={() => {
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
        title={"编辑品种"}
        open={!!selected}
        onCancel={() => {
          setSelected(undefined);
        }}
        footer={null}
      >
        <BreedForm
          item={selected}
          onSuccess={() => {
            setSelected(undefined);
            search.submit();
          }}
        />
      </Modal>
      <Modal
        title={"新增品种"}
        open={isAdd.value}
        onCancel={() => {
          isAdd.setFalse();
        }}
        footer={null}
      >
        <BreedForm
          onSuccess={() => {
            search.submit();
          }}
        />
      </Modal>
    </PageContainer>
  );
}
