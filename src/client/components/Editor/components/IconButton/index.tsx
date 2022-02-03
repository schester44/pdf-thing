import cn from "classnames";

export const IconButton: React.FC<{
  isActive?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ className, children, isActive, onClick }) => {
  return (
    <button
      className={cn("bg-gray-100 transition-colors rounded p-1", {
        [className as string]: !!className,
        ["hover:bg-gray-200 text-gray-600 hover:text-gray-900"]: !isActive && typeof isActive !== "undefined",
        [" text-indigo-600 cursor-default bg-gray-200"]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
