type Props = {
  name: string;
};

export const Setting: React.FC<Props> = ({ name, children }) => {
  return (
    <div className="flex items-center w-full py-1">
      <div className="text-xs text-gray-200 w-1/5">{name}</div>
      <div className="w-4/5">{children}</div>
    </div>
  );
};
