import Cookies from "js-cookie";

import type { ILogin } from "@/interfaces/ILogin";

const applicationName = "MODEL";

const COOKIES_TYPES = {
  SESSION: applicationName + "$S",
  LOGIN: applicationName + "$L",
};

interface ICookiesHandler {
  login: {
    set: (obj: ILogin) => Promise<void>;
    get: () => Promise<ILogin | false>;
    remove: () => Promise<void>;
  };
}

export const CookiesHandler: ICookiesHandler = {
  login: {
    set: async obj => {
      await Cookies.set(COOKIES_TYPES.LOGIN, JSON.stringify(obj), {
        expires: 10,
      });
    },
    get: async () => {
      const session = Cookies.get(COOKIES_TYPES.LOGIN);
      if (!!session) {
        return JSON.parse(session);
      }
      return false;
    },
    remove: async () => {
      await Cookies.remove(COOKIES_TYPES.LOGIN);
    },
  },
};
