import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { editorSidePanelViewState, selectedNodeState } from "../../recoil/atoms";
import { NodeEditor } from "../NodeEditor";
import ViewSelector from "./ViewSelector";
import { CollapsiblePanel } from "../NodeEditor/CollapsiblePanel";
import { ComponentTree } from "../ComponentTree";

export const RightPanel = () => {
  const [view, setView] = useRecoilState(editorSidePanelViewState);
  const activeNodeId = useRecoilValue(selectedNodeState);

  return (
    <div className="w-1/4 bg-white h-full flex flex-col">
      <div className="px-4 py-3">
        {activeNodeId && <ViewSelector view={view} onSelect={setView} />}
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {view === "editor" ? (
          <NodeEditor />
        ) : (
          <CollapsiblePanel title="Elements" hasBorder={false}>
            <ComponentTree />
          </CollapsiblePanel>
        )}
      </div>
    </div>
  );
};
