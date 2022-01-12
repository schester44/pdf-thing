import Button from "@client/components/dashboard/Button";
import { FiSave } from "react-icons/fi";
import { NodeEditor } from "../NodeEditor";

export const RightPanel = () => {
  return (
    <div className="w-1/4 bg-gray-900 text-white h-full flex flex-col">
      <div className="flex justify-end p-2">
        <Button size="sm" type="primary" className="flex items-center">
          Save
          <FiSave className="ml-2" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <NodeEditor />
      </div>
    </div>
  );
};
