import React, { useEffect, useMemo, useState } from "react";
import { Input, InputNumber, Select } from "antd";

// interface IFileSizeInputProps extends

export default function FileSizeInput(props: {
  size: number;
  onChange: (num: number) => any;
}) {
  const [unit, setUnit] = useState("GB");
  const displayValue = useMemo(() => {
    if (unit === "GB") return Math.floor(props.size / 1024 / 1024 / 1024);
    if (unit === "MB") return Math.floor(props.size / 1024 / 1024);
    if (unit === "KB") return Math.floor(props.size / 1024);
    return props.size;
  }, [props.size, unit]);

  function calculate(num: number) {
    if (unit === "GB") return num * 1024 * 1024 * 1024;
    if (unit === "MB") return num * 1024 * 1024;
    if (unit === "KB") return num * 1024;
    return num;
  }

  return (
    <Input
      value={displayValue}
      onChange={(e) => {
        if (isNaN(parseInt(e.target.value))) {
          props.onChange(0);
        } else {
          props.onChange(calculate(parseInt(e.target.value)));
        }
      }}
      addonAfter={
        <Select defaultValue={unit} onChange={setUnit}>
          <Select.Option value={"B"}>B</Select.Option>
          <Select.Option value={"KB"}>KB</Select.Option>
          <Select.Option value={"MB"}>MB</Select.Option>
          <Select.Option value={"GB"}>GB</Select.Option>
        </Select>
      }
    />
  );
}
