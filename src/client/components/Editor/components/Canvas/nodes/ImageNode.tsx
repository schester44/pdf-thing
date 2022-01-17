import { NodeContainer } from "../NodeContainer";
import { IoMdImage } from "react-icons/io";
import { BaseNodeProps } from "./types";
import { marginStyles } from "../utils/marginStyles";

export const ImageNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  if (!node.props?.src) {
    return (
      <div className="rounded-lg w-24 h-24 bg-gray-200 text-indigo-500 flex items-center justify-center">
        <IoMdImage className="text-6xl" />
      </div>
    );
  }

  return (
    <NodeContainer isHoverOver={isHoverOver} isSelected={isSelected}>
      <img
        src={node.props?.src}
        style={{
          ...node.styles,
          ...marginStyles(node),
          opacity: (node.styles?.opacity ?? 100) / 100,
        }}
      />
    </NodeContainer>
  );
};
