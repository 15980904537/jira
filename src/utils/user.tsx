import { useMount } from "./index";
import { useHttp } from "./http";
import { User } from "../screens/project-list/list";
import { useAsync } from "./use-async";

import { cleanObject } from "./index";
export const useUser = (params?: Partial<User>) => {
  let { run, ...result } = useAsync<User[]>();
  let client = useHttp();
  useMount(() => {
    run(client("users", { data: cleanObject(params || {}) }));
  });
  return result;
};
