import React from "react";
//import { useState } from "react";
import Searchpanel from "./search-panel";
import List from "./list";
import { Typography, Button } from "antd";
import { useProject } from "../../utils/project";
import { useUser } from "../../utils/user";
import { Row, ErrorBox } from "../../components/lib";
import { useDebounce } from "../../utils/index";
import { useProjectsSearchParams, useProjectModal } from "./utils";
import styled from "@emotion/styled";
//import { useDispatch } from "react-redux";
//import { projectListActions } from "./project-list.slice";

function ProjectListScreen() {
  let { open } = useProjectModal();
  //const dispatch = useDispatch();
  let [params, setParams] = useProjectsSearchParams();
  let { data: list, error, isLoading } = useProject(useDebounce(params, 200));
  let { data: user } = useUser();
  return (
    <Container>
      <Row between={true} marginBottom={3}>
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>

      <Searchpanel params={params} user={user || []} setParams={setParams} />
      <ErrorBox error={error} />
      {/* {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null} */}
      <List dataSource={list || []} user={user || []} loading={isLoading} />
    </Container>
  );
}

export default ProjectListScreen;

const Container = styled.div`
  margin-top: 2rem;
`;
