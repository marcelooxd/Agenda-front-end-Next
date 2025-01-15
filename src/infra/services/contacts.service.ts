import type { AxiosResponse } from "axios";

import type { ICreateContact, IContact } from "@/interfaces/IContact";

import apiService from "./api.service";

export interface IContactsApiResponse {
  content: IContact[];
  numberOfElements: number;
}

export interface IContactResponse {
  content: IContact;
}

const getAll = (
  user_id: string,
  page?: number,
  per_page?: number
): Promise<AxiosResponse<IContactsApiResponse>> =>
  apiService.get(`/contatos/contatosPaginados`, {
    params: { idUsario: user_id, page, per_page },
  });

const getById = (id: number): Promise<AxiosResponse<IContactResponse>> =>
  apiService.get(`/contatos/${id}`);

const create = (
  data: ICreateContact
): Promise<AxiosResponse<IContactResponse>> =>
  apiService.post("/contatos/save", data);

const remove = (id: string): Promise<AxiosResponse<void>> => {
  return apiService.delete(`/contatos/${id}`);
};

const update = (
  id: number,
  data: Partial<ICreateContact>
): Promise<AxiosResponse<void>> => {
  return apiService.put(`/contatos/${id}`, data);
};

export const contactsService = {
  getAll,
  getById,
  update,
  create,
  remove,
};
