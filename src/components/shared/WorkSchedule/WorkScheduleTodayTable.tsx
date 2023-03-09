import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import {
  WorkScheduleApi,
  WorkScheduleDto,
  WorkScheduleStatus,
} from "../../../scaffold";
import { useAntdTable } from "ahooks";
import { Button, message, Table, Typography } from "antd";
import moment from "moment";
import { UseZebra } from "../../../utils/UseZebra";
import { WorkScheduleTypeTag } from "./WorkScheduleTypeTag";
import { WorkScheduleStatusTag } from "./WorkScheduleStatusTag";
import { WorkScheduleScheduleTime } from "./WorkScheduleScheduleTime";
import UserAvatar from "../../User/UserAvatar";
import { ITableRef } from "../ITableRef";
export type IWorkScheduleTodayTableRef = ITableRef;
export const WorkScheduleTodayTable = forwardRef(
  function WorkScheduleTodayTable(
    props: { cultureBatchId?: number },
    ref: React.Ref<IWorkScheduleTodayTableRef>
  ) {
    const searchHook = useOpenApiFpRequest(
      WorkScheduleApi,
      WorkScheduleApi.prototype.workScheduleSearchGet
    );
    const { tableProps, search, loading } = useAntdTable(
      (params) =>
        searchHook.request({
          pi: params.current,
          ps: params.pageSize,
          cultureBatchId: props.cultureBatchId,
          scheduleTimeFrom: moment()
            .startOf("date")
            .format("YYYY-MM-DD HH:mm:ss"),
          scheduleTimeTo: moment().endOf("date").format("YYYY-MM-DD HH:mm:ss"),
        }) as any,
      {
        onError: (e) => message.error(e.message),
      }
    );
    useImperativeHandle<IWorkScheduleTodayTableRef, IWorkScheduleTodayTableRef>(
      ref,
      () => ({
        refresh: () => {
          search.submit();
        },
      })
    );
    useEffect(() => {
      search.submit();
    }, [props.cultureBatchId]);

    return (
      <Table<WorkScheduleDto> {...tableProps} pagination={false} rowKey={"id"}>
        <Table.Column<WorkScheduleDto> title="任务名称" dataIndex="name" />
        <Table.Column<WorkScheduleDto>
          title="任务类型"
          dataIndex={["type"]}
          render={(_, row) => <WorkScheduleTypeTag type={_} />}
        />
        {/*<Table.Column<WorkScheduleDto> title="任务状态" dataIndex={['status']} render={(_, row) => <WorkScheduleStatusTag workSchedule={row} />} />*/}
        {/*<Table.Column<WorkScheduleDto> title="养殖批次" dataIndex={['cultureBatch', 'code']} />*/}
        <Table.Column<WorkScheduleDto>
          title="养殖人员"
          dataIndex={["worker", "name"]}
          render={(txt, row) =>
            row.worker && (
              <>
                <UserAvatar user={row.worker} />
                <Typography.Text style={{ marginLeft: 8 }}>
                  {row.worker.name}
                </Typography.Text>
              </>
            )
          }
        />
        <Table.Column<WorkScheduleDto>
          title="计划时间"
          dataIndex={["scheduleTime"]}
          render={(_, row) => <WorkScheduleScheduleTime workSchedule={row} />}
        />
        <Table.Column<WorkScheduleDto>
          title="状态"
          dataIndex={"status"}
          render={(_, row) => <WorkScheduleStatusTag workSchedule={row} />}
        />
        <Table.Column<WorkScheduleDto>
          title="任务备注"
          dataIndex="description"
          render={(_, row) => (
            <Typography.Text ellipsis={true} style={{ width: 100 }}>
              {_}
            </Typography.Text>
          )}
        />
      </Table>
    );
  }
);
