import React, { useCallback } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/list";
import { http } from "../utils/http";
import { useMount } from "../utils/index";
import { useAsync } from "../utils/use-async";
import { FullPageLoading, FullPageError } from "../components/lib";
import * as authStore from "../store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
// const AuthContext = React.createContext<
//   | {
//       user: User | null;
//       login: (form: formData) => Promise<void>;
//       register: (form: formData) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);
// AuthContext.displayName = "AuthContext";

export interface formData {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token: token });
    user = data.user;
  }
  return user;
};
//上下文
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isLoading,
    isIdle,
    run,

    isError,
    error,
  } = useAsync<User | null>();
  const dispatch: (...arg: unknown[]) => Promise<User> = useDispatch();

  // const login = (form: formData) =>
  //   auth.login(form).then((user) => setUser(user));

  // const register = (form: formData) => {
  //   return auth.register(form).then((user) => setUser(user));
  // };
  // const logout = () => {
  //   return auth.logout().then(null);
  // };
  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });
  if (isLoading || isIdle) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageError error={error} />;
  }
  // return (
  //   <AuthContext.Provider
  //     children={children}
  //     value={{ user, login, register, logout }}
  //   ></AuthContext.Provider>
  // );
  return <div>{children}</div>;
};

export const useAuth = () => {
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth必须在AuthProvider中使用");
  // }
  // return context;
  const dispatch: (...arg: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: formData) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: formData) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
