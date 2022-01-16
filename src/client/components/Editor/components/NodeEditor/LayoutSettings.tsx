import cn from "classnames";

import { Node } from "../../types";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";
import { TiMediaPauseOutline, TiEqualsOutline } from "react-icons/ti";
import { BsAlignStart, BsAlignCenter, BsAlignEnd } from "react-icons/bs";
import { RiAlignJustify, RiAlignLeft, RiAlignRight, RiAlignCenter } from "react-icons/ri";

import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";

type Props = { nodeId: Node["id"] };

const IconButton: React.FC<{
  isActive?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ className, children, isActive, onClick }) => {
  return (
    <button
      className={cn("bg-gray-700 hover:bg-gray-600 rounded p-1", {
        [className as string]: !!className,
        ["border border-transparent"]: !isActive && typeof isActive !== "undefined",
        ["border border-indigo-600 text-indigo-400 hover:bg-gray-700 cursor-default"]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const LayoutSettings = ({ nodeId }: Props) => {
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
    <CollapsiblePanel title="Layout">
      <PanelSection title="Flex Items">
        <Setting name="Direction">
          <IconButton
            className="mr-2"
            isActive={styles.flexDirection === "row"}
            onClick={() => {
              setStyle({ flexDirection: "row" });
            }}
          >
            <TiMediaPauseOutline className="text-lg" />
          </IconButton>

          <IconButton
            isActive={styles.flexDirection === "column"}
            onClick={() => {
              setStyle({ flexDirection: "column" });
            }}
          >
            <TiEqualsOutline className="text-lg" />
          </IconButton>
        </Setting>
        <Setting name="Justify"></Setting>
        <Setting name="Align">
          <IconButton
            className="mr-2"
            isActive={styles.alignItems === "flex-start"}
            onClick={() => {
              setStyle({ alignItems: "flex-start" });
            }}
          >
            <BsAlignStart />
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.alignItems === "center"}
            onClick={() => {
              setStyle({ alignItems: "center" });
            }}
          >
            <BsAlignCenter />
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.alignItems === "flex-end"}
            onClick={() => {
              setStyle({ alignItems: "flex-end" });
            }}
          >
            <BsAlignEnd />
          </IconButton>
        </Setting>
      </PanelSection>

      <PanelSection title="Selected Item">
        <Setting name="Align"></Setting>
        <Setting name="Flex"></Setting>
      </PanelSection>

      <PanelSection title="Content">
        <Setting name="Wrap"></Setting>
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
