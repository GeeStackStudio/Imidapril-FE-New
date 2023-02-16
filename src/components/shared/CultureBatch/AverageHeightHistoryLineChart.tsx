import EChartsReact from "echarts-for-react";
import React, { CSSProperties, useMemo } from "react";
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

export function AverageHeightHistory(props: {
  cultureBatchId: number;
  style?: CSSProperties;
  theme?: "default" | "dark";
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
    const res =
      searchHook.data?.list?.filter(
        (i) =>
          i.cultureInfo?.averageHeight !== undefined &&
          i.cultureInfo?.averageHeight !== null
      ) ?? [];
    return res;
  }, [searchHook.data]);

  const xAxis = useMemo(() => {
    return list.map((i) => moment(i.createdTime).format("YYYY-MM-DD"));
  }, [list]);

  const averageHeightAxis = useMemo(() => {
    return list.map((i) => i.cultureInfo?.averageHeight);
  }, [list]);

  return (
    <div>
      {list.length > 0 && (
        <EChartsReact
          style={props.style}
          theme={props.theme}
          option={{
            color: ["rgba(58, 166, 166,1)", "rgba(250, 167, 37,1)"],
            backgroundColor: "transparent",
            tooltip: {
              trigger: "axis",
              formatter: (t: any) => {
                return `
                <div>
                    <span style="display: block">平均体长：${
                      (t as any[])[0].value
                    } mm</span>
                    <span style="display: block">时间：${
                      (t as any[])[0].axisValue
                    }</span>
                </div>
              `;
              },
            },
            xAxis: {
              type: "category",
              data: xAxis,
            },
            grid: {
              left: 32,
              top: 32,
              right: 0,
              bottom: 32,
            },
            yAxis: {
              type: "value",
            },
            legend: {
              data: ["平均体长"],
              animation: true,
            },
            series: [
              {
                name: "平均体长",
                data: averageHeightAxis,
                type: "line",
                smooth: true,
              },
            ],
          }}
        />
      )}
      {list.length === 0 && (
        <BeautifiedEmpty
          title="尚未录入数据"
          description="请先进行记录生长数据"
        />
      )}
    </div>
  );
}
