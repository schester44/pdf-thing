export const ImageNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  if (!node.props?.src) {
    return <div>Image Placeholder.. allow them to upload or select existing</div>;
  }

  return <img src={node.props?.src} style={node.styles} />;
};
