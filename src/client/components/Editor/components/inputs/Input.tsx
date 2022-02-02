import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

export const Input = ({ type = "text", ...props }: Props) => {
  return (
    <input
      {...props}
      type={type}
      className={`bg-gray-100 rounded text-gray-800 w-full text-xs p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        props.className || ""
      }`}
    />
  );
};
