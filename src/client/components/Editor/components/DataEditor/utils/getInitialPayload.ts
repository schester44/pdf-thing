import { Template } from "@client/components/Editor/types";
import dot from "dot-object";

const recursivelyGetParentId = (
  nodes: Template["nodes"],
  nodeId: string,
  parentIndex?: number
): string => {
  const parent = nodes[nodeId].parentId;
  const parentIsPage = parent && nodes[parent]?.type === "page";

  if (parent && !parentIsPage) {
    const parentNode = nodes[parent];

    return (
      recursivelyGetParentId(nodes, parent) +
      (parentNode.props?.repeats ? "[0]" : "") +
      "." +
      (parentIndex ? `[${parentIndex}].` : "") +
      nodeId
    );
  } else {
    return nodeId;
  }
};

export const getInitialPayload = (nodes: Template["nodes"]): Record<string, any> => {
  const nodeIds = Object.keys(nodes);

  let dataKeys: Record<string, any> = {};

  nodeIds.forEach((id) => {
    const node = nodes[id as keyof typeof nodes];

    if (!!node.key) {
      const absoluteId = recursivelyGetParentId(nodes, id);

      dataKeys[absoluteId] = "";

      return;
    }

    if (node.type !== "text" || !node.text) return false;

    const regex = new RegExp(/{{\s*([^}]+)\s*}}/, "g");

    node.text.match(regex)?.forEach((match) => {
      const key = match.replace("{{", "").replace("}}", "");

      dataKeys[key] = "";
    });
  });

  return dot.object(dataKeys);
};
