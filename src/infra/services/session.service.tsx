import type { AxiosResponse } from "axios";

import type { ILogin } from "@/interfaces/ILogin";
import type { ICreateUser, IUser } from "@/interfaces/IUser";

import api from "./api.service";

const login = async ({
  email,
  password,
}: ILogin): Promise<
  AxiosResponse<{
    token: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }>
> => {
  return await api.post("/usuarios/login", {
    email,
    password,
  });
};

const register = async (data: ICreateUser): Promise<AxiosResponse<IUser>> => {
  return await api.post("/usuarios/save", data);
};

export const sessionService = { login, register };
