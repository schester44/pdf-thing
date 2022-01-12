import cn from "classnames";

type Props = {
  name: string;
};

export const Setting: React.FC<Props> = ({ name, children }) => {
  return (
    <div className="flex items-center w-full py-2">
      <div className="text-xs text-gray-200 w-1/5">{name}</div>
      <div className="w-4/5">{children}</div>
    </div>
  );
};
