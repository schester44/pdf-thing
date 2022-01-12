import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

const Input = ({
  type = "text",
  min,
  value,
  onChange,
}: {
  type?: string;
  min?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      min={min}
      value={value}
      className="bg-gray-700 rounded text-white w-full text-xs p-1 outline-none"
    />
  );
};

const NumberInputWithSlider = ({
  min,
  valueKey,
  nodeId,
}: {
  min?: string;
  valueKey: string;
  nodeId: Node["id"];
}) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  if (!node) return null;

  const styles = node.styles || {};

  return (
    <div className="flex items-center">
      <div className="w-16">
        <Input
          min={min}
          type="number"
          value={styles[valueKey as keyof typeof styles]}
          onChange={({ target: { value } }) => {
            setNodeState((node) => {
              if (!node) return node;

              return {
                ...node,
                styles: {
                  ...node?.styles,
                  [valueKey]: value ? Number(value) : "",
                },
              };
            });
          }}
        />
      </div>
      <div className="text-xs text-white pl-2">slider placeholder</div>
    </div>
  );
};

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
