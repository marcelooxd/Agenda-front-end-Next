"use client";

import { useEffect, useState } from "react";
import type { AxiosError, AxiosResponse } from "axios";
import { notification } from "antd";

import type { IContact } from "@/interfaces/IContact";

import type { IContactsApiResponse } from "../services/contacts.service";
import { contactsService } from "../services/contacts.service";

interface IContactsResponse {
  contatos: IContact[] | [];
  contatosLoading: boolean;
  contatosRefresh: () => void;
  contatosTotal: number;
}

export const useContacts = ({
  user_id,
  page,
  per_page,
}: {
  user_id: string;
  page?: number;
  per_page?: number;
}): IContactsResponse => {
  const [data, setData] = useState<IContact[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (loading) return;

    setLoading(true);

    contactsService
      .getAll(user_id, page, per_page)
      .then((res: AxiosResponse<IContactsApiResponse>) => {
        setData(res?.data.content);
        setTotal(res?.data.numberOfElements);
      })
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
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, per_page, user_id]);

  return {
    contatos: data,
    contatosLoading: loading,
    contatosRefresh: fetchData,
    contatosTotal: total,
  };
};
