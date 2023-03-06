import { CultureRulePeriodDto } from "../../../scaffold";
import Flex from "../Flex";
import { Button, Typography } from "antd";
import React from "react";
import "./CultureRulePeriodCardItem.less";
import { useBoolean } from "react-hanger";
import { ProCard } from "@ant-design/pro-components";
export function CultureRulePeriodCardItem(props: {
  item: { name?: string | null; description?: string | null };
  className?: string;
  onItemClick?: () => any;
  onEditClick?: () => any;
  onRemoveClick?: () => any;
}) {
  const isShowOperate = useBoolean(false);
  return (
    <ProCard
      bodyStyle={{ padding: 0 }}
      className={`CultureRulePeriodCardItem ${props.className ?? ""}`}
      onMouseEnter={isShowOperate.setTrue}
      onMouseLeave={isShowOperate.setFalse}
      onClick={() => props.onItemClick && props.onItemClick()}
    >
      <Flex direction={"row"} justify={"space-between"}>
        <Flex direction={"column"} className="item">
          <Flex
            direction={"row"}
            align={"center"}
            style={{ flex: 1, height: 100, overflow: "hidden" }}
          >
            <Typography.Text strong>{props.item.name}</Typography.Text>
            {isShowOperate.value && (
              <Button.Group>
                {props.onEditClick && (
                  <Button
                    size={"small"}
                    type={"link"}
                    onClick={() => props.onEditClick && props.onEditClick()}
                  >
                    编辑
                  </Button>
                )}
                {props.onRemoveClick && (
                  <Button
                    size={"small"}
                    type={"link"}
                    danger
                    onClick={() => props.onRemoveClick && props.onRemoveClick()}
                  >
                    删除
                  </Button>
                )}
              </Button.Group>
            )}
          </Flex>
          <Typography.Text type={"secondary"}>
            {props.item.description}
          </Typography.Text>
        </Flex>
      </Flex>
    </ProCard>
  );
}
