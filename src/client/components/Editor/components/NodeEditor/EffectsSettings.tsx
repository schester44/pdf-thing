import { Node } from "../../types";
import { NumberInputWithSlider } from "../inputs/NumberInput";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

export const EffectsSettings = ({ nodeId }: Props) => {
  return (
    <CollapsiblePanel title="Effects">
      <div className="p-3">
        <Setting name="Opacity">
          <NumberInputWithSlider nodeId={nodeId} valueKey="opacity" min="0" max="1" step="0.1" />
        </Setting>
      </div>
    </CollapsiblePanel>
  );
};
