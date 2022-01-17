import { Menu } from "@headlessui/react";
import React from "react";
import { RiAlignCenter, RiAlignJustify, RiAlignLeft, RiAlignRight } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { Dropdown, MenuItem } from "../Dropdown";
import { IconButton } from "../IconButton";
import { ColorPicker } from "../inputs/ColorPicker";
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
          <Dropdown
            dropdownClassNames="w-full"
            content={
              <>
                <MenuItem>Times New Roman</MenuItem>
                <MenuItem>Ubuntu Pro</MenuItem>
                <MenuItem>Ubuntu Pro Bold</MenuItem>
                <MenuItem>Ubuntu Pro Italic</MenuItem>
                <MenuItem>Random Font</MenuItem>
                <MenuItem>Random Font Bold</MenuItem>
              </>
            }
          >
            <Menu.Button className="bg-gray-600 hover:bg-gray-700 text-xs px-2 py-1 w-full text-left rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 hover:text-white">
              Times New Roman
            </Menu.Button>
          </Dropdown>
        </Setting>
        <Setting name="Size">Font Size, Line height, spacing</Setting>
        <Setting name="Color">
          <ColorPicker
            value={styles.color}
            onChange={(value) => {
              setStyle({
                color: value,
              });
            }}
          />
          <div></div>
        </Setting>
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
