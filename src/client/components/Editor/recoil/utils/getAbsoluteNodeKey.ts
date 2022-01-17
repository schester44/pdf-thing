import { Template } from "../../types";

export const getAbsoluteNodeKey = (
  nodes: Template["nodes"],
  nodeId: string,
  parentIndex?: number
): string => {
  const parent = nodes[nodeId].parentId;
  const parentNode = nodes[parent as keyof typeof nodes];
  const isParentPage = parentNode?.type === "page";

  if (!parent || isParentPage) return nodeId;

  return (
    getAbsoluteNodeKey(nodes, parent) +
    (parentNode.props?.repeats ? "[0]" : "") +
    "." +
    (parentIndex ? `[${parentIndex}].` : "") +
    nodeId
  );
};
