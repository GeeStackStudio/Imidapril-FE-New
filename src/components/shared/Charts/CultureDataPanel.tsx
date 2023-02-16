import { Col, Row, Typography } from "antd";
import React from "react";
import { CultureBriefDto } from "../../../scaffold";

export function CultureDataPanel(props: { brief: CultureBriefDto }) {
  return (
    <div>
      <Row style={{ padding: "4px 0 4px 32px" }}>
        <Col span={6}>
          <Typography.Text style={{ color: "whitesmoke", fontSize: 14 }} strong>
            投放量
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "#02c2e5", fontSize: 14 }} strong>
            {props.brief.fryCount} 尾
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "whitesmoke", fontSize: 14 }} strong>
            池塘总面积
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "#02c2e5", fontSize: 14 }} strong>
            {props.brief.areaSize} 亩
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ padding: "4px 0 4px 32px", background: "#0b164e" }}>
        <Col span={6}>
          <Typography.Text style={{ color: "whitesmoke", fontSize: 14 }} strong>
            存货量
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "#02c2e5", fontSize: 14 }} strong>
            {props.brief.remainCount} 尾
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "whitesmoke", fontSize: 14 }} strong>
            平均体重
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "#02c2e5", fontSize: 14 }} strong>
            {props.brief.averageWeight}
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ padding: "4px 0 4px 32px" }}>
        <Col span={6}>
          <Typography.Text style={{ color: "whitesmoke", fontSize: 14 }} strong>
            池塘总数
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "#02c2e5", fontSize: 14 }} strong>
            {props.brief.pondCount}
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "whitesmoke", fontSize: 14 }} strong>
            平均体长
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "#02c2e5", fontSize: 14 }} strong>
            {props.brief.averageLength}
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ padding: "4px 0 4px 32px", background: "#0b164e" }}>
        <Col span={6}>
          <Typography.Text style={{ color: "whitesmoke", fontSize: 14 }} strong>
            养殖阶段
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "#02c2e5", fontSize: 14 }} strong>
            {props.brief.currentPeriod}
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "whitesmoke", fontSize: 14 }} strong>
            养殖天数
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text style={{ color: "#02c2e5", fontSize: 14 }} strong>
            {props.brief.cultureDays} 天
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
}
