import { Empty, Typography } from "antd";
import Flex from "../Flex";
import notFoundImage from "../../../assets/notFound.svg";
import React, { CSSProperties } from "react";

export function BeautifiedEmpty(props: {
  title: string;
  imageWidth?: number;
  description?: string;
  style?: CSSProperties;
}) {
  return (
    <Empty
      style={props.style}
      image={null}
      description={
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <img
            style={{ width: props.imageWidth ?? 240 }}
            src={notFoundImage}
            alt="NotFound"
          />
          <Typography.Text strong style={{ fontSize: 20, marginTop: 32 }}>
            {props.title}
          </Typography.Text>
          <Typography.Text style={{ marginTop: 8 }}>
            {props.description}
          </Typography.Text>
        </Flex>
      }
    />
  );
}
