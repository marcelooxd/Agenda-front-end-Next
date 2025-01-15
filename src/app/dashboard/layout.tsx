"use client";

import { useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import SiderAdmin from "@/components/Sider";
import { useAuth } from "@/infra/context/auth";

const LayoutComponent = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [ready, setReady] = useState(false);

  const { userRecovery } = useAuth();

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const start = () => {
      userRecovery();
      setReady(true);
    };
    start();
  }, [userRecovery]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    );
  }

  return (
    <div>
      <Layout className="min-h-screen">
        <SiderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 250,
          }}
        >
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponent;
