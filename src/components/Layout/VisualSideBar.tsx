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
    if (location.pathname?.includes("/profile")) return "????????????";
    if (location.pathname?.includes("/work/manage")) return "????????????";
    // if (location.pathname?.includes('/performance/manage')) return '????????????';
    if (location.pathname?.includes("/cultureBatch/list")) return "????????????";
    if (location.pathname?.includes("/user/manage")) return "????????????";
    if (location.pathname?.includes("/material/manage")) return "????????????";
    if (location.pathname?.includes("/pond/manage")) return "????????????";
    if (location.pathname?.includes("/cultureRule/detail")) return "????????????";
    if (location.pathname?.includes("/waterAlertRule/manage"))
      return "????????????";
    if (location.pathname?.includes("/purchase/manage")) return "????????????";
    if (location.pathname?.includes("/consume/manage")) return "????????????";
    if (location.pathname?.includes("/workloadCost")) return "???????????????";
    if (location.pathname?.includes("/production")) return "????????????";
    if (location.pathname?.includes("/pondPortrait")) return "????????????";
    if (location.pathname?.includes("/diseaseRule/manage")) return "????????????";

    if (location.pathname?.includes("/")) return "??????";
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
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/cultureBatch/list")}
          />
          <VisualSideBarItem
            iconName={"massa-home"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/work/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/purchase/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/consume/manage")}
          />
        </MaterialCardDark>
      </div>
      <div style={{ marginTop: 32 }}>
        <Typography.Title level={4}>????????????</Typography.Title>
        <MaterialCardDark
          bodyStyle={{ padding: 0 }}
          className="dark-background"
          style={{ width: "100%" }}
        >
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"???????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/workloadCost")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/production")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/pondPortrait")}
          />
        </MaterialCardDark>
      </div>
      <div style={{ marginTop: 32 }}>
        <Typography.Title level={4}>????????????</Typography.Title>
        <MaterialCardDark
          bodyStyle={{ padding: 0 }}
          className="dark-background"
          style={{ width: "100%" }}
        >
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/user/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/material/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/pond/manage")}
          />
        </MaterialCardDark>
      </div>
      <div style={{ marginTop: 32 }}>
        <Typography.Title level={4}>????????????</Typography.Title>
        <MaterialCardDark
          bodyStyle={{ padding: 0 }}
          className="dark-background"
          style={{ width: "100%" }}
        >
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/waterAlertRule/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/diseaseRule/manage")}
          />
          <VisualSideBarItem
            iconName={"massa-monitor"}
            title={"????????????"}
            activeItem={activeItem}
            onClick={() => navigate("/visual/app/cultureRule/detail/1")}
          />
        </MaterialCardDark>
      </div>
    </>
  );
}
