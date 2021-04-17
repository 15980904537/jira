import React from "react";
import { Table, TableProps, Dropdown, Menu, Button } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { Row } from "../../components/lib";
// import { useDispatch } from "react-redux";
// import { projectListActions } from "./project-list.slice";
import { useProjectModal } from "./utils";
export interface User {
  id: number;
  name: string;
  token: string;
}

export interface List1 {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}

interface ListProps extends TableProps<List1> {
  user: User[];
  refresh?: () => void;
}

function List({ user, ...props }: ListProps) {
  // const dispatch = useDispatch();

  const { mutate } = useEditProject();

  const { startEdit } = useProjectModal();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin count={1} checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                count={1}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",

          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.organization.localeCompare(b.organization),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span key={project.id}>
                {user.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span key={project.id}>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : ""}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"logout"}>
                      <Row>
                        <Button
                          type={"link"}
                          onClick={editProject(project.id)}
                          key={"edit"}
                        >
                          编辑
                        </Button>
                        <Button type={"link"} key={"del"}>
                          删除
                        </Button>
                      </Row>
                    </Menu.Item>
                  </Menu>
                }
              >
                <div>...</div>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
}

export default List;
