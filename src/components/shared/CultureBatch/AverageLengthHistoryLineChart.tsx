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

export function AverageLengthHistory(props: {
  cultureBatchId: number;
  style?: CSSProperties;
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
          i.cultureInfo?.averageLength !== undefined &&
          i.cultureInfo?.averageLength !== null
      ) ?? []
    );
  }, [searchHook.data]);

  const xAxis = useMemo(() => {
    return list.map((i) => moment(i.createdTime).format("YYYY-MM-DD"));
  }, [list]);

  const averageLengthAxis = useMemo(() => {
    return list.map((i) => i.cultureInfo?.averageLength);
  }, [list]);
  const averageWeightAxis = useMemo(() => {
    return list.map((i) => i.cultureInfo?.averageWeight);
  }, [list]);
  if (list.length > 0) {
    return (
      <EChartsReact
        style={props.style}
        option={{
          color: ["rgba(250, 167, 37,1)", "rgba(58, 166, 166,1)"],
          tooltip: {
            trigger: "axis",
            formatter: (t: any) => {
              return `
            <div>
                <span style="display: block">平均体重：${
                  (t as any[])[0].value
                } g</span>
                <span style="display: block">平均体长：${
                  (t as any[])[1].value
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
            data: ["平均体长", "平均体重"],
            animation: true,
          },
          series: [
            {
              name: "平均体长",
              data: averageLengthAxis,
              type: "line",
              smooth: true,
            },
            {
              name: "平均体重",
              data: averageWeightAxis,
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
      description="完成「日常检验」任务即可录入此数据"
    />
  );
}
