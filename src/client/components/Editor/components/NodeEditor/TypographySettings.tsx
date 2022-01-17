import React from "react";
import { RiAlignCenter, RiAlignJustify, RiAlignLeft, RiAlignRight } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { Dropdown } from "../Dropdown";
import { IconButton } from "../IconButton";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

export const TypographySettings = ({ nodeId }: Props) => {
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

  return (
    <CollapsiblePanel title="Typography">
      <PanelSection title="Style">
        <Setting name="Font">
          <Dropdown></Dropdown>
        </Setting>
        <Setting name="Size">Font Size, Line height, spacing</Setting>
        <Setting name="Color">color picker</Setting>
        <Setting name="Align">
          <IconButton
            className="mr-2"
            isActive={styles.textAlign === "left"}
            onClick={() => {
              setStyle({
                textAlign: styles.textAlign === "left" ? "initial" : "left",
              });
            }}
          >
            <RiAlignLeft />
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.textAlign === "center"}
            onClick={() => {
              setStyle({ textAlign: "center" });
            }}
          >
            <RiAlignCenter />
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.textAlign === "right"}
            onClick={() => {
              setStyle({ textAlign: "right" });
            }}
          >
            <RiAlignRight />
          </IconButton>

          <IconButton
            isActive={styles.textAlign === "justify"}
            onClick={() => {
              setStyle({ textAlign: "justify" });
            }}
          >
            <RiAlignJustify />
          </IconButton>
        </Setting>
      </PanelSection>
    </CollapsiblePanel>
  );
};
