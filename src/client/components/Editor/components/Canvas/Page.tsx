import cn from "classnames";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { useNewNode } from "../../recoil/hooks";
import { Node as NodeI } from "../../types";
import { Node } from "./Node";

type Props = {
  id: string;
  scale: number;
  width: number;
  height: number;
};

type CollectedProps = {
  isOver: boolean;
};

type DroppedItem = {
  type: NodeI["type"];
};

export const Page = ({ id, width, height, scale }: Props) => {
  const page = useRecoilValue(nodesState(id));
  const createNode = useNewNode();
  const [hoveredNode, setHoveredNode] = useState();

  const [collectedProps, drop] = useDrop<DroppedItem, void, CollectedProps>({
    accept: ["view", "image", "text"],
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover: (item, monitor) => {},
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();

      console.log(didDrop, item);

      // already dropped in a child node
      if (didDrop) return;

      createNode({ type: item.type, parentId: id });
    },
  });

  if (!page) return null;

  return drop(
    <div
      data-type="page"
      className={cn("rounded-lg bg-white overflow-hidden shadow-lg", {
        "shadow-green-400": collectedProps.isOver,
        "border-white": !collectedProps.isOver,
      })}
      style={{
        width: width * scale,
        height: height * scale,
      }}
    >
      <div
        style={{
          width: width,
          height: height,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          direction: "ltr",
        }}
      >
        <div className="page">
          {(page.nodes || []).map((nodeId) => {
            console.log(page);
            return (
              <Node
                path={page.key!}
                id={nodeId}
                key={nodeId}
                isHovering={nodeId === hoveredNode}
                onMouseEnter={() => setHoveredNode(nodeId)}
                onMousLeave={() => setHoveredNode(undefined)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
