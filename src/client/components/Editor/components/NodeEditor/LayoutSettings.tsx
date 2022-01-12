import React from "react";
import { Node } from "../../types";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node['id'] };

export const LayoutSettings = ({ nodeId }: Props) => {
  return (
    <CollapsiblePanel title="Layout">
      <PanelSection title="Flex Items">
        <Setting name="Direction"></Setting>
        <Setting name="Justify"></Setting>
        <Setting name="Align"></Setting>
      </PanelSection>

      <PanelSection title="Selected Item">
        <Setting name="Align"></Setting>
        <Setting name="Flex"></Setting>
      </PanelSection>

      <PanelSection title="Content">
        <Setting name="Wrap"></Setting>
        <Setting name="Align"></Setting>
      </PanelSection>
    </CollapsiblePanel>
  );
};
