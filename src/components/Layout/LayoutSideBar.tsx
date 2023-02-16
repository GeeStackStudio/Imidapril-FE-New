import React, { useContext, useMemo } from "react";
import { Divider, Space, Typography } from "antd";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import MassaSelectableItem from "../shared/MassaSelectableItem";
import { useQuery } from "../../hooks/useQuery";
import useQuickRouter from "../../hooks/useQuickRouter";
import useAuth from "../../utils/AuthContext";
import Flex from "../shared/Flex";

function LayoutSideBarItem(props: {
  iconName: string;
  title: string;
  activeItem: string;
  onClick?: () => any;
}) {
  return (
    <MassaSelectableItem
      className={"AppLayoutSideBarItem"}
      isSelected={props.activeItem.includes(props.title)}
      onClick={props.onClick}
    >
      <i className={"massa " + props.iconName} />
      <span>{props.title}</span>
    </MassaSelectableItem>
  );
}

function LayoutSideBarSubItem(props: {
  title: string;
  subTitle: string;
  activeItem: string;
  onClick?: () => any;
}) {
  if (!props.activeItem.includes(props.title)) return <div />;
  return (
    <MassaSelectableItem
      className={"AppLayoutSideBarItem LayoutSideBarSubItem"}
      style={{ background: "white" }}
      isSelected={props.activeItem.includes(props.title + "-" + props.subTitle)}
      onClick={props.onClick}
    >
      <span>{props.subTitle}</span>
    </MassaSelectableItem>
  );
}

export default function LayoutSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const quickRouter = useQuickRouter();
  const auth = useAuth();

  const activeItem = useMemo(() => {
    if (location.pathname?.includes("/profile")) return "我的账户";
    if (location.pathname?.includes("/work/manage")) return "工作安排";
    if (location.pathname?.includes("/performance/manage")) return "考评绩效";
    if (location.pathname?.includes("/cultureBatch/list")) return "养殖管理";

    if (location.pathname?.includes("/")) return "首页";
    return "";
  }, [location, query]);

  return (
    <div className={"AppLayoutSideBar"}>
      <Flex direction={"row"} style={{ padding: 20 }} justify={"center"}>
        <Typography.Text style={{ fontSize: 22, color: "#fff" }}>
          时粼水产养殖系统
        </Typography.Text>
      </Flex>
      <Space style={{ display: "block", paddingLeft: 20, marginTop: 20 }}>
        <div>
          <Typography.Title style={{ color: "#efefef" }} level={5}>
            CorleoneYang
          </Typography.Title>
          <Typography.Text type={"secondary"} style={{ color: "#efefef" }}>
            cy@geestack.com
          </Typography.Text>
        </div>
      </Space>
      <div className={"AppLayoutSideBarItems"}>
        <LayoutSideBarItem
          iconName={"massa-monitor"}
          title={"养殖管理"}
          activeItem={activeItem}
          onClick={() => navigate("/cultureBatch/list")}
        />
        <LayoutSideBarItem
          iconName={"massa-home"}
          title={"工作安排"}
          activeItem={activeItem}
          onClick={() => navigate("/work/manage")}
        />
        {/*<LayoutSideBarItem iconName={'massa-monitor'} title={'考评绩效'} activeItem={activeItem} onClick={() => history.push('/performance/manage')} />*/}
        <LayoutSideBarItem
          iconName={"massa-user"}
          title={"成本分析"}
          activeItem={activeItem}
          onClick={() => navigate("/performance/manage")}
        />
        <LayoutSideBarItem
          iconName={"massa-home"}
          title={"库存管理"}
          activeItem={activeItem}
          onClick={() => navigate("/5")}
        />
        <LayoutSideBarItem
          iconName={"massa-user"}
          title={"我的账户"}
          activeItem={activeItem}
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}
