import EChartsReact from "echarts-for-react";
import React, { CSSProperties, useCallback, useEffect, useMemo } from "react";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import {
  CultureBatchApi,
  CultureBatchGrowRecordApi,
  SorterOrder,
} from "../../../scaffold";
import moment from "moment";
import { useMount } from "ahooks";
import { Empty, Typography } from "antd";
import Flex from "../Flex";
import { BeautifiedEmpty } from "../BeautifiedEmpty/BeautifiedEmpty";

export function DeathCountHistory(props: {
  cultureBatchId: number;
  style?: CSSProperties;
  theme?: string;
}) {
  const findHook = useOpenApiFpRequest(
    CultureBatchApi,
    CultureBatchApi.prototype.cultureBatchFindGet
  );
  const searchHook = useOpenApiFpRequest(
    CultureBatchGrowRecordApi,
    CultureBatchGrowRecordApi.prototype.cultureBatchGrowRecordSearchGet
  );
  useMount(() => {
    findHook.requestSync({
      id: props.cultureBatchId,
    });
    searchHook.requestSync({
      pi: 1,
      ps: 999,
      cultureBatchId: props.cultureBatchId,
      sorterKey: "CreatedTime",
      sorterOrder: SorterOrder.Asc,
    });
  });

  const list = useMemo(() => {
    return (
      searchHook.data?.list?.filter(
        (i) =>
          i.cultureInfo?.deathCount !== undefined &&
          i.cultureInfo?.deathCount !== null
      ) ?? []
    );
  }, [searchHook.data]);

  const xAxis = useMemo(() => {
    return list.map((i) => moment(i.createdTime).format("YYYY-MM-DD"));
  }, [list]);

  const yAxis = useMemo(() => {
    return list.map((i) => i.cultureInfo?.deathCount);
  }, [list]);
  if (list.length > 0) {
    return (
      <EChartsReact
        theme={props.theme}
        style={props.style}
        option={{
          xAxis: {
            type: "category",
            data: xAxis,
          },
          backgroundColor: "transparent",
          tooltip: {
            trigger: "axis",
            formatter: (t: any) => {
              return `
            <div>
                <span style="display: block">死亡数：${
                  (t as any[])[0].value
                }</span>
                <span style="display: block">时间：${
                  (t as any[])[0].axisValue
                }</span>
            </div>
        `;
            },
          },
          grid: {
            left: 32,
            top: 16,
            right: 0,
            bottom: 32,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: yAxis,
              type: "line",
              smooth: true,
            },
          ],
        }}
      />
    );
  }
  return (
    <BeautifiedEmpty
      style={props.style}
      title="尚未录入数据"
      description="完成「日常检验」任务即可录入死亡率数据"
    />
  );
}
