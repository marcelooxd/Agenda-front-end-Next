"use client";

import type { FC, KeyboardEvent } from "react";
import React, { useCallback } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";

interface IPageContainer {
  children?: React.ReactNode;
  title?: string;
  headerItems?: React.ReactNode;
  loading?: boolean;
  backButton?: boolean;
  backRoute?: string | boolean;
  container?: string | null;
}

const PageContainer: FC<IPageContainer> = ({
  children,
  title,
  headerItems,
  loading = false,
  backButton = false,
  backRoute = false,
  container = null,
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (backButton && !backRoute) {
      router.back();
    } else if (backRoute) {
      router.push(backRoute as string);
    }
  }, [backButton, backRoute, router]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        handleBack();
      }
    },
    [handleBack]
  );

  return (
    <div className={`${container ? container : "container py-6"}`}>
      {!!title && (
        <>
          <div className="flex items-center justify-between">
            <div
              className="flex cursor-pointer items-center"
              role="button"
              tabIndex={0}
              onClick={handleBack}
              onKeyDown={handleKeyDown}
            >
              {!!backButton && <BsArrowLeftCircle className="mr-2" size={22} />}
              <h3 className="font-bold">{title}</h3>
            </div>
            {loading ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              headerItems
            )}
          </div>
          <hr className="my-4" />
        </>
      )}
      {loading ? (
        <div className="my-4 flex items-center justify-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default PageContainer;
