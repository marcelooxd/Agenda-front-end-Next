import React, { useCallback } from "react";
import { Layout, Menu, notification } from "antd";
import Link from "next/link";
import { BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

import { useAuth } from "@/infra/context/auth";

const { Sider } = Layout;

interface ISiderAdmin {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SiderAdmin = ({ collapsed, setCollapsed }: ISiderAdmin): JSX.Element => {
  const { userLogout } = useAuth();
  const router = useRouter();

  const handleMenuSelect = useCallback(
    ({ key }: { key: string }) => {
      if (key === "/") {
        userLogout();
        notification.success({
          message: "Até mais! =)",
        });
        router.push("/");
      } else {
        router.push(key);
      }
    },
    [userLogout, router]
  );

  const handleUpdateCollapse = useCallback(
    (collapse: boolean) => {
      setCollapsed(collapse);
    },
    [collapsed, setCollapsed]
  );

  return (
    <div>
      <Sider
        theme="light"
        collapsible
        width={250}
        collapsed={collapsed}
        onCollapse={handleUpdateCollapse}
        className="fixed left-0 h-screen overflow-y-auto bg-gray-300"
      >
        <Link href="/admin">
          <img
            src={collapsed ? "/images/favicon.png" : "/images/palmeiras.png"}
            width={collapsed ? 60 : 180}
            className="mx-auto my-5 cursor-pointer px-[6px]"
            alt="logoTeste"
          />
        </Link>
        <Menu
          mode="inline"
          style={{
            color: "black",
          }}
          onSelect={handleMenuSelect}
          items={[
            {
              icon: <BiSolidDashboard size={24} />,
              label: "Dashboard",
              key: "/dashboard/",
            },
            {
              icon: <BiLogOut size={24} />,
              label: "Sair",
              key: "/",
            },
          ]}
        />
      </Sider>
    </div>
  );
};

export default SiderAdmin;
