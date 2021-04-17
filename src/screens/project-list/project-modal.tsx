import React, { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
//import { useDispatch, useSelector } from "react-redux";
// import {
//   projectListActions,
//   selectProjectModalOpen,
// } from "./project-list.slice";
import { useProjectModal } from "./utils";
import { useEditProject, useAddProject } from "../../utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "../../components/lib";
import { UserSelect } from "../../components/user-select";
import styled from "@emotion/styled";

export const ProjectMolal = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();

  const title = editingProject ? "编辑项目" : "创建项目";

  //提交请求
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();

  const [form] = useForm();
  const onFinish = (value: any) => {
    mutateAsync({ ...editingProject, ...value }).then(() => {
      //重置表单
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      visible={projectModalOpen}
      width={"100%"}
      onClose={close}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>

            <ErrorBox error={error}></ErrorBox>
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"}></Input>
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"}></Input>
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"}></UserSelect>
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={mutateLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  align-items: center;
`;
