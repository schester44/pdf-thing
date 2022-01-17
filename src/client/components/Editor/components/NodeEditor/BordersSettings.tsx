import React from "react";
import { CgBorderStyleDashed, CgBorderStyleDotted, CgBorderStyleSolid } from "react-icons/cg";
import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { Direction, FourSidedPanelInput } from "../FourSidedPanelInput";
import { IconButton } from "../IconButton";
import { ColorPicker } from "../inputs/ColorPicker";
import { Input } from "../inputs/Input";
import { NumberInputWithSlider } from "../inputs/NumberInputWithSlider";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

type ChangeParams = {
  value: number;
  direction: Direction;
  attribute: "border";
};

export const BordersSettings = ({ nodeId }: Props) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  const styles = node?.styles || {};

  const setStyle = (newStyles: Record<string, any>) => {
    setNodeState((node) => {
      if (!node) return node;

      return {
        ...node,
        styles: {
          ...node.styles,
          ...newStyles,
        },
      };
    });
  };

  const handleChange = ({ direction, value, attribute }: ChangeParams) => {
    const capitalizedDirection = direction[0].toUpperCase() + direction.slice(1);

    setStyle({
      [`${attribute}${capitalizedDirection}Width`]: value,
    });
  };

  const hasSameWidthSides =
    styles.borderTopWidth === styles.borderRightWidth &&
    styles.borderTopWidth === styles.borderBottomWidth &&
    styles.borderTopWidth === styles.borderLeftWidth;

  const handleGlobalSizeChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = isNaN(Number(target.value)) ? "" : parseFloat(target.value);

    setStyle({
      borderTopWidth: value,
      borderRightWidth: value,
      borderBottomWidth: value,
      borderLeftWidth: value,
    });
  };

  return (
    <CollapsiblePanel title="Borders">
      <div className="p-3">
        <Setting name="Radius">
          <NumberInputWithSlider
            nodeId={nodeId}
            valueKey="borderRadius"
            min="0"
            max="100"
            step="1"
          />
        </Setting>
      </div>

      <PanelSection title="Size">
        <div className="h-32">
          <FourSidedPanelInput
            placeholder="none"
            topValue={styles.borderTopWidth}
            leftValue={styles.borderLeftWidth}
            rightValue={styles.borderRightWidth}
            bottomValue={styles.borderBottomWidth}
            onChange={(direction, value) => handleChange({ direction, value, attribute: "border" })}
          >
            <div className="p-2 flex items-center justify-center">
              <div className="w-22">
                <Input
                  type="number"
                  value={hasSameWidthSides ? styles.borderTopWidth : ""}
                  onChange={handleGlobalSizeChange}
                />
              </div>
            </div>
          </FourSidedPanelInput>
        </div>
      </PanelSection>

      <PanelSection title="Decoration">
        <Setting name="Color">
          <ColorPicker
            value={styles.borderColor}
            onChange={(borderColor) => {
              setStyle({ borderColor });
            }}
          />
        </Setting>
        <Setting name="Style">
          <IconButton
            className="mr-2"
            isActive={styles.borderStyle === "solid"}
            onClick={() => {
              setStyle({ borderStyle: "solid" });
            }}
          >
            <CgBorderStyleSolid />
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.borderStyle === "dashed"}
            onClick={() => {
              setStyle({ borderStyle: "dashed" });
            }}
          >
            <CgBorderStyleDashed />
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.borderStyle === "dotted"}
            onClick={() => {
              setStyle({ borderStyle: "dotted" });
            }}
          >
            <CgBorderStyleDotted />
          </IconButton>
        </Setting>
      </PanelSection>
    </CollapsiblePanel>
  );
};
