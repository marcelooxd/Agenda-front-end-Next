import { notification } from "antd";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import type { IContact } from "@/interfaces/IContact";

import { contactsService } from "../services/contacts.service";

interface ContactResponse {
  contact: IContact | undefined;
  contactLoading: boolean;
  contactRefresh: () => void;
}

interface ApiResponse {
  content: IContact;
}

export const useContact = (id: number): ContactResponse => {
  const [data, setData] = useState<IContact>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    setLoading(true);
    contactsService
      .getById(id)
      .then((res: AxiosResponse<ApiResponse>) => setData(res.data.content))
      .catch((err: AxiosError<{ message: string }>) => {
        if (
          !!err?.response &&
          !!err?.response?.data &&
          !!err?.response?.data?.message
        ) {
          notification.error({
            message: "Error",
            description: err.response?.data?.message,
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!!id) fetchData();
  }, [id]);

  return {
    contact: data,
    contactRefresh: fetchData,
    contactLoading: loading,
  };
};
