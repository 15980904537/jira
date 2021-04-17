import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Navigate, Routes, Route } from "react-router";
import { Kanban } from "./kanban";
import { Epic } from "./epic";
export const ProjectScreen = () => {
  return (
    <div>
      <Router>
        <h1>ProjectScreen</h1>
        <Link to={"kanban"}>看板</Link>
        <Link to={"epic"}>任务组</Link>
        <Routes>
          <Route path={"/kanban"} element={<Kanban />} />
          <Route path={"/epic"} element={<Epic />} />
          <Navigate to={window.location.pathname + "/kanban"} />
        </Routes>
      </Router>
    </div>
  );
};
