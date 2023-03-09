import { Button, message, Modal, Table, Typography } from "antd";
import React from "react";
import { useAntdTable } from "ahooks";
import { useBoolean } from "react-hanger";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { CultureRuleApi, CultureRuleDto } from "../../../scaffold";
import Flex from "../../../components/shared/Flex";
import CultureRuleForm from "../../../components/shared/CultureRule/CultureRuleForm";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";

export function CultureRulePage() {
  const searchHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleSearchGet
  );
  const isAdd = useBoolean(false);
  const navigate = useNavigate();
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
  function refresh() {
    search.submit();
  }

  return (
    <PageContainer
      extra={
        <Button
          type="primary"
          onClick={() => {
            isAdd.setTrue();
          }}
        >
          新增生产规则
        </Button>
      }
    >
      <ProCard>
        <Table<CultureRuleDto> {...tableProps} rowKey={"id"}>
          <Table.Column<CultureRuleDto> title="生产规则名称" dataIndex="name" />
          <Table.Column<CultureRuleDto>
            title="生产品种"
            dataIndex={["breed", "name"]}
          />
          <Table.Column<CultureRuleDto>
            title="创建时间"
            dataIndex="createdTime"
          />
          <Table.Column<CultureRuleDto>
            title="操作"
            render={(text, row) => {
              return (
                <Button.Group>
                  <Button type={"link"}>编辑</Button>
                  <Button
                    type={"link"}
                    onClick={() => {
                      navigate(`/rule/${row.id}`);
                    }}
                  >
                    查看
                  </Button>
                </Button.Group>
              );
            }}
          />
        </Table>
      </ProCard>
      <Modal
        visible={isAdd.value}
        title={"生产规则管理"}
        onCancel={isAdd.setFalse}
        footer={null}
      >
        <CultureRuleForm
          onSuccess={(row) => {
            refresh();
            navigate("/rule/" + row?.id);
          }}
        />
      </Modal>
    </PageContainer>
  );
}
