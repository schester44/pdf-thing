import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

export const Input = ({ type = "text", ...props }: Props) => {
  return (
    <input
      {...props}
      type={type}
      className={`bg-gray-700 rounded text-white w-full text-xs p-1 outline-none ${
        props.className || ""
      }`}
    />
  );
};
