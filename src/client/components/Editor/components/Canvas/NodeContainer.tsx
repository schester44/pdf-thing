import cn from "classnames";

type NodeContainerProps = {
  isDragOver: boolean;
  isHoverOver: boolean;
  isSelected: boolean;
};

export const NodeContainer: React.FC<NodeContainerProps> = ({
  children,
  isDragOver,
  isHoverOver,
  isSelected,
}) => {
  return (
    <>
      <div
        className={cn("w-full h-full absolute", {
          "border-dashed border": isHoverOver || isSelected,
        })}
      />

      {children}
    </>
  );
};
