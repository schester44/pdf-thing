export const TextNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  return (
    <span className="border-dotted border-2">
      <span style={node.styles}>{node.text || <span>{node.name}</span>}</span>
    </span>
  );
};
