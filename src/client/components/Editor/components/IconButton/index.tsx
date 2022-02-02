import cn from "classnames";

export const IconButton: React.FC<{
  isActive?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ className, children, isActive, onClick }) => {
  return (
    <button
      className={cn("bg-gray-100 hover:bg-gray-200 transition-colors rounded p-1", {
        [className as string]: !!className,
        ["border border-transparent"]: !isActive && typeof isActive !== "undefined",
        ["border border-indigo-600 text-indigo-400 hover:bg-gray-700 cursor-default"]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
