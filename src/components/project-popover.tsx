import React from "react";
import { Popover, Typography, List } from "antd";
import { useProject } from "../utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
//import { useDispatch } from "react-redux";
// import {
//   projectListActions,
//   selectProjectModalOpen,
// } from "../screens/project-list/project-list.slice";
import { useProjectModal } from "../screens/project-list/utils";
export const ProjectPopover = () => {
  const { open } = useProjectModal();
  // const dispatch = useDispatch();
  const { data: projects } = useProject();
  console.log(projects);
  const pinProjects = projects?.filter((project1: any) => project1.pin);

  const content = (
    <ContainerPop>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinProjects
          ? pinProjects.map((project: any) => {
              return (
                <List.Item>
                  <List.Item.Meta title={project.name} />
                </List.Item>
              );
            })
          : null}
      </List>
      <ButtonNoPadding type={"link"} onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContainerPop>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContainerPop = styled.div`
  min-width: 20rem;
`;
