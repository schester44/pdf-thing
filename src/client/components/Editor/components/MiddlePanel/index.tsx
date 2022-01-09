import cn from "classnames";
import { CanvasContainer as Canvas } from "../Canvas";
import { Previewer } from "../Previewer";

type Props = {
  activeWindow: "design" | "preview";
  onWindowChange: (window: "design" | "preview") => void;
};

export const MiddlePanel = ({ activeWindow, onWindowChange }: Props) => {
  return (
    <div className="flex flex-col overflow-hidden h-full">
      <div>
        <Toolbar activeWindow={activeWindow} onWindowChange={onWindowChange} />
      </div>

      {activeWindow === "design" && <Canvas />}
      {activeWindow === "preview" && <Previewer />}
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
          onClick={() => onWindowChange("preview")}
          className={cn("flex items-center justify-center text-white p-3 border-t-2  text-sm", {
            "border-indigo-500 bg-gray-800": activeWindow === "preview",
            "cursor-pointer border-gray-900 ": activeWindow !== "preview",
          })}
        >
          Preview
        </div>
      </div>
      <div></div>
    </div>
  );
};
