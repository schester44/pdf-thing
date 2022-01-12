import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { nodesState, selectedNodeState } from "../../recoil/atoms";
import { isActiveNode, isNodeVisible } from "../../recoil/selectors";

import { nodeMap } from "./nodes";

type Props = {
  id: string;
};

export const Node = ({ id }: Props) => {
  const node = useRecoilValue(nodesState(id));
  const setActiveNode = useSetRecoilState(selectedNodeState);
  const isSelected = useRecoilValue<boolean>(isActiveNode(id));
  const isVisible = useRecoilValue(isNodeVisible(id));

  const [isHoverOver, setHover] = useState(false);

  console.log(node?.name, isVisible);

  if (!node || !isVisible) return null;

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Component node={node} isSelected={isSelected} isHoverOver={isHoverOver} />
    </div>
  );
};
