import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  message,
  Modal,
  notification,
  Table,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useBoolean } from "react-hanger";
import { useAntdTable, useMount } from "ahooks";
import BreedSelector from "../../components/shared/Breed/BreedSelector";
import {
  BreedApi,
  BreedType,
  PondApi,
  PondDto,
  PondGroupApi,
} from "../../scaffold";
import { AsString } from "../../utils/AsString";
import { ToNumber } from "../../utils/ToNumber";
import PondForm from "../../components/shared/Pond/PondForm";
import { PageContainer, PageHeader, ProCard } from "@ant-design/pro-components";
import PondGroupSelector from "../../components/shared/PondGroup/PondGroupSelector";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { ConfirmAsync } from "../../utils/ConfirmAsync";

export function PondPage() {
  const searchHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  const removeHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondRemovePost
  );
  const pondGroupSearchHook = useOpenApiFpRequest(
    PondGroupApi,
    PondGroupApi.prototype.pondGroupSearchGet
  );
  const breedSearchHook = useOpenApiFpRequest(
    BreedApi,
    BreedApi.prototype.breedSearchGet
  );
  const [pondGroupId, setPondGroupId] = useState<number>();
  const [breedId, setBreedId] = useState<number>();
  const isAdd = useBoolean(false);
  const [selected, setSelected] = useState<PondDto>();
  const { tableProps, search, loading } = useAntdTable(
    (params) =>
      searchHook.request({
        pi: params.current,
        ps: params.pageSize,
        pondGroupId,
        type: "苗床",
        variety:
          breedSearchHook.data?.list?.find((i) => i.id === breedId)?.name ??
          undefined,
        sorterKey: "name",
        sorterOrder: "Asc",
      }) as any,
    {
      defaultPageSize: 10,
      onError: (e) => message.error(e.message),
    }
  );

  function refresh() {
    pondGroupSearchHook.requestSync({
      pi: 1,
      ps: 999,
    });
    breedSearchHook.requestSync({
      pi: 1,
      ps: 999,
    });
    search.submit();
  }

  useMount(() => {
    refresh();
  });

  async function remove(row: PondDto) {
    await ConfirmAsync({
      title: "您确认要删除吗?",
      content: "删除之后, 数据将无法恢复",
    });
    removeHook
      .request({
        pondRemoveParams: {
          id: Number(row.id),
        },
      })
      .then((r) => {
        refresh();
        notification.success({
          message: "删除成功",
          description: "您已成功删除此记录",
        });
      })
      .catch((e) => message.error(e.message));
  }

  return (
    <PageContainer>
      <ProCard style={{ marginBottom: 16 }}>
        <Form layout={"inline"}>
          <Form.Item label={"根据产线选择"}>
            <PondGroupSelector
              value={AsString(pondGroupId)}
              allowClear
              onChange={(v) => setPondGroupId(ToNumber(v))}
              placeholder={"请选择产线"}
            />
          </Form.Item>
          <Form.Item label={"选择生产品种"}>
            <BreedSelector
              type={BreedType.植物}
              value={AsString(breedId)}
              allowClear
              onChange={(v) => setBreedId(ToNumber(v))}
              style={{ width: 400 }}
              placeholder="选择养殖品种"
            />
          </Form.Item>
          <Form.Item>
            <Button.Group>
              <Button
                type="primary"
                onClick={() => {
                  search.submit();
                }}
              >
                搜索
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  isAdd.setTrue();
                }}
              >
                新增
              </Button>
            </Button.Group>
          </Form.Item>
        </Form>
      </ProCard>
      <ProCard bodyStyle={{ padding: 0 }}>
        <Table<PondDto> {...tableProps} rowKey={"id"} size={"small"}>
          <Table.Column<PondDto> title="名称" dataIndex="name" />
          <Table.Column<PondDto>
            title="长宽"
            render={(_, row) => `${row.length}m * ${row.width}m `}
          />
          {/*<Table.Column<PondDto> title="水体" dataIndex="waterBody" />*/}
          <Table.Column<PondDto>
            title="生产品种"
            dataIndex={["cultureInfo", "variety"]}
          />
          {/*<Table.Column<PondDto> title="本次生产时长" dataIndex={['cultureInfo', 'timePeriod']} />*/}
          {/*<Table.Column<PondDto> title="养殖尾数" dataIndex={['cultureInfo', 'count']} />*/}
          <Table.Column<PondDto>
            title="操作"
            render={(text, row) => {
              return (
                <Button.Group>
                  <Button type={"link"} onClick={() => setSelected(row)}>
                    编辑
                  </Button>
                  <Button type={"link"} danger onClick={() => remove(row)}>
                    删除
                  </Button>
                </Button.Group>
              );
            }}
          />
        </Table>
      </ProCard>
      <Modal
        open={isAdd.value}
        title={"添加苗床"}
        footer={null}
        onCancel={isAdd.setFalse}
      >
        <PondForm
          onSuccess={() => {
            isAdd.setFalse();
            refresh();
          }}
        />
      </Modal>
      <Modal
        open={!!selected}
        title={"编辑苗床"}
        footer={null}
        onCancel={() => {
          setSelected(undefined);
        }}
      >
        <PondForm
          item={selected}
          onSuccess={() => {
            setSelected(undefined);
            refresh();
          }}
        />
      </Modal>
    </PageContainer>
  );
}
