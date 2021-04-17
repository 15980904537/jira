/** @jsx jsx */
import React from "react";
import { User, List1 } from "./list";
import { Form, Input } from "antd";
import { jsx } from "@emotion/react";
import { UserSelect } from "../../components/user-select";
interface SearchProp {
  params: Partial<Pick<List1, "name" | "personId">>;
  user: User[];
  setParams: (params: SearchProp["params"]) => void;
}
function Searchpanel({ params, user, setParams }: SearchProp) {
  return (
    <Form layout={"inline"} css={{ marginBottom: "2rem", ">*": "" }}>
      <Form.Item>
        <Input
          type="text"
          value={params.name}
          style={{ width: 220 }}
          placeholder={"项目名称"}
          onChange={(ev) => {
            setParams({
              ...params,
              name: ev.target.value,
            });
          }}
        />
      </Form.Item>

      <Form.Item>
        <UserSelect
          value={params.personId}
          onChange={(value) => {
            setParams({
              ...params,
              personId: value,
            });
          }}
          defaultOptionName={"负责人"}
          options={user}
        />
      </Form.Item>
    </Form>
  );
}

export default Searchpanel;
