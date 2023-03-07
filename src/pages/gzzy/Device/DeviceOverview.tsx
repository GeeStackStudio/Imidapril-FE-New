import { useMount } from "ahooks";
import CommonApiErrorHandler from "../../../utils/HttpInstance";
import PondSelector from "../../../components/shared/Pond/PondSelector";
import React, { useEffect, useMemo, useState } from "react";
import { AsString } from "../../../utils/AsString";
import { ToNumber } from "../../../utils/ToNumber";
import { PageContainer, PageHeader } from "@ant-design/pro-components";
import {
  ControlCabinetApi,
  DeviceApi,
  DeviceDto,
  PondApi,
  SorterOrder,
} from "../../../scaffold";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { Col, Form, message, Row, Spin, Switch, Table, Typography } from "antd";
import {
  ControlDeviceCard,
  DeviceControlItem,
} from "../../../components/shared/Device/ControlDeviceCard";
import Flex from "../../../components/shared/Flex";
export function DeviceOverviewPage() {
  const [pondId, setPondId] = useState<number>();
  const controlCabinetSearchHook = useOpenApiFpRequest(
    ControlCabinetApi,
    ControlCabinetApi.prototype.controlCabinetSearchGet
  );
  const deviceSearchHook = useOpenApiFpRequest(
    DeviceApi,
    DeviceApi.prototype.deviceSearchGet
  );
  const pondFindHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondFindGet
  );
  const pondSearchHook = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  async function refresh() {
    pondSearchHook.requestSync({
      pi: 1,
      ps: 1,
    });

    controlCabinetSearchHook.requestSync({
      pi: 1,
      ps: 999,
    });
    deviceSearchHook.requestSync({
      pi: 1,
      ps: 999,
      sorterKey: "position",
      sorterOrder: SorterOrder.Asc,
    });
  }

  const pondsWithControlDevices = useMemo(() => {
    const res: Map<string, DeviceControlItem[]> = new Map<
      string,
      DeviceControlItem[]
    >();
    if (!deviceSearchHook.data?.list || !controlCabinetSearchHook.data?.list) {
      return res;
    }
    for (const device of deviceSearchHook.data.list) {
      const controlCabinet = controlCabinetSearchHook.data.list.find(
        (i) => i.id === device.controlCabinetId
      );
      let isOn = false;
      if (controlCabinet?.status && device.channel) {
        isOn = controlCabinet?.status[device.channel - 1] === "1";
      }
      const str = controlCabinet?.status;
      if (!device.position) {
        continue;
      }
      if (res.has(device.position)) {
        res.get(device.position)?.push({
          device,
          controlCabinet,
          isOn,
        });
      } else {
        res.set(device.position, [
          {
            device,
            controlCabinet,
            isOn,
          },
        ]);
      }
    }
    return res;
  }, [controlCabinetSearchHook.data, deviceSearchHook.data]);

  useMount(() => {
    refresh();
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
    } else {
      deviceSearchHook.requestSync({
        pi: 1,
        ps: 999,
      });
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
              allowClear={true}
              placeholder={"请在此处选择一个池塘"}
            />
          </Form.Item>
        </Form>
        <Spin
          spinning={deviceSearchHook.loading || pondFindHook.loading}
          tip={"加载中"}
        >
          <div>
            {Array.from(pondsWithControlDevices.keys()).map((i) => (
              <Flex
                direction={"column"}
                key={i}
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  paddingBottom: 8,
                }}
              >
                <Flex direction={"column"} justify={"flex-start"}>
                  <Typography.Title level={3}>{i}</Typography.Title>
                </Flex>
                <Flex wrap={"wrap"}>
                  {pondsWithControlDevices
                    .get(i)
                    ?.sort((a, b) =>
                      String(a?.device?.name) > String(b?.device?.name) ? 1 : -1
                    )
                    ?.map((item) => (
                      <ControlDeviceCard
                        key={item.device.id}
                        item={item}
                        style={{
                          margin: 32,
                          width: 200,
                          height: 350,
                        }}
                      />
                    ))}
                </Flex>
              </Flex>
            ))}
          </div>
        </Spin>
      </div>
    </PageContainer>
  );
}
