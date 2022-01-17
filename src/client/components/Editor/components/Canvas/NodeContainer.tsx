import cn from "classnames";

type NodeContainerProps = {
  isHoverOver: boolean;
  isSelected: boolean;
};

export const NodeContainer: React.FC<NodeContainerProps> = ({
  children,
  isHoverOver,
  isSelected,
}) => {
  return (
    <>
      <div
        className={cn("w-full h-full absolute", {
          "border-dashed border border-indigo-600": isHoverOver || isSelected,
        })}
      />
      {children}
    </>
  );
};
