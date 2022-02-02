import { Template } from "@client/components/Editor/types";
import dot from "dot-object";

const recursivelyGetParentId = (nodes: Template["nodes"], nodeId: string): string => {
  const node = nodes[nodeId];
  const parentNodeId = node.parentId;

  const parentIsPage = parentNodeId && nodes[parentNodeId]?.type === "page";

  if (parentNodeId && !parentIsPage) {
    const parentNode = nodes[parentNodeId];

    return (
      recursivelyGetParentId(nodes, parentNodeId) +
      (parentNode.props?.repeats ? "[0]" : "") +
      "." +
      node.key
    );
  } else {
    return node.key || "IF_YOU_SEE_THIS_ITS_A_BUG";
  }
};

const removeKeyNesting = (key: string) => {
  const parts = key.split(".");

  let newKey = "";

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part.endsWith("[0]") && i !== parts.length - 1) {
      newKey += `${part}.`;
    }
  }

  newKey += parts[parts.length - 1];

  return newKey;
};

export const getInitialPayload = (nodes: Template["nodes"]): Record<string, any> => {
  const nodeIds = Object.keys(nodes);

  let dataKeys: Record<string, any> = {};

  nodeIds.forEach((id) => {
    const node = nodes[id as keyof typeof nodes];

    // no need to run this code if we're further up the tree since we're recursively calling this function and/or running this only on image nodes.
    if (node.type === "page" || (node.nodes && node.nodes?.length > 0)) return;

    if (!!node.key) {
      const absoluteId = removeKeyNesting(recursivelyGetParentId(nodes, id));

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
