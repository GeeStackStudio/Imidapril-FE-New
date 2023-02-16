import { useBoolean, useInput } from "react-hanger";
import { UserRoleTag } from "../../components/shared/User/UserRoleTag";
import { UserApi, UserDto, UserRole } from "../../scaffold";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import React, { useState } from "react";
import UserForm from "../../components/shared/User/UserForm";
import { useAntdTable } from "ahooks";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Table,
  Typography,
} from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

export function UserPage() {
  const searchHook = useOpenApiFpRequest(
    UserApi,
    UserApi.prototype.userSearchGet
  );
  const isAdd = useBoolean(false);
  const [selected, setSelected] = useState<UserDto>();
  const username = useInput("");
  const name = useInput("");
  const [role, setRole] = useState<UserRole>();
  const { tableProps, search, loading } = useAntdTable(
    (params) =>
      searchHook.request({
        pi: params.current,
        ps: params.pageSize,
        username: username.value,
        name: name.value,
        role,
      }) as any,
    {
      defaultPageSize: 10,
      onError: (e) => message.error(e.message),
    }
  );
  return (
    <PageContainer>
      <ProCard>
        <Form layout="inline">
          <Form.Item label="用户名">
            <Input {...username.eventBind} placeholder="输入用户名以搜索" />
          </Form.Item>
          <Form.Item label="真实姓名">
            <Input {...name.eventBind} placeholder="输入真实姓名以搜索" />
          </Form.Item>
          <Form.Item label="角色">
            <Radio.Group value={role} onChange={(v) => setRole(v.target.value)}>
              <Radio value={UserRole.管理员}>管理员</Radio>
              <Radio value={UserRole.生产队长}>生产队长</Radio>
              <Radio value={UserRole.养殖人员}>养殖人员</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button.Group>
              <Button type="primary" onClick={() => search.submit()}>
                搜索
              </Button>
              <Button type="primary" onClick={() => isAdd.setTrue()}>
                新增
              </Button>
            </Button.Group>
          </Form.Item>
        </Form>
      </ProCard>
      <ProCard
        bodyStyle={{ padding: 0, background: "transparent" }}
        style={{ marginTop: 32 }}
      >
        <Table<UserDto>
          {...tableProps}
          rowKey={"id"}
          className={"table-transparent"}
        >
          <Table.Column<UserDto> title="员工姓名" dataIndex="name" />
          <Table.Column<UserDto> title="用户名" dataIndex="name" />
          <Table.Column<UserDto>
            title="角色"
            dataIndex="role"
            render={(_) => <UserRoleTag role={_} />}
          />
          <Table.Column<UserDto>
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
        open={isAdd.value}
        onCancel={isAdd.setFalse}
        footer={null}
        title="新建用户"
        width={800}
      >
        <UserForm
          onSuccess={() => {
            isAdd.setFalse();
            search.submit();
          }}
        />
      </Modal>
      <Modal
        open={!!selected}
        onCancel={() => setSelected(undefined)}
        footer={null}
        title="编辑用户"
        width={800}
      >
        <UserForm
          item={selected}
          onSuccess={() => {
            isAdd.setFalse();
            search.submit();
          }}
        />
      </Modal>
    </PageContainer>
  );
}
