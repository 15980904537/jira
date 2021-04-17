import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input, Button } from "antd";
import { useAsync } from "../utils/use-async";
//import { useDocumentTitle } from "../utils";
interface Value1 {
  username: string;
  password: string;
  cpassword: string;
}
function Register({ onError }: { onError: (error: Error) => void }) {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({ cpassword, ...value }: Value1) => {
    if (cpassword !== value.password) {
      onError(new Error("请确认两次输入的密码是否相同"));
      return;
    }
    try {
      await run(register(value));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder={"密码"} type="text" id={"password"} />
      </Form.Item>

      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder={"确认密码"} type="text" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={isLoading}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Register;
