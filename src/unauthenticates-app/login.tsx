import React from "react";

import { useAuth } from "../context/auth-context";
import { Form, Input, Button } from "antd";
import { useAsync } from "../utils/use-async";
//import { useDocumentTitle } from "../utils";

export interface Value {
  username: string;
  password: string;
}
function Login({ onError }: { onError: (error: Error) => void }) {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (value: Value) => {
    try {
      await run(login(value));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder={"密码"} type="text" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={isLoading}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Login;
