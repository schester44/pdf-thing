import cn from "classnames";
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

const Toolbar = ({ activeWindow, onWindowChange }: Props) => {
  return (
    <div className="bg-gray-900 flex justify-between">
      <div></div>
      <div className="flex">
        <div
          onClick={() => onWindowChange("design")}
          className={cn("flex items-center justify-center text-white p-3 border-t-2 text-sm", {
            "border-indigo-500 bg-gray-800": activeWindow === "design",
            "cursor-pointer border-gray-900": activeWindow !== "design",
          })}
        >
          Design
        </div>
        <div
          onClick={() => onWindowChange("data")}
          className={cn("flex items-center justify-center text-white p-3 border-t-2  text-sm", {
            "border-indigo-500 bg-gray-800": activeWindow === "data",
            "cursor-pointer border-gray-900 ": activeWindow !== "data",
          })}
        >
          Sample Data
        </div>
      </div>
      <div></div>
    </div>
  );
};
