import cn from "classnames";

import { Node } from "../../types";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { PanelSection } from "./CollapsiblePanel/PanelSection";
import { Setting } from "./CollapsiblePanel/Setting";
import { TiMediaPauseOutline, TiEqualsOutline } from "react-icons/ti";
import { BsAlignStart, BsAlignEnd, BsAlignTop, BsAlignBottom } from "react-icons/bs";
import { RiAlignJustify, RiAlignLeft, RiAlignRight, RiAlignCenter } from "react-icons/ri";
import { CgDisplayFlex } from "react-icons/cg";
import { AiOutlinePicCenter } from "react-icons/ai";

import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { IconButton } from "../IconButton";
import { MdAlignHorizontalCenter, MdAlignVerticalCenter } from "react-icons/md";

type Props = { nodeId: Node["id"] };

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
        <Setting name="Justify">
          <IconButton
            className="mr-2"
            isActive={styles.justifyContent === "flex-start"}
            onClick={() => {
              setStyle({ justifyContent: "flex-start" });
            }}
          >
            {styles.flexDirection === "column" ? <BsAlignTop /> : <BsAlignStart />}
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.justifyContent === "center"}
            onClick={() => {
              setStyle({ justifyContent: "center" });
            }}
          >
            {styles.flexDirection === "column" ? (
              <MdAlignVerticalCenter />
            ) : (
              <MdAlignHorizontalCenter />
            )}
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.justifyContent === "flex-end"}
            onClick={() => {
              setStyle({ justifyContent: "flex-end" });
            }}
          >
            {styles.flexDirection === "column" ? <BsAlignBottom /> : <BsAlignEnd />}
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.justifyContent === "space-between"}
            onClick={() => {
              setStyle({ justifyContent: "space-between" });
            }}
          >
            <CgDisplayFlex className={styles.flexDirection === "column" ? "rotate-90" : ""} />
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.justifyContent === "space-around"}
            onClick={() => {
              setStyle({ justifyContent: "space-around" });
            }}
          >
            <AiOutlinePicCenter className={styles.flexDirection === "column" ? "" : "rotate-90"} />
          </IconButton>
        </Setting>

        <Setting name="Align">
          <IconButton
            className="mr-2"
            isActive={styles.alignItems === "flex-start"}
            onClick={() => {
              setStyle({ alignItems: "flex-start" });
            }}
          >
            {styles.flexDirection === "column" ? <BsAlignStart /> : <BsAlignTop />}
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.alignItems === "center"}
            onClick={() => {
              setStyle({ alignItems: "center" });
            }}
          >
            {styles.flexDirection === "column" ? (
              <MdAlignHorizontalCenter />
            ) : (
              <MdAlignVerticalCenter />
            )}
          </IconButton>

          <IconButton
            className="mr-2"
            isActive={styles.alignItems === "flex-end"}
            onClick={() => {
              setStyle({ alignItems: "flex-end" });
            }}
          >
            {styles.flexDirection === "column" ? <BsAlignEnd /> : <BsAlignBottom />}
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
