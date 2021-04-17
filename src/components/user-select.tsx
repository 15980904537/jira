import React from "react";
import { IdSelect } from "./is-select";
import { useUser } from "../utils/user";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: user } = useUser();
  return <IdSelect options={user || []} {...props}></IdSelect>;
};
