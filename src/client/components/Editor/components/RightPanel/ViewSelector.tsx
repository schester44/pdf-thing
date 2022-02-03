import React from "react";
import cn from "classnames";

type SelectorBtnProps = {
  onClick: () => void;
  isSelected: boolean;
  position: "l" | "r";
};

const SelectorBtn: React.FC<SelectorBtnProps> = ({ isSelected, position, children, onClick }) => {
  return (
    <div
      className={cn("border flex-1 flex items-center justify-center p-1 text-sm border-r-0", {
        [`rounded-${position}-lg`]: true,
        "bg-gray-100 text-gray-700": isSelected,
        "cursor-pointer hover:bg-gray-100 text-gray-500": !isSelected,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const ViewSelector = ({ view, onSelect }: { view: string; onSelect: (view: string) => void }) => {
  return (
    <div className="flex items-center">
      <SelectorBtn
        position="l"
        isSelected={view === "elements"}
        onClick={() => onSelect("elements")}
      >
        Elements
      </SelectorBtn>

      <SelectorBtn position="r" isSelected={view === "editor"} onClick={() => onSelect("editor")}>
        Editor
      </SelectorBtn>
    </div>
  );
};

export default ViewSelector;
