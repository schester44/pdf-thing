import React from "react";
import { RiAlignCenter, RiAlignJustify, RiAlignLeft, RiAlignRight } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { IconButton } from "../IconButton";
import { ColorPicker } from "../inputs/ColorPicker";
import FontPicker from "../inputs/FontPicker";
import { Input } from "../inputs/Input";
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
          <FontPicker
            value={styles.fontFamily}
            onChange={(fontFamily) =>
              setStyle({
                fontFamily,
              })
            }
          />
        </Setting>
        <Setting name="Size">
          <div className="flex">
            <div className="w-1/3">
              <Input
                type="number"
                value={styles.fontSize}
                onChange={({ target: { value } }) =>
                  setStyle({ fontSize: isNaN(Number(value)) ? "" : Number(value) })
                }
              />
              <div className="text-[9px] text-center text-gray-500">Font size</div>
            </div>

            <div className="w-1/3 px-2">
              <Input
                type="number"
                value={styles.lineHeight}
                onChange={({ target: { value } }) =>
                  setStyle({ lineHeight: isNaN(Number(value)) ? "" : Number(value) })
                }
              />
              <div className="text-[9px] text-center text-gray-500">Line height</div>
            </div>

            <div className="w-1/3">
              <Input
                type="number"
                value={styles.letterSpacing}
                onChange={({ target: { value } }) =>
                  setStyle({ letterSpacing: isNaN(Number(value)) ? "" : Number(value) })
                }
              />
              <div className="text-[9px] text-center text-gray-500">Letter spacing</div>
            </div>
          </div>
        </Setting>
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
