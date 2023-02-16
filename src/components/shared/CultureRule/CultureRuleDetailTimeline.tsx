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

export interface ICultureRuleDetailTimelineItem {
  date: number;
  id?: number;
  name?: string;
  hour?: number | null;
  minute?: number | null;
  isFullDay: boolean;
  ruleDetail?: CultureRuleDetailDto;
}

export function handleCultureRuleDetail(
  cultureRuleDetails: CultureRuleDetailDto[]
) {
  const localData: Array<Array<ICultureRuleDetailTimelineItem>> = [];
  console.log(`totalCount: ${cultureRuleDetails.length}`);
  for (const ruleDetail of cultureRuleDetails) {
    console.log(`current: ${ruleDetail.id}`);
    const rows: Array<ICultureRuleDetailTimelineItem> = [];
    if (
      ruleDetail.daysFromStart === undefined ||
      ruleDetail.daysFromStart === null
    ) {
      continue;
    }
    console.log("----");
    if (ruleDetail.repeatType === RepeatType.不重复) {
      console.log("11111");
      rows.push({
        date: ruleDetail.daysFromStart,
        id: ruleDetail.id,
        name: ruleDetail.type,
        hour: ruleDetail.preferHour,
        minute: ruleDetail.preferTime,
        ruleDetail: ruleDetail,
        isFullDay: ruleDetail.isFullDay ?? false,
      });
    }
    if (ruleDetail.repeatType === RepeatType.天) {
      console.log("2222");
      for (
        let currentDate = ruleDetail.daysFromStart ?? 1;
        currentDate <= 40;
        currentDate += ruleDetail.repeatInterval ?? 1
      ) {
        rows.push({
          date: currentDate,
          id: ruleDetail.id,
          name: ruleDetail.type,
          hour: ruleDetail.preferHour,
          minute: ruleDetail.preferTime,
          ruleDetail: ruleDetail,
          isFullDay: ruleDetail.isFullDay ?? false,
        });
      }
    }
    if (ruleDetail.repeatType === RepeatType.小时) {
      console.log("2222");
      console.log(ruleDetail.id);
      let currentDate = 1;
      let currentHour = ruleDetail.preferHour ?? 0;
      let isNextDay = false;
      while (currentDate < 40) {
        isNextDay = currentHour + (ruleDetail.repeatInterval ?? 1) >= 24;
        currentDate = isNextDay ? currentDate + 1 : currentDate;
        currentHour = (currentHour + (ruleDetail.repeatInterval ?? 1)) % 24;
        rows.push({
          date: currentDate,
          id: ruleDetail.id,
          name: ruleDetail.type,
          hour: currentHour,
          minute: ruleDetail.preferTime,
          ruleDetail: ruleDetail,
          isFullDay: ruleDetail.isFullDay ?? false,
        });
      }
    }
    console.log("end");
    localData.push(rows);
  }
  return localData;
}

export function CultureRuleDetailTimeline(props: {
  cultureRuleId?: number;
  width?: number;
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
        <div style={{ width: props.width ?? 800 }}>
          <Timeline mode="alternate" style={props.style}>
            {dateArray.map((i, index) =>
              timeLineItems[i]?.map((i, innerIndex) => {
                return (
                  <Timeline.Item
                    key={`${index}-${innerIndex}-${i.id}`}
                    style={{ marginTop: 2 }}
                  >
                    <Flex direction={"column"}>
                      <Typography.Title level={5} type={"secondary"}>
                        第 {index} 天
                        <Divider type="vertical" />
                        {!i.isFullDay ? (
                          <Tag color="#13c2c2">
                            {i.hour?.toString().padStart(2, "0")} :{" "}
                            {i.minute?.toString().padStart(2, "0")}
                          </Tag>
                        ) : (
                          <Tag color="#006d75">全天任务</Tag>
                        )}
                        <Divider type="vertical" />
                        <WorkScheduleTypeTag type={i.ruleDetail?.type} />
                      </Typography.Title>
                      {i.ruleDetail?.description && (
                        <Card size="small" key={innerIndex}>
                          <Typography.Text>
                            {i.ruleDetail?.description ?? "无备注"}
                          </Typography.Text>
                        </Card>
                      )}
                    </Flex>
                  </Timeline.Item>
                );
              })
            )}
          </Timeline>
        </div>
      </Spin>
    );
  return <Empty />;
}
