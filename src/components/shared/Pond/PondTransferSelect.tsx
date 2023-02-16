import React, { useMemo } from "react";
import { PondApi, PondDto } from "../../../scaffold";
import Flex from "../Flex";
import { Divider, Transfer, Typography } from "antd";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { AsString } from "../../../utils/AsString";
import { AsNumber } from "../../../utils/AsNumber";
import { useMount } from "ahooks";

export function PondTransferSelect(props: {
  leftTitle?: string;
  rightTitle?: string;
  disableWhen?: (i: PondDto) => boolean;
  value?: number[];
  onChange?: (v: number[]) => any;
}) {
  const pondSearch = useOpenApiFpRequest(
    PondApi,
    PondApi.prototype.pondSearchGet
  );
  useMount(() => {
    pondSearch.requestSync({
      pi: 1,
      ps: 999,
    });
  });
  const transferDataSource = useMemo(() => {
    return (
      pondSearch.data?.list?.map((i) => {
        return {
          ...i,
          disabled: props.disableWhen ? props.disableWhen(i) : false,
        };
      }) ?? []
    );
  }, [pondSearch.data]);
  return (
    <Transfer<PondDto>
      listStyle={{
        width: 400,
        height: 500,
      }}
      showSearch
      filterOption={(inputValue, option) =>
        !!(
          option.name?.includes(inputValue) ??
          option.pondGroupToPond?.pondGroup?.name?.includes(inputValue) ??
          option.pondGroupToPond?.pondGroup?.workShopToPondGroup?.workShop?.name?.includes(
            inputValue
          )
        )
      }
      rowKey={(row) => String(row.id)}
      dataSource={transferDataSource}
      titles={[props.leftTitle ?? "全部池塘", props.rightTitle ?? "所选池塘"]}
      targetKeys={props.value?.map((i) => AsString(i)!) ?? []}
      render={(item) => (
        <Flex direction={"column"}>
          <Typography.Text strong>{item.name}</Typography.Text>
          <div>
            <Typography.Text type="secondary">
              {item.pondGroupToPond?.pondGroup?.workShopToPondGroup?.workShop
                ?.name ?? "无车间"}
            </Typography.Text>
            <Divider type="vertical" />
            <Typography.Text type="secondary">
              {item.pondGroupToPond?.pondGroup?.name ?? "无产线"}
            </Typography.Text>
          </div>
        </Flex>
      )}
      onChange={(v) =>
        props.onChange && props.onChange(v.map((i) => AsNumber(i)!))
      }
    />
  );
}
