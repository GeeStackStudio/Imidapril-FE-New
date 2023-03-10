import {
  ChromeFilled,
  CrownFilled,
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import { PageContainer, ProLayout, ProCard } from "@ant-design/pro-components";
import { Alert, Button, Input, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { defaultProps } from "./routes";
import { AlertPage } from "./Alert";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CulturePage } from "./Culture";
import { BreedPage } from "./Breed";
import { MaterialConsumePage } from "./MaterialConsume";
import { CultureProductionPage } from "./CultureProduction";
import { SeedbedPage } from "./Seedbed";
import { PondPage } from "./Pond";
import { UserPage } from "./User";
import { WorkloadCostPage } from "./WorkloadCost";
import { CultureDetailPage } from "./CultureDetail";
import { DeviceTestPage } from "./DeviceTest";
import { WorkScheduleListPage } from "./Work/WorkList";
import SensorDashboardPage from "./Sensor/Dashboard";
import { DiseaseRulePage } from "./Rule/diseaseRuleManage";
import { CultureRulePage } from "./Rule/cultureRuleManageScreen";
import { CultureRuleDetailPage } from "./Rule/cultureRuleDetailPage";
import { SensorOverviewPage } from "./Sensor/Overview";
import { WorkManagePage } from "./WorkManage";
import GzzyAppIndexPage from "./Dashboard/dashboard";
import { DeviceOverviewPage } from "./Device/DeviceOverview";
export function LayoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const settings: ProSettings | undefined = {
    layout: "mix",
    splitMenus: true,
  };

  const [pathname, setPathname] = useState(location.pathname);
  console.log(pathname);
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div
        id="test-pro-layout"
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <ProLayout
          token={{
            header: {
              heightLayoutHeader: 64,
            },
          }}
          headerTitleRender={() => (
            <Typography.Text strong style={{ fontSize: 18 }}>
              ???????????????
            </Typography.Text>
          )}
          bgLayoutImgList={[
            {
              src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
              left: 85,
              bottom: 100,
              height: "303px",
            },
            {
              src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
              bottom: -68,
              right: -45,
              height: "303px",
            },
            {
              src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
              bottom: 0,
              left: 0,
              width: "331px",
            },
          ]}
          {...defaultProps}
          location={{
            pathname,
          }}
          menu={{
            type: "group",
          }}
          avatarProps={{
            src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
            size: "small",
            title: "Yang",
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              props.layout !== "side" && document.body.clientWidth > 1400 ? (
                <div
                  key="SearchOutlined"
                  aria-hidden
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 24,
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Input
                    style={{
                      borderRadius: 4,
                      marginInlineEnd: 12,
                      backgroundColor: "rgba(0,0,0,0.03)",
                    }}
                    prefix={
                      <SearchOutlined
                        style={{
                          color: "rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    }
                    placeholder="????????????"
                    bordered={false}
                  />
                  <PlusCircleFilled
                    style={{
                      color: "var(--ant-primary-color)",
                      fontSize: 24,
                    }}
                  />
                </div>
              ) : undefined,
              <InfoCircleFilled key="InfoCircleFilled" />,
              <QuestionCircleFilled key="QuestionCircleFilled" />,
              <GithubFilled key="GithubFilled" />,
            ];
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: "center",
                  paddingBlockStart: 12,
                }}
              >
                {/*<div>?? 2021 Made with love</div>*/}
                <div>by GeeStack Inc</div>
              </div>
            );
          }}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                item.path && navigate(item.path);
                item.path && setPathname(item.path);
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
        >
          <Routes>
            <Route path={"/"} element={<Navigate to={"/gzzy"} />} />
            <Route path={"/gzzy"} element={<GzzyAppIndexPage />} />
            <Route path={"/alert"} element={<AlertPage />} />
            <Route
              path={"/culture"}
              element={<Navigate to="/culture/list" />}
            />
            <Route path={"/culture/list"} element={<CulturePage />} />
            <Route path={"/culture/:id"} element={<CultureDetailPage />} />
            <Route
              path={"/culture/production"}
              element={<CultureProductionPage />}
            />
            <Route
              path={"/material/consume"}
              element={<MaterialConsumePage />}
            />
            {/*????????????*/}
            <Route path={"/basic/breed"} element={<BreedPage />} />
            <Route path={"/basic/seedbed"} element={<SeedbedPage />} />
            <Route path={"/basic/pond"} element={<PondPage />} />
            <Route path={"/basic/user"} element={<UserPage />} />
            {/*????????????*/}
            <Route path={"/work/workload"} element={<WorkloadCostPage />} />
            <Route path={"/work/manage"} element={<WorkloadCostPage />} />
            <Route path={"/work/list"} element={<WorkScheduleListPage />} />
            <Route path={"/device/test"} element={<DeviceTestPage />} />
            <Route path={"/sensor/overview"} element={<SensorOverviewPage />} />
            <Route path={"/device/overview"} element={<DeviceOverviewPage />} />
            <Route
              path={"/sensor/dashboard"}
              element={<SensorDashboardPage />}
            />
            <Route path={"/rule"} element={<Navigate to={"/rule/disease"} />} />
            <Route path={"/rule/disease"} element={<DiseaseRulePage />} />
            <Route path={"/rule/list"} element={<CultureRulePage />} />
            <Route path={"/rule/:id"} element={<CultureRuleDetailPage />} />
          </Routes>
        </ProLayout>
      </div>
    </>
  );
}
