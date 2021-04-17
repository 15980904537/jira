import styled from "@emotion/styled";
import { Spin, Typography, Button } from "antd";
import React from "react";
import { DevTools } from "jira-dev-tool";
export const Row = styled.div<{
  gap?: boolean | number;
  marginBottom?: number;
  between?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size={"large"}></Spin>;
    </FullPage>
  );
};

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageError = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <ErrorBox error={error} />
      {/* <Typography.Text type={"danger"}>{error?.message}</Typography.Text> */}
    </FullPage>
  );
};

//类型守卫
const isError = (value: any): value is Error => value?.message;
export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;
