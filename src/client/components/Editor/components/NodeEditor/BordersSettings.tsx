import React from "react";
import { Node } from "../../types";
import { NumberInputWithSlider } from "../inputs/NumberInput";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

export const BordersSettings = ({ nodeId }: Props) => {
  return (
    <CollapsiblePanel title="Borders">
      <div className="p-3">
        <Setting name="Radius">
          <NumberInputWithSlider nodeId={nodeId} valueKey="borderRadius" min="0" />
        </Setting>
      </div>

      <PanelSection title="Size"></PanelSection>

      <PanelSection title="Decoration">
        <Setting name="Color"></Setting>
        <Setting name="Style"></Setting>
      </PanelSection>
    </CollapsiblePanel>
  );
};
