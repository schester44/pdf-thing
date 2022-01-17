import { NodeContainer } from "../NodeContainer";

export const ImageNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  if (!node.props?.src) {
    return <div>Image Placeholder.. allow them to upload or select existing</div>;
  }

  return (
    <NodeContainer node={node} isHoverOver={isHoverOver} isSelected={isSelected}>
      <img
        src={node.props?.src}
        style={{
          ...node.styles,
          opacity: (node.styles?.opacity || 100) / 100,
        }}
      />
    </NodeContainer>
  );
};
