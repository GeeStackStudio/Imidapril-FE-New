import React, { useContext, useEffect } from "react";
import Flex from "./Flex";
import { useNavigate } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/all";
import { useBoolean } from "react-hanger";
import { UnityContext } from "../../utils/UnityContext";
import { useUnity } from "../../hooks/useUnity";

export function VisualTopBar() {
  const navigate = useNavigate();
  const unityIframe = useContext(UnityContext);
  const unity = useUnity(unityIframe.iframe);
  const isLeftShow = useBoolean(false);
  return (
    <Flex
      direction={"column"}
      className="VisualTopBar"
      style={{
        width: "100%",
        display: "flex",
        zIndex: 3,
        position: "relative",
      }}
    >
      <img
        style={{ width: "100%", zIndex: 2, height: 55 }}
        alt="top"
        src="https://imidapril.oss-cn-shanghai.aliyuncs.com/title-bar-new.png"
      />
      <Flex
        align={"center"}
        justify={"center"}
        direction={"row"}
        style={{
          position: "relative",
          margin: "-54px auto",
          zIndex: 3,
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/visual/app/cultureBatch/list");
          unity.sendMessage("Scripts", "NavigateOverview");
        }}
      >
        <span style={{ fontSize: 28, color: "#fff" }}>崇明智能植物工厂</span>
      </Flex>
      <Flex
        style={{ position: "fixed", top: 6, zIndex: 3, left: 20, width: 800 }}
      >
        <Flex
          direction={"column"}
          className={`top-menu ${
            location.href.includes("/visual/irrigation")
              ? "top-menu-active"
              : undefined
          }`}
          onClick={() => {
            navigate("/visual/irrigation");
          }}
        >
          水肥一体灌溉系统
          {location.href.includes("/visual/irrigation") && (
            <div
              style={{
                height: 3,
                bottom: 0,
                left: 0,
                width: 70,
                background: "linear-gradient(red, yellow, blue, orange)",
              }}
            ></div>
          )}
        </Flex>
        <Flex
          direction={"column"}
          onClick={() => {
            navigate("/visual/windControl");
          }}
          className={`top-menu ${
            location.href.includes("/visual/windControl")
              ? "top-menu-active"
              : undefined
          }`}
        >
          通⻛控制系统
          {location.href.includes("/visual/windControl") && (
            <div
              style={{
                height: 3,
                bottom: 0,
                left: 0,
                width: 70,
                background: "linear-gradient(red, yellow, blue, orange)",
              }}
            ></div>
          )}
        </Flex>
        <Flex
          direction={"column"}
          onClick={() => {
            navigate("/visual/light");
          }}
          className={`top-menu ${
            location.href.includes("/visual/light")
              ? "top-menu-active"
              : undefined
          }`}
        >
          光照控制系统
          {location.href.includes("/visual/light") && (
            <div
              style={{
                height: 3,
                bottom: 0,
                left: 0,
                width: 70,
                background: "linear-gradient(red, yellow, blue, orange)",
              }}
            ></div>
          )}
        </Flex>
        <Flex
          direction={"column"}
          onClick={() => {
            navigate("/visual/simulation");
          }}
          className={`top-menu ${
            location.href.includes("/visual/simulation")
              ? "top-menu-active"
              : undefined
          }`}
        >
          数字孪生系统
          {location.href.includes("/visual/simulation") && (
            <div
              style={{
                height: 3,
                bottom: 0,
                left: 0,
                width: 70,
                background: "linear-gradient(red, yellow, blue, orange)",
              }}
            ></div>
          )}
        </Flex>
      </Flex>
      <Flex
        align={"center"}
        style={{ position: "fixed", top: 6, zIndex: 3, right: 20, width: 800 }}
        direction={"row-reverse"}
      >
        <Flex
          direction={"column"}
          onClick={() => {
            navigate("/visual/environment");
          }}
          className={`top-menu ${
            location.href.includes("/visual/environment")
              ? "top-menu-active"
              : undefined
          }`}
        >
          5G 环境监测系统
          {location.href.includes("/visual/environment") && (
            <div
              style={{
                height: 3,
                bottom: 0,
                left: 0,
                width: 70,
                background: "linear-gradient(red, yellow, blue, orange)",
              }}
            ></div>
          )}
        </Flex>
        <Flex
          direction={"column"}
          onClick={() => {
            navigate("/visual/soil");
          }}
          className={`top-menu ${
            location.href.includes("/visual/soil")
              ? "top-menu-active"
              : undefined
          }`}
        >
          ⼟壤监测系统
          {location.href.includes("/visual/soil") && (
            <div
              style={{
                height: 3,
                bottom: 0,
                left: 0,
                width: 70,
                background: "linear-gradient(red, yellow, blue, orange)",
              }}
            ></div>
          )}
        </Flex>
        <Flex
          direction={"column"}
          onClick={() => {
            navigate("/visual/camera");
          }}
          className={`top-menu ${
            location.href.includes("/visual/camera")
              ? "top-menu-active"
              : undefined
          }`}
        >
          视频监控系统
          {location.href.includes("/visual/camera") && (
            <div
              style={{
                height: 3,
                bottom: 0,
                left: 0,
                width: 70,
                background: "linear-gradient(red, yellow, blue, orange)",
              }}
            ></div>
          )}
        </Flex>
        <Flex
          direction={"column"}
          onClick={() => {
            navigate("/visual/temperature");
          }}
          className={`top-menu ${
            location.href.includes("/visual/temperature")
              ? "top-menu-active"
              : undefined
          }`}
        >
          温度控制系统
          {location.href.includes("/visual/temperature") && (
            <div
              style={{
                height: 3,
                bottom: 0,
                left: 0,
                width: 70,
                background: "linear-gradient(red, yellow, blue, orange)",
              }}
            ></div>
          )}
        </Flex>
        {/*<AiFillCaretLeft />*/}
      </Flex>
    </Flex>
  );
}
