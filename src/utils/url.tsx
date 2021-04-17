import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { useMemo, useState } from "react";
import { cleanObject } from ".";
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        keys.reduce((pre, key) => {
          return { ...pre, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};

// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParam] = useSearchParams();
//   const [stateKeys] = useState(keys);
//   return [
//     useMemo(
//       () =>
//         subset(Object.fromEntries(searchParams), stateKeys) as {
//           [key in K]: string;
//         },
//       [searchParams, stateKeys]
//     ),
//     (params: Partial<{ [key in K]: unknown }>) => {
//       // iterator
//       // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
//       const o = cleanObject({
//         ...Object.fromEntries(searchParams),
//         ...params,
//       }) as URLSearchParamsInit;
//       return setSearchParam(o);
//     },
//   ] as const;
// };
