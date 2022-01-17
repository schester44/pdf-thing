import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { nodesState, selectedNodeState } from "../../recoil/atoms";
import { isActiveNode, isNodeVisible } from "../../recoil/selectors";

import { nodeMap } from "./nodes";

type Props = {
  id: string;

  // onMouseEnter and onMouseLeave are for recursively updating the parent Node's `isChildHovering` state for displaying the hover placeholder
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const Node = ({ id, onMouseEnter, onMouseLeave }: Props) => {
  const node = useRecoilValue(nodesState(id));
  const setActiveNode = useSetRecoilState(selectedNodeState);
  const isSelected = useRecoilValue<boolean>(isActiveNode(id));
  const isVisible = useRecoilValue(isNodeVisible(id));

  const [isHoverOver, setHover] = useState(false);
  const [isChildHovering, setChildHovering] = useState(false);

  if (!node || !isVisible) return null;

  const _onMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter();
    }
    setHover(true);
  };

  const _onMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave();
    }

    setHover(false);
  };

  const Component = nodeMap[node.type as keyof typeof nodeMap];

  if (!Component) return null;

  return (
    <div
      data-id={id}
      className="relative cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        setActiveNode(id);
      }}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
    >
      <Component
        node={node}
        isSelected={isSelected}
        isHoverOver={isHoverOver && !isChildHovering}
        onMouseEnter={() => setChildHovering(true)}
        onMouseLeave={() => setChildHovering(false)}
      />
    </div>
  );
};
