import { Button, Image, message, Modal, Table } from "antd";
import React, { useState } from "react";
import { useAntdTable } from "ahooks";
import { useBoolean } from "react-hanger";
import DiseaseRuleForm from "../../../components/shared/DiseaseRule/DiseaseRuleForm";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { DiseaseRuleApi, DiseaseRuleDto } from "../../../scaffold";
import { PageContainer, ProCard } from "@ant-design/pro-components";

export function DiseaseRulePage() {
  const searchHook = useOpenApiFpRequest(
    DiseaseRuleApi,
    DiseaseRuleApi.prototype.diseaseRuleSearchGet
  );
  const isAdd = useBoolean(false);
  const [selected, setSelected] = useState<DiseaseRuleDto>();
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
    <PageContainer
      extra={
        <Button type="primary" onClick={isAdd.setTrue}>
          新建病害规则
        </Button>
      }
    >
      <ProCard>
        <Table<DiseaseRuleDto> {...tableProps} rowKey={"id"}>
          <Table.Column<DiseaseRuleDto>
            title="病害名称"
            dataIndex="name"
            width={130}
          />
          <Table.Column<DiseaseRuleDto>
            title="病害图片"
            render={(_, row) => {
              return row.imageUrl && <Image height={100} src={row.imageUrl} />;
            }}
          />
          <Table.Column<DiseaseRuleDto>
            title="病害简介"
            dataIndex="description"
          />
          <Table.Column<DiseaseRuleDto> title="解决方案" dataIndex="solution" />
          <Table.Column<DiseaseRuleDto>
            title="养殖规则"
            dataIndex={["cultureRule", "name"]}
          />
          <Table.Column<DiseaseRuleDto>
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
        footer={null}
        visible={isAdd.value}
        onCancel={isAdd.setFalse}
        destroyOnClose={true}
        title={"编辑病害规则"}
        width={800}
      >
        <DiseaseRuleForm
          onSuccess={() => {
            search.submit();
            isAdd.setFalse();
          }}
        />
      </Modal>

      <Modal
        visible={!!selected}
        footer={null}
        onCancel={() => {
          setSelected(undefined);
        }}
        destroyOnClose={true}
        title={"编辑病害规则"}
        width={800}
      >
        <DiseaseRuleForm
          item={selected}
          onSuccess={() => {
            search.submit();
            setSelected(undefined);
          }}
        />
      </Modal>
    </PageContainer>
  );
}
