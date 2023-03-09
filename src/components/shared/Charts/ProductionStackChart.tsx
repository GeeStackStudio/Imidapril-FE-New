import { Column } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ColumnConfig } from "@ant-design/charts";
const json = [
  {
    year: "01-01",
    value: 3,
    type: "一号池塘",
  },
  {
    year: "01-02",
    value: 4,
    type: "一号池塘",
  },
  {
    year: "01-03",
    value: 3.5,
    type: "一号池塘",
  },
  {
    year: "01-04",
    value: 5,
    type: "一号池塘",
  },
  {
    year: "01-05",
    value: 4.9,
    type: "一号池塘",
  },
  {
    year: "01-06",
    value: 6,
    type: "一号池塘",
  },
  {
    year: "01-07",
    value: 7,
    type: "一号池塘",
  },
  {
    year: "01-08",
    value: 9,
    type: "一号池塘",
  },
  {
    year: "01-09",
    value: 13,
    type: "一号池塘",
  },
  {
    year: "01-01",
    value: 3,
    type: "二号池塘",
  },
  {
    year: "01-02",
    value: 4,
    type: "二号池塘",
  },
  {
    year: "01-03",
    value: 3.5,
    type: "二号池塘",
  },
  {
    year: "01-04",
    value: 5,
    type: "二号池塘",
  },
  {
    year: "01-05",
    value: 4.9,
    type: "二号池塘",
  },
  {
    year: "01-06",
    value: 6,
    type: "二号池塘",
  },
  {
    year: "01-07",
    value: 7,
    type: "二号池塘",
  },
  {
    year: "01-08",
    value: 9,
    type: "二号池塘",
  },
  {
    year: "01-09",
    value: 13,
    type: "二号池塘",
  },
];
export function ProductionStackChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    setData(json as any);
  };
  const config: ColumnConfig = {
    data,
    isStack: true,
    xField: "year",
    yField: "value",
    seriesField: "type",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };

  return <Column {...config} />;
}
