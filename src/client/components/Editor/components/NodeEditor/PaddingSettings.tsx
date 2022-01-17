import React from "react";
import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { FourSidedPanelInput, Direction } from "../FourSidedPanelInput";
import { CollapsiblePanel } from "./CollapsiblePanel";

type Props = { nodeId: Node["id"] };

type ChangeParams = {
  value: number;
  direction: Direction;
  attribute: "margin" | "padding";
};

export const PaddingSettings = ({ nodeId }: Props) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  if (!node) return null;

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
      [`${attribute}${capitalizedDirection}`]: value,
    });
  };

  return (
    <CollapsiblePanel title="Margins & Padding">
      <div className="p-2 h-60">
        <FourSidedPanelInput
          label="Margin"
          topValue={styles.marginTop}
          leftValue={styles.marginLeft}
          rightValue={styles.marginRight}
          bottomValue={styles.marginBottom}
          onChange={(direction, value) => handleChange({ direction, value, attribute: "margin" })}
        >
          <FourSidedPanelInput
            label="Padding"
            topValue={styles.paddingTop}
            leftValue={styles.paddingLeft}
            rightValue={styles.paddingRight}
            bottomValue={styles.paddingBottom}
            onChange={(direction, value) =>
              handleChange({ direction, value, attribute: "padding" })
            }
          />
        </FourSidedPanelInput>
      </div>
    </CollapsiblePanel>
  );
};
