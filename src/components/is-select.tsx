import React from "react";
import { Raw } from "../type/Raw";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;
interface IdSelectProps
  extends Omit<
    SelectProps,
    "value" | "onChange" | " defaultOptionName" | "options"
  > {
  value?: null | undefined | Raw;
  onChange?: (value: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = (props: IdSelectProps) => {
  let { value, onChange, defaultOptionName, options } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => {
        onChange?.(toNumber(value));
      }}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}

      {options
        ? options.map((item) => {
            return <Select.Option value={item.id}>{item.name}</Select.Option>;
          })
        : null}
    </Select>
  );
};

const toNumber = (n: unknown) => (isNaN(Number(n)) ? 0 : Number(n));
