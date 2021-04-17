import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import { Button, Card, Divider } from "antd";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import { ErrorBox } from "../components/lib";
import { Typography } from "antd";
export const Unauthenticated = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "注册" : "登录"}</Title>
        <ErrorBox error={error} />
        {/* {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null} */}

        {isRegister ? (
          <Register onError={setError} />
        ) : (
          <Login onError={setError} />
        )}
        <Divider />
        <Button
          type={"link"}
          onClick={() => {
            setIsRegister(!isRegister);
          }}
          style={{ width: "100%" }}
        >
          {!isRegister ? "还没登录?请先登录" : "还没注册？请先注册"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: 50rem, 50rem;
  background-image: url(${left}), url(${right});
`;
