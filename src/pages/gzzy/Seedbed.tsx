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
import { BreedApi, PondApi, PondDto, PondGroupApi } from "../../scaffold";
import { AsString } from "../../utils/AsString";
import { ToNumber } from "../../utils/ToNumber";
import PondForm from "../../components/shared/Pond/PondForm";
import { PondCompleteName } from "../../utils/PondCompleteName";
import PondGroupSelector from "../../components/shared/PondGroup/PondGroupSelector";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { ConfirmAsync } from "../../utils/ConfirmAsync";
import { PageContainer, PageHeader, ProCard } from "@ant-design/pro-components";

export function SeedbedPage() {
  const searchHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  const removeHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondRemovePost
  );
  const isAdd = useBoolean(false);
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
  const { tableProps, search, loading } = useAntdTable(
    (params) =>
      searchHook.request({
        pi: params.current,
        ps: params.pageSize,
        pondGroupId,
        variety:
          breedSearchHook.data?.list?.find((i) => i.id === breedId)?.name ??
          undefined,
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
      title: "??????????????????????",
      content: "????????????,?????????????????????",
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
          message: "????????????",
          description: "???????????????????????????",
        });
      })
      .catch((e) => message.error(e.message));
  }

  return (
    <div>
      <PageContainer>
        <ProCard style={{ marginBottom: 16 }}>
          <Form layout={"inline"}>
            <Form.Item label={"??????????????????"}>
              <PondGroupSelector
                value={AsString(pondGroupId)}
                allowClear
                onChange={(v) => setPondGroupId(ToNumber(v))}
                placeholder={"???????????????"}
              />
            </Form.Item>
            <Form.Item label={"??????????????????"}>
              <BreedSelector
                value={AsString(breedId)}
                allowClear
                onChange={(v) => setBreedId(ToNumber(v))}
                style={{ width: 400 }}
                placeholder="??????????????????"
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
                  ??????
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    isAdd.setTrue();
                  }}
                >
                  ??????
                </Button>
              </Button.Group>
            </Form.Item>
          </Form>
        </ProCard>
        <ProCard bodyStyle={{ padding: 0 }}>
          <Table<PondDto> {...tableProps} rowKey={"id"}>
            <Table.Column<PondDto>
              title="??????"
              dataIndex="name"
              render={(_, row) => <PondCompleteName pond={row} />}
            />
            <Table.Column<PondDto>
              title="?????????"
              render={(_, row) =>
                `${row.length}m * ${row.width}m * ${row.height}m`
              }
            />
            {/*<Table.Column<PondDto> title="????????????" dataIndex={['cultureInfo', 'count']} />*/}
            <Table.Column<PondDto>
              title="??????"
              render={(text, row) => {
                return (
                  <Button.Group>
                    <Button type={"link"}>??????</Button>
                    <Button type={"link"} danger onClick={() => remove(row)}>
                      ??????
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
          title="????????????"
        >
          <PondForm
            onSuccess={() => {
              isAdd.setFalse();
              refresh();
            }}
          />
        </Modal>
      </PageContainer>
    </div>
  );
}
