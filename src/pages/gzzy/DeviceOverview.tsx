import { useMount } from "ahooks";
import CommonApiErrorHandler from "../../utils/HttpInstance";
import PondSelector from "../../components/shared/Pond/PondSelector";
import React, { useEffect, useMemo, useState } from "react";
import { AsString } from "../../utils/AsString";
import { ToNumber } from "../../utils/ToNumber";
import { PageContainer, PageHeader } from "@ant-design/pro-components";
import { DeviceApi, DeviceDto, PondApi } from "../../scaffold";
import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { Col, Form, Row, Spin, Switch, Table, Typography } from "antd";
export function DeviceOverviewPage() {
  const [pondId, setPondId] = useState<number>();
  const pondFindHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondFindGet
  );
  const pondSearchHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  const deviceSearchHook = useOpenApiFpRequest(
    DeviceApi,
    DeviceApi.prototype.deviceSearchGet
  );
  useMount(() => {
    pondSearchHook
      .request({
        pi: 1,
        ps: 1,
      })
      .then((r) => {
        if (r.list && (r.list?.length ?? 0) > 0) {
          setPondId(r.list[0].id);
        }
      });
  });
  useEffect(() => {
    if (pondId) {
      pondFindHook
        .request({
          id: pondId,
        })
        .then((r) => {
          deviceSearchHook.requestSync({
            keyword: String(r.name),
            pi: 1,
            ps: 999,
          });
        })
        .catch(CommonApiErrorHandler);
    }
  }, [pondId]);
  const oxygenDevices = useMemo(() => {
    return deviceSearchHook.data?.list?.filter((i) =>
      i.name?.includes("增氧机")
    );
  }, [deviceSearchHook.data]);
  const feedDevices = useMemo(() => {
    return deviceSearchHook.data?.list?.filter((i) => i.name?.includes("投饵"));
  }, [deviceSearchHook.data]);
  return (
    <PageContainer style={{ flex: 1 }}>
      <div>
        <Form style={{ maxWidth: 250 }}>
          <Form.Item label={"池塘号"}>
            <PondSelector
              value={AsString(pondId)}
              onChange={(v) => {
                setPondId(ToNumber(v));
              }}
              placeholder={"请在此处选择一个池塘"}
            />
          </Form.Item>
        </Form>
        <Spin
          spinning={deviceSearchHook.loading || pondFindHook.loading}
          tip={"加载中"}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Typography.Title level={5}>增氧设备</Typography.Title>
              <Table<DeviceDto> dataSource={oxygenDevices} pagination={false}>
                <Table.Column<DeviceDto> title="设备" dataIndex={["name"]} />
                <Table.Column<DeviceDto>
                  title="更新时间"
                  dataIndex={["fetchedTime"]}
                  render={(txt) => txt ?? "无"}
                />
                <Table.Column<DeviceDto>
                  title="状态"
                  render={(txt) => <Switch></Switch>}
                />
              </Table>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>投饵机</Typography.Title>
              <Table<DeviceDto> dataSource={feedDevices} pagination={false}>
                <Table.Column<DeviceDto> title="设备" dataIndex={["name"]} />
                <Table.Column<DeviceDto>
                  title="更新时间"
                  dataIndex={["fetchedTime"]}
                  render={(txt) => txt ?? "无"}
                />
                <Table.Column<DeviceDto>
                  title="状态"
                  render={(txt) => <Switch></Switch>}
                />
              </Table>
            </Col>
          </Row>
        </Spin>
      </div>
    </PageContainer>
  );
}
