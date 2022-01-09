import React, { useState } from "react";
import cn from "classnames";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nodesState, selectedNodeState } from "../../recoil/atoms";
import { Node as NodeI } from "../../types";
import { useDrop } from "react-dnd";
import { useNewNode } from "../../recoil/hooks";
import { isActiveNode } from "../../recoil/selectors";

type Props = {
  id: string;
};

type BaseNodeProps = {
  node: NodeI;
  isSelected: boolean;
  isHoverOver: boolean;
};

const PageNumberNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  return <span className="border-dotted border-2">Page Number Node</span>;
};

const TextNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  return (
    <span className="border-dotted border-2">
      <span style={node.styles}>{node.text || <span>Text Element</span>}</span>
    </span>
  );
};

const ImageNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  if (!node.props?.src) {
    return <div>Image Placeholder.. allow them to upload or select existing</div>;
  }

  return <img src={node.props?.src} style={node.styles} />;
};

const ViewNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  const createNode = useNewNode();

  const [collectedProps, drop] = useDrop<{ type: NodeI["type"] }, void, { isOver: boolean }>({
    accept: ["view", "image", "text"],
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover: (item, monitor) => {},
    drop: (item, monitor) => {
      createNode({ type: item.type, parentId: node.id });
    },
  });

  return drop(
    <div>
      <NodeContainer
        isDragOver={collectedProps.isOver}
        isHoverOver={isHoverOver}
        isSelected={isSelected}
      >
        <div
          style={node.styles}
          className={cn({
            "fixed bottom-0 left-0": node.props?.fixed,
            "p-4": !node.nodes?.length,
          })}
        >
          {node.nodes?.map((nodeId) => (
            <Node id={nodeId} key={nodeId} />
          ))}
        </div>
      </NodeContainer>
    </div>
  );
};

const nodeMap = {
  text: TextNode,
  image: ImageNode,
  view: ViewNode,
  page_number: PageNumberNode,
};

export const Node = ({ id }: Props) => {
  const node = useRecoilValue(nodesState(id));
  const setActiveNode = useSetRecoilState(selectedNodeState);
  const isSelected = useRecoilValue<boolean>(isActiveNode(id));
  const [isHoverOver, setHover] = useState(false);

  if (!node) return null;

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const Component = nodeMap[node.type as keyof typeof nodeMap];

  if (!Component) return null;

  console.log(isSelected);
  return (
    <div
      className="relative"
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

type NodeContainerProps = {
  isDragOver: boolean;
  isHoverOver: boolean;
  isSelected: boolean;
};

const NodeContainer: React.FC<NodeContainerProps> = ({
  children,
  isDragOver,
  isHoverOver,
  isSelected,
}) => {
  return (
    <>
      <div
        className={cn("w-full h-full absolute", {
          "border-dashed border-2": isHoverOver && !isSelected && !isDragOver,
          "border-dashed border-2 border-indigo-500": isDragOver && !isSelected,
          "border-solid border-2 border-indigo-500": isSelected,
        })}
      />

      {children}
    </>
  );
};
