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
import React, { useState } from "react";
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
import { DeviceOverviewPage } from "./DeviceOverview";
import { WorkScheduleListPage } from "./Work/WorkList";
import SensorDashboardPage from "./Sensor/Dashboard";
import GzzyAppIndexPage from "./Dashboard/dashboard";
export function LayoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const settings: ProSettings | undefined = {
    layout: "mix",
    splitMenus: true,
  };

  const [pathname, setPathname] = useState(location.pathname);

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
              中洋鱼天下
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
            title: "七妮妮",
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
                    placeholder="搜索方案"
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
                {/*<div>© 2021 Made with love</div>*/}
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
            <Route index path={"/culture/list"} element={<CulturePage />} />
            <Route path={"/culture/:id"} element={<CultureDetailPage />} />
            <Route
              index
              path={"/culture/production"}
              element={<CultureProductionPage />}
            />
            <Route
              index
              path={"/material/consume"}
              element={<MaterialConsumePage />}
            />
            {/*基础数据*/}
            <Route index path={"/basic/breed"} element={<BreedPage />} />
            <Route index path={"/basic/seedbed"} element={<SeedbedPage />} />
            <Route index path={"/basic/pond"} element={<PondPage />} />
            <Route index path={"/basic/user"} element={<UserPage />} />
            {/*工作安排*/}
            <Route
              index
              path={"/work/workload"}
              element={<WorkloadCostPage />}
            />
            <Route index path={"/work/manage"} element={<WorkloadCostPage />} />
            <Route
              index
              path={"/work/list"}
              element={<WorkScheduleListPage />}
            />
            <Route index path={"/device/test"} element={<DeviceTestPage />} />
            <Route
              index
              path={"/device/overview"}
              element={<DeviceOverviewPage />}
            />
            <Route
              index
              path={"/sensor/dashboard"}
              element={<SensorDashboardPage />}
            />
          </Routes>
        </ProLayout>
      </div>
    </>
  );
}
