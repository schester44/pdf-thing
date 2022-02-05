import { Node } from "../../../types";

export type BaseNodeProps = {
  node: Node;
  path: string;
  isSelected: boolean;
  isHoverOver: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
