import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import {
  message,
  Typography,
  Steps,
  Tag,
  Card,
  Timeline,
  Divider,
  Descriptions,
  Spin,
  Empty,
} from "antd";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import {
  CultureRuleDetailApi,
  CultureRuleDetailDto,
  RepeatType,
  WorkType,
} from "../../../scaffold";
import { useMount } from "ahooks";
import Flex from "../Flex";
import { WorkScheduleTypeTag } from "../WorkSchedule/WorkScheduleTypeTag";
import {
  handleCultureRuleDetail,
  ICultureRuleDetailTimelineItem,
} from "./CultureRuleDetailTimeline";
import { MaterialCardDark } from "../MaterialCard/MaterialCardDark";

export function CultureRuleDetailTimeCalender(props: {
  cultureRuleId?: number;
  width?: number | string;
  style?: CSSProperties;
  cultureRulePeriodId?: number;
  dateFrom?: number;
  dateTo?: number;
}) {
  const listCultureRuleDetailHook = useOpenApiFpRequest(
    CultureRuleDetailApi,
    CultureRuleDetailApi.prototype.cultureRuleDetailSearchGet
  );
  const listGlobalCultureRuleDetailHook = useOpenApiFpRequest(
    CultureRuleDetailApi,
    CultureRuleDetailApi.prototype.cultureRuleDetailSearchGet
  );
  const [data, setData] = useState<
    Array<Array<ICultureRuleDetailTimelineItem>>
  >([]);

  async function refresh() {
    try {
      let list: CultureRuleDetailDto[] = [];
      const globalResult = await listGlobalCultureRuleDetailHook.request({
        pi: 1,
        ps: 999,
        isGlobalRule: true,
        cultureRuleId: props.cultureRuleId,
      });
      list = list.concat(globalResult.list ?? []);
      if (props.cultureRulePeriodId) {
        const periodResult = await listCultureRuleDetailHook.request({
          pi: 1,
          ps: 999,
          cultureRulePeriodId: props.cultureRulePeriodId,
        });
        list = list.concat(periodResult.list ?? []);
      }
      const res = handleCultureRuleDetail(list);
      setData(res);
    } catch (e) {
      setData([]);
      message.error(e.message);
    }
  }

  useMount(async () => {
    refresh();
  });

  useEffect(() => {
    refresh();
  }, [props.cultureRulePeriodId, props.cultureRuleId]);

  const timeLineItems = useMemo(() => {
    const res: Array<ICultureRuleDetailTimelineItem[]> = new Array(40);
    for (const datum of data) {
      for (const timelineItem of datum) {
        if (!res[timelineItem.date]) {
          res[timelineItem.date] = [timelineItem];
        } else {
          res[timelineItem.date].push(timelineItem);
        }
      }
    }
    return res;
  }, [data]);

  const dateArray = useMemo(() => {
    if (
      props.dateTo !== null &&
      props.dateTo !== undefined &&
      props.dateFrom !== undefined &&
      props.dateFrom !== null
    ) {
      return new Array(40)
        .fill(0)
        .map((i, index) => index)
        .filter(
          (i, index) => index <= props.dateTo! && index >= props.dateFrom!
        );
    } else {
      return new Array(40).fill(0).map((i, index) => index);
    }
  }, [props.dateTo, props.dateFrom]);
  if (timeLineItems.length > 0)
    return (
      <Spin
        spinning={
          listCultureRuleDetailHook.loading ||
          listGlobalCultureRuleDetailHook.loading
        }
        tip="加载中"
      >
        <Flex wrap={"wrap"} style={{ width: props.width }}>
          {dateArray.map((i, index) => (
            <MaterialCardDark
              bodyStyle={{ padding: 4 }}
              key={i}
              style={{
                border: "1px solid #eaeaea",
                width: 150,
                minHeight: 120,
              }}
            >
              <Flex direction={"column"}>
                <Typography.Text>第 {index} 天</Typography.Text>
                {timeLineItems[i]?.map((i, innerIndex) => {
                  return (
                    <div
                      key={`${index}-${innerIndex}-${i.id}`}
                      style={{
                        marginTop: 2,
                        background: "rgb(11,114,185)",
                        borderRadius: 6,
                        paddingLeft: 8,
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>
                        {`${i.isFullDay && "[全天]"}`} {i.name}
                      </span>
                    </div>
                  );
                })}
              </Flex>
            </MaterialCardDark>
          ))}
        </Flex>
      </Spin>
    );
  return <Empty />;
}
