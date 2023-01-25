import React from "react";
import { Button, DatePicker, Space } from "antd";
import "antd/dist/reset.css";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>This website aims to show the hs-web-service backend</p>
      <Space>
        <DatePicker />
        <Button type="primary" color="grey">
          Primary Button
        </Button>
      </Space>
    </div>
  );
}
