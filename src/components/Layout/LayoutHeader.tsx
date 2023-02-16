import React from "react";
import { Avatar, Button, Divider, Popover, Space, Typography } from "antd";
import { DashboardOutlined, NotificationTwoTone } from "@ant-design/icons";
import logo from "../../assets/logo-v.png";
import useAuth from "../../utils/AuthContext";
import MassaSelectableItem from "../shared/MassaSelectableItem";
import useQuickRouter from "../../hooks/useQuickRouter";
import Flex from "../shared/Flex";
import "../../styles/appLayout.less";
import moment from "moment";
export default function LayoutHeader(props: { children?: any }) {
  const quickRouter = useQuickRouter();
  return (
    <div className={"AppLayoutHeader"}>
      <div className={"AppLayoutHeaderMain"}>{props.children}</div>
      <div style={{ flexShrink: 0 }}>
        <Popover
          content={
            <div>
              <MassaSelectableItem onClick={quickRouter.profileIndex}>
                个人中心
              </MassaSelectableItem>
              <MassaSelectableItem>注销</MassaSelectableItem>
            </div>
          }
        >
          <Flex direction={"row"} align={"center"}>
            <Typography.Text>
              {moment().format("YYYY 年 MM 月 DD 日")}
            </Typography.Text>
            <Divider type={"vertical"} />
            <Flex align={"center"}>
              <Avatar
                shape={"circle"}
                src="https://geestack-public.oss-cn-shanghai.aliyuncs.com/captopril/avatar.JPG"
              ></Avatar>
              <Typography.Text style={{ marginLeft: 16 }}>
                CorleoneYang
              </Typography.Text>
            </Flex>
          </Flex>
        </Popover>
      </div>
    </div>
  );
}
