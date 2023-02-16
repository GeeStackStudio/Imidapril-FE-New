import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { message, Typography } from "antd";
import { ReactSortable, Sortable, Store } from "react-sortablejs";
import { useOpenApiFpRequest } from "../../../Http/useOpenApiRequest";
import {
  CultureRuleApi,
  CultureRulePeriodApi,
  CultureRulePeriodDto,
} from "../../../scaffold";
import { useParams } from "react-router-dom";
import { useBoolean } from "react-hanger";
import { useAntdTable, useMount } from "ahooks";
import "./CultureRulePeriodSortableCard.less";
import Flex from "../Flex";
import { CultureRulePeriodCardItem } from "./CultureRulePeriodCardItem";

export interface CultureRulePeriodSortableCardRef {
  refresh: () => any;
}
function Component(
  props: {
    id: number;
    showGlobal?: boolean;
    onItemClick?: (row?: CultureRulePeriodDto) => any;
    onEditClick?: (row?: CultureRulePeriodDto) => any;
    onRemoveClick?: (row?: CultureRulePeriodDto) => any;
    style?: CSSProperties;
  },
  ref: React.Ref<CultureRulePeriodSortableCardRef>
) {
  const isSortingRef = useRef(false);
  const [value, setValue] = useState<CultureRulePeriodDto[]>([]);
  const findHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleFindGet
  );
  const updatePeriodSortHook = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleUpdatePeriodSortPost
  );
  const periodList = useOpenApiFpRequest(
    CultureRuleApi,
    CultureRuleApi.prototype.cultureRuleListPeriodGet
  );
  function refresh() {
    findHook.requestSync({
      id: props.id,
    });
    periodList
      .request({
        id: props.id,
      })
      .then((r) => {
        setValue(r ?? []);
      })
      .catch((e) => message.error(e.message));
  }
  useEffect(() => {
    refresh();
  }, [props.id]);

  useImperativeHandle(ref, () => ({
    refresh,
  }));

  return (
    <div className="CultureRulePeriodSortableCard">
      {props.showGlobal && (
        <CultureRulePeriodCardItem
          className={"dark-background"}
          onItemClick={() => {
            props.onItemClick && props.onItemClick();
          }}
          item={{
            name: "全局规则",
            description: "此处规则将会应用于整个养殖批次",
          }}
        />
      )}

      <ReactSortable<{ id: number; name: string; data: CultureRulePeriodDto }>
        key={1}
        style={props.style}
        animation={200}
        onUpdate={() => (isSortingRef.current = true)}
        list={value.map((i) => ({
          id: Number(i.id),
          name: String(i.name),
          data: i,
        }))}
        setList={(v, _, store) => {
          if (!store.dragging) return;
          if (!isSortingRef.current) return;
          updatePeriodSortHook
            .request({
              cultureRuleUpdatePeriodSortParams: {
                id: props.id,
                cultureRulePeriodIdSort: v.map((i) => i.id),
              },
            })
            .then(() => refresh())
            .catch((e) => message.error(e.message));
        }}
      >
        {value.map((item) => (
          <CultureRulePeriodCardItem
            className={"dark-background"}
            onItemClick={() => {
              props.onItemClick && props.onItemClick(item);
            }}
            onEditClick={
              props.onEditClick
                ? () => {
                    props.onEditClick && props.onEditClick(item);
                  }
                : undefined
            }
            onRemoveClick={
              props.onRemoveClick
                ? () => {
                    props.onRemoveClick && props.onRemoveClick(item);
                  }
                : undefined
            }
            key={item.id}
            item={{
              name: item.name,
              description: item.description,
            }}
          />
        ))}
      </ReactSortable>
    </div>
  );
}

export const CultureRulePeriodSortableCard = forwardRef(Component);
