import cn from "classnames";
import { BiLayout } from "react-icons/bi";
import { CgDatabase } from "react-icons/cg";
import { CanvasContainer as Canvas } from "../Canvas";
import { DataEditor } from "../DataEditor";

type Props = {
  activeWindow: "design" | "data";
  onWindowChange: (window: "design" | "data") => void;
};

export const MiddlePanel = ({ activeWindow, onWindowChange }: Props) => {
  return (
    <div className="flex flex-col overflow-hidden h-full">
      <div>
        <Toolbar activeWindow={activeWindow} onWindowChange={onWindowChange} />
      </div>

      {activeWindow === "design" && <Canvas />}
      {activeWindow === "data" && <DataEditor />}
    </div>
  );
};

const PanelButton: React.FC<{ isActive: boolean; onClick: () => void }> = ({
  children,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn("flex items-center px-3 py-2 text-xs rounded font-semibold", {
        "bg-white shadow text-gray-800": isActive,
        "cursor-pointer text-gray-600": !isActive,
      })}
    >
      {children}
    </div>
  );
};

const Toolbar = ({ activeWindow, onWindowChange }: Props) => {
  return (
    <div className=" flex justify-center py-4">
      <div className="flex">
        <PanelButton isActive={activeWindow === "design"} onClick={() => onWindowChange("design")}>
          <BiLayout className="text-lg mr-1" /> Design
        </PanelButton>

        <PanelButton isActive={activeWindow === "data"} onClick={() => onWindowChange("data")}>
          <CgDatabase className="text-lg mr-1" /> Sample Data
        </PanelButton>
      </div>
    </div>
  );
};
