import { NodeContainer } from "../NodeContainer";
import { marginStyles } from "../utils/marginStyles";
import { BaseNodeProps } from "./types";

export const TextNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  return (
    <NodeContainer isHoverOver={isHoverOver} isSelected={isSelected}>
      <p
        style={{
          ...node.styles,
          ...marginStyles(node),
          opacity: (node.styles?.opacity ?? 100) / 100,
        }}
      >
        {node.text || node.key ? (
          <span>
            {"{{"}
            {node.key}
            {"}}"}
          </span>
        ) : (
          <span>{node.name}</span>
        )}
      </p>
    </NodeContainer>
  );
};
