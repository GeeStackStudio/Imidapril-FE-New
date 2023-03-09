import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";
import React from "react";

const route = {
  path: "/",
  routes: [
    {
      path: "/",
      name: "首页",
      icon: <SmileFilled />,
    },
    {
      path: "/sensor/dashboard",
      name: "环境大屏",
      icon: <SmileFilled />,
    },
    {
      name: "生产系统",
      icon: <TabletFilled />,
      path: "/culture",
      routes: [
        {
          path: "/culture",
          name: "养殖管理",
          icon: <CrownFilled />,
          routes: [
            {
              path: "/culture/list",
              name: "养殖批次",
              icon: <CrownFilled style={{ color: "#2196F3" }} />,
            },
            {
              path: "/culture/production",
              name: "产量数据",
              icon: <CrownFilled style={{ color: "#2196F3" }} />,
            },
          ],
        },
        {
          path: "/alert",
          name: "系统预警",
          icon: <CrownFilled />,
          routes: [
            {
              path: "/alert",
              name: "预警管理",
              icon: <CrownFilled style={{ color: "#cf1322" }} />,
            },
          ],
        },
        {
          path: "/device",
          name: "设备控制",
          icon: <CrownFilled />,
          routes: [
            {
              path: "/device/overview",
              name: "设备控制",
              icon: <CrownFilled style={{ color: "#cf1322" }} />,
            },
            {
              path: "/sensor/overview",
              name: "环境数据",
              icon: <CrownFilled style={{ color: "#cf1322" }} />,
            },
            {
              path: "/device/test",
              name: "设备测试",
              icon: <CrownFilled style={{ color: "#cf1322" }} />,
            },
          ],
        },
        {
          path: "/material",
          name: "物料管理",
          icon: <CrownFilled />,
          routes: [
            {
              path: "/material/consume",
              name: "物料领用",
              icon: <CrownFilled style={{ color: "#7cb305" }} />,
            },
          ],
        },
        {
          path: "/work",
          name: "生产安排",
          icon: <CrownFilled />,
          routes: [
            {
              path: "/work/workload",
              name: "工作量统计",
              icon: <CrownFilled style={{ color: "#08979c" }} />,
            },
            {
              path: "/work/manage",
              name: "工作安排",
              icon: <CrownFilled style={{ color: "#08979c" }} />,
            },
            {
              path: "/work/list",
              name: "工作历史",
              icon: <CrownFilled style={{ color: "#08979c" }} />,
            },
          ],
        },
        {
          path: "/basic",
          name: "基础数据",
          icon: <CrownFilled />,
          routes: [
            {
              path: "/basic/pond",
              name: "池塘管理",
              icon: <CrownFilled style={{ color: "#c41d7f" }} />,
            },
            {
              path: "/basic/user",
              name: "用户管理",
              icon: <CrownFilled style={{ color: "#c41d7f" }} />,
            },
            {
              path: "/basic/breed",
              name: "物料品种管理",
              icon: <CrownFilled style={{ color: "#c41d7f" }} />,
            },
          ],
        },
      ],
    },
    {
      path: "https://www.zy.com.cn/",
      name: "中洋集团",
      icon: <ChromeFilled />,
    },
    {
      path: "http://218.205.28.229:5001/",
      name: "蓝色粮仓",
      icon: <ChromeFilled />,
    },
  ],
};

export const defaultProps = {
  route: route,
  location: {
    pathname: "/",
  },
  appList: [
    {
      icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      title: "Ant Design",
      desc: "杭州市较知名的 UI 设计语言",
      url: "https://ant.design",
    },
  ],
};
