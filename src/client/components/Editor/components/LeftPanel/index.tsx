import { ComponentTree } from "../ComponentTree";

export const LeftPanel = () => {
  return (
    <div className="w-1/6 bg-gray-900 h-screen text-white overflow-hidden flex flex-col">
      <div className="h-12">
        <div className="bg-indigo-500 h-full w-12 text-2xl flex items-center justify-center">O</div>
      </div>

      <div className="pt-4 overflow-auto flex-1">
        <ComponentTree />
      </div>
    </div>
  );
};
