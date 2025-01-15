import { Spin } from "antd";
import type { FC } from "react";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const Loading: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin indicator={<LoadingOutlined spin />} />
    </div>
  );
};

export default React.memo(Loading);
