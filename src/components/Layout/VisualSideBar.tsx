import React, { useContext, useMemo } from "react";
import { Divider, Space, Typography } from "antd";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import MassaSelectableItem from "../shared/MassaSelectableItem";
import { useQuery } from "../../hooks/useQuery";
import useQuickRouter from "../../hooks/useQuickRouter";
import useAuth from "../../utils/AuthContext";
import Flex from "../shared/Flex";
import VisualSelectableItem from "../shared/VisualSelectableItem";
import { MaterialCardDark } from "../shared/MaterialCard/MaterialCardDark";

function VisualSideBarItem(props: {
  iconName: string;
  title: string;
  activeItem: string;
  onClick?: () => any;
}) {
  const isSelected = useMemo(() => {
    return props.activeItem.includes(props.title);
  }, [props.activeItem]);
  return (
    <VisualSelectableItem
      style={{
        padding: 8,
        fontSize: 16,
        display: "flex",
        alignItems: "center",
      }}
      isSelected={isSelected}
      onClick={props.onClick}
    >
      <div style={{ width: "100%", margin: 0 }}>
        <i
          style={{ color: isSelected ? "#000" : "#fff", fontSize: 24 }}
          className={"massa " + props.iconName}
        />
        <span
          style={{
            color: isSelected ? "#000" : "#fff",
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          {props.title}
        </span>
      </div>
    </VisualSelectableItem>
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
    <VisualSelectableItem
      className={"AppLayoutSideBarItem LayoutSideBarSubItem"}
      style={{ background: "white" }}
      isSelected={props.activeItem.includes(props.title + "-" + props.subTitle)}
      onClick={props.onClick}
    >
      <span>{props.subTitle}</span>
    </VisualSelectableItem>
  );
}

export default function VisualSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const quickRouter = useQuickRouter();
  const auth = useAuth();

  const activeItem = useMemo(() => {
    console.log(location.pathname);
    if (location.pathname?.includes("/profile")) return "我的账户";
    if (location.pathname?.includes("/work/manage")) return "工作安排";
    // if (location.pathname?.includes('/performance/manage')) return '考评绩效';
    if (location.pathname?.includes("/cultureBatch/list")) return "生产管理";
    if (location.pathname?.includes("/user/manage")) return "员工管理";
    if (location.pathname?.includes("/material/manage")) return "生产资料";
    if (location.pathname?.includes("/pond/manage")) return "苗床管理";
    if (location.pathname?.includes("/cultureRule/detail")) return "养殖规则";
    if (location.pathname?.includes("/waterAlertRule/manage"))
      return "水质规则";
    if (location.pathname?.includes("/purchase/manage")) return "物料采购";
    if (location.pathname?.includes("/consume/manage")) return "物料领用";
    if (location.pathname?.includes("/workloadCost")) return "工作量统计";
    if (location.pathname?.includes("/production")) return "产量预测";
    if (location.pathname?.includes("/pondPortrait")) return "苗床画像";
    if (location.pathname?.includes("/diseaseRule/manage")) return "病害规则";

    if (location.pathname?.includes("/")) return "首页";
    return "";
  }, [location, query]);

  return (
    <>
      <div>
        <MaterialCardDark
          bodyStyle={{ padding: 0 }}
          className="dark-background"
          style={{ width: "100%" }}
        >
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"生产管理"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/cultureBatch/list")}
          />
          <VisualSideBarItem
            iconName={"massa-home"}
            title={"工作安排"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/work/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"物料采购"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/purchase/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"物料领用"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/consume/manage")}
          />
        </MaterialCardDark>
      </div>
      <div style={{ marginTop: 32 }}>
        <Typography.Title level={4}>数据分析</Typography.Title>
        <MaterialCardDark
          bodyStyle={{ padding: 0 }}
          className="dark-background"
          style={{ width: "100%" }}
        >
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"工作量统计"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/workloadCost")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"产量预测"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/production")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"苗床画像"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/pondPortrait")}
          />
        </MaterialCardDark>
      </div>
      <div style={{ marginTop: 32 }}>
        <Typography.Title level={4}>基础数据</Typography.Title>
        <MaterialCardDark
          bodyStyle={{ padding: 0 }}
          className="dark-background"
          style={{ width: "100%" }}
        >
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"员工管理"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/user/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"生产资料"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/material/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"苗床管理"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/pond/manage")}
          />
        </MaterialCardDark>
      </div>
      <div style={{ marginTop: 32 }}>
        <Typography.Title level={4}>规则配置</Typography.Title>
        <MaterialCardDark
          bodyStyle={{ padding: 0 }}
          className="dark-background"
          style={{ width: "100%" }}
        >
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"环境规则"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/waterAlertRule/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"病害规则"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/diseaseRule/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"养殖规则"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/cultureRule/detail/1")}
          />
        </MaterialCardDark>
      </div>
    </>
  );
}
