import moment, { Moment } from "moment";
import FullCalendar, {
  CalendarApi,
  EventClickArg,
  EventInput,
} from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import zhLocale from "@fullcalendar/core/locales/zh-cn";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  WorkScheduleApi,
  WorkScheduleDto,
  WorkScheduleStatus,
} from "../../../scaffold";
import { useAxios } from "../../../Http/AxiosProvider";
import { DateInput, Identity } from "@fullcalendar/common";
import { MaterialCardDark } from "../MaterialCard/MaterialCardDark";
import { Card } from "antd";
export interface WorkScheduleCalenderRef {
  refresh?: () => any;
}
export const WorkScheduleCalender = forwardRef(function WorkScheduleCalender(
  props: {
    onSelectDate?: (date: Moment) => any;
    cultureBatchId?: number;
    pondId?: number;
    pondGroupId?: number;
    onSelectEvent?: (w: WorkScheduleDto) => any;
    height?: number;
    initialDate?: string;
  },
  ref: React.Ref<WorkScheduleCalenderRef>
) {
  const axios = useAxios();
  const calenderRef = useRef();
  const events = useCallback(
    (
      info: any,
      successCallback: any,
      failureCallback: any
    ): void | PromiseLike<EventInput[]> => {
      const api = new WorkScheduleApi(
        undefined,
        axios.axiosConfig.baseURL,
        axios.instance
      );
      api
        .workScheduleSearchGet(
          {
            pi: 1,
            ps: 999,
            scheduleTimeFrom: info.startStr,
            scheduleTimeTo: info.endStr,
            cultureBatchId: props.cultureBatchId,
            pondId: props.pondId,
            pondGroupId: props.pondGroupId,
          },
          {}
        )
        .then((r) => {
          const list = r.data.list?.map((i) => {
            let color;
            if (i.status === WorkScheduleStatus.已安排) {
              color = "#08979c";
            }
            if (!i.isReadyToFinish) {
              color = "#f5222d";
            }
            if (i.status === WorkScheduleStatus.已完成) {
              color = "#389e0d";
            }
            return {
              title: String(i.name),
              start: i.scheduleTime,
              end: i.scheduleEndTime ?? undefined,
              extendedProps: i,
              color,
              allDay: i.isFullDay,
            };
          });
          successCallback(list ?? []);
        });
    },
    [props.cultureBatchId, props.pondGroupId, props.pondId]
  );

  const eventClick = useCallback((e: EventClickArg) => {
    props.onSelectEvent && props.onSelectEvent(e.event.extendedProps);
  }, []);

  const dateClick = useCallback((e: DateClickArg) => {
    props.onSelectDate && props.onSelectDate(moment(e.date));
  }, []);
  useImperativeHandle(ref, () => ({
    refresh: () => {
      if (calenderRef.current) {
        const calendarApi: CalendarApi = (calenderRef.current as any).getApi();
        calendarApi.refetchEvents();
      }
    },
  }));

  return (
    <FullCalendar
      ref={calenderRef as any}
      height={props.height}
      events={events}
      dayMaxEventRows={4}
      selectable={true}
      initialDate={props.initialDate}
      eventClick={eventClick}
      dateClick={dateClick}
      locale={zhLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      eventTextColor="#fff"
      eventDisplay={"block"}
    />
  );
});
