//import { cleanObject } from "./index";
import { useHttp } from "./http";
//import { useAsync } from "./use-async";
//import { useEffect } from "react";
import { List1 } from "../screens/project-list/list";
import { useQuery, useQueryClient, useMutation } from "react-query";
export const useProject = (params?: Partial<List1>) => {
  // let { run, ...result } = useAsync<List1[]>();
  let client = useHttp();
  return useQuery<List1[]>(["projects", params], () =>
    client("projects", { data: params })
  );
  // const clientProject = () =>
  //   client("projects", { data: cleanObject(params || {}) });
  // useEffect(() => {
  //   run(clientProject(), { retry: clientProject });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [params]);
  // return result;
};
export const useEditProject = () => {
  //const { run, ...resresult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<List1>) =>
      client(`projects/${params.id}`, { data: params, method: "PATCH" }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
  // const mutate = (params: Partial<List1>) => {
  //   return run(
  //     client(`projects/${params.id}`, { data: params, method: "PATCH" })
  //   );
  // };
  // return {
  //   mutate,
  //   resresult,
  // };
};

export const useAddProject = () => {
  //const { run, ...resresult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<List1>) =>
      client(`projects/`, { data: params, method: "POST" }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
  // const mutate = (params: Partial<List1>) => {
  //   return run(
  //     client(`projects/${params.id}`, { data: params, method: "POST" })
  //   );
  // };
  // return {
  //   mutate,
  //   resresult,
  // };
};

export const useProjectId = (id?: number) => {
  const client = useHttp();
  return useQuery(["projects", { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id),
  });
};
