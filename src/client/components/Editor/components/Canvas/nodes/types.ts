import { Node } from "../../../types";

export type BaseNodeProps = {
  node: Node;
  isSelected: boolean;
  isHoverOver: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
