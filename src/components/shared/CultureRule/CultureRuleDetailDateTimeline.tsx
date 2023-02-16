import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import { CultureRuleDetailApi, CultureRuleDetailDto } from "../../../scaffold";
import { Card, Divider, message, Spin, Tag, Timeline, Typography } from "antd";
import {
  handleCultureRuleDetail,
  ICultureRuleDetailTimelineItem,
} from "./CultureRuleDetailTimeline";
import Flex from "../Flex";
import { WorkScheduleTypeTag } from "../WorkSchedule/WorkScheduleTypeTag";
import { WorkScheduleStatusTag } from "../WorkSchedule/WorkScheduleStatusTag";
import moment, { Moment } from "moment";
import { MaterialCardDark } from "../MaterialCard/MaterialCardDark";
export function CultureRuleDetailDateTimeline(props: {
  cultureRuleId?: number;
  width?: number;
  style?: CSSProperties;
  cultureRulePeriodId?: number;
  dateFrom?: number;
  dateFromMoment?: Moment;
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
  const dateFromMoment = useMemo(() => {
    if (props.dateFromMoment) {
      return moment(props.dateFromMoment);
    }
  }, [props.dateFromMoment]);
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
      console.log(list);
      const res = handleCultureRuleDetail(list);
      console.log(res);
      setData(res);
    } catch (e) {
      setData([]);
      message.error(e.message);
    }
  }

  useEffect(() => {
    if (props.cultureRuleId) {
      refresh();
    }
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
      return new Array(props.dateTo - props.dateFrom)
        .fill(0)
        .map((i, index) => (props.dateFrom ?? 0) + index);
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
          <Timeline style={props.style}>
            {dateArray.map((i, index) => (
              <Timeline.Item key={`${index}`} style={{ marginTop: 2 }}>
                <Typography.Title level={5}>
                  {moment(dateFromMoment)
                    ?.add(index, "days")
                    .format("YYYY-MM-DD")}
                  {moment(dateFromMoment)?.add(index, "days").format("ddd")}
                </Typography.Title>
                <Flex wrap={"wrap"}>
                  {timeLineItems[i]?.map((i, innerIndex) => {
                    return (
                      <MaterialCardDark
                        size="small"
                        style={{
                          margin: 8,
                          width: 180,
                          borderColor: "#dadada",
                        }}
                        key={`${index}-${innerIndex}-${i.id}`}
                      >
                        <Flex align={"center"}>
                          <Typography.Text strong style={{ display: "block" }}>
                            {i.ruleDetail?.type}
                          </Typography.Text>
                          <Divider type={"vertical"} />
                          {i.isFullDay ? (
                            <Tag color="#974314" style={{ marginLeft: 8 }}>
                              全天任务
                            </Tag>
                          ) : (
                            <Tag style={{ marginLeft: 8 }}>
                              {i.hour?.toString().padStart(2, "0")} :{" "}
                              {i.minute?.toString().padStart(2, "0")}
                            </Tag>
                          )}
                        </Flex>
                        {i.ruleDetail?.description && (
                          <Typography.Paragraph>
                            {i.ruleDetail?.description}
                          </Typography.Paragraph>
                        )}
                      </MaterialCardDark>
                    );
                  })}
                </Flex>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </Spin>
    );
  return <div />;
}
