import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IUserState {
  loading: boolean;
  logged: boolean;
  id: string | null;
  username: string | null;
  email: string | null;
}

interface IAuthState {
  user: IUserState;
  userUpdate: (obj: IUserState) => void;
  userUpdatePartial: (obj: Partial<IUserState>) => void;
  userRecovery: () => boolean;
  userLogout: () => boolean;
}

const storageName = "_AUTH";

export const useAuth = create<IAuthState>()(
  persist(
    (set, get) => ({
      user: {
        loading: true,
        logged: false,
        id: null,
        username: null,
        email: null,
      },
      userUpdate: obj => set({ user: obj }),
      userUpdatePartial: obj => set({ user: { ...get().user, ...obj } }),
      userRecovery: () => {
        const session = get().user;
        if (!!session?.logged) {
          set({ user: session });
        }
        return !!session?.logged;
      },
      userLogout: () => {
        set({
          user: {
            loading: true,
            logged: false,
            id: null,
            username: null,
            email: null,
          },
        });
        return true;
      },
    }),
    {
      name: storageName,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
