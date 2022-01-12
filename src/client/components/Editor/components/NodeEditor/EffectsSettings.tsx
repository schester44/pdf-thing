import { Node } from "../../types";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node['id'] };

export const EffectsSettings = ({ nodeId }: Props) => {
  return (
    <CollapsiblePanel title="Effects">
      <div className="p-3">
        <Setting name="Opacity"></Setting>
      </div>
    </CollapsiblePanel>
  );
};
