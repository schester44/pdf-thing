import React from "react";
import { Node } from "../../types";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node['id'] };

export const SizeSettings = ({ nodeId }: Props) => {
  return (
    <CollapsiblePanel title="Size">
      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Width"></Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Height"></Setting>
        </div>
      </div>

      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Min Width"></Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Min Height"></Setting>
        </div>
      </div>

      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Max Width"></Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Max Height"></Setting>
        </div>
      </div>
    </CollapsiblePanel>
  );
};
