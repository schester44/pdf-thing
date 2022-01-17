import React from "react";
import { Node } from "../../types";
import { NumberInputWithSlider } from "../inputs/NumberInputWithSlider";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

export const PaddingSettings = ({ nodeId }: Props) => {
  return (
    <CollapsiblePanel title="Margins & Padding">
      <div className="p-3">xx</div>
    </CollapsiblePanel>
  );
};
