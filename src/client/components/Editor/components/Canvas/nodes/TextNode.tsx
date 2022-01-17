import { NodeContainer } from "../NodeContainer";
import { BaseNodeProps } from "./types";

export const TextNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  return (
    <NodeContainer isHoverOver={isHoverOver} isSelected={isSelected}>
      <span className="border-dotted border-2">
        <span
          style={{
            ...node.styles,
            opacity: (node.styles?.opacity || 100) / 100,
          }}
        >
          {node.text || <span>{node.name}</span>}
        </span>
      </span>
    </NodeContainer>
  );
};
