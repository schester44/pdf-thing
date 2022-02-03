import { Template } from "@client/components/Editor/types";

export const createNextPath = (path: string | undefined, key: string | undefined) => {
  let nextPath = "";

  if (path) {
    nextPath = `${path}`;
  }

  if (path && key) {
    nextPath += ".";
  }

  if (key) {
    nextPath += `${key}`;
  }

  return nextPath;
};

export const recursivelyGetAbsoluteKey = (
  nodes: Template["nodes"],
  nodeId: string,
  key?: string
): string => {
  const node = nodes[nodeId];
  const parentNodeId = node.parentId;

  const parentIsPage = parentNodeId && nodes[parentNodeId]?.type === "page";

  if (parentNodeId && !parentIsPage) {
    const parentNode = nodes[parentNodeId];

    return (
      recursivelyGetAbsoluteKey(nodes, parentNodeId) +
      (parentNode.props?.repeats ? "[0]" : "") +
      "." +
      (key || node.key)
    );
  } else {
    return key || node.key || node.id;
  }
};

export const removeKeyNesting = (key: string): string => {
  const parts = key.split(".");

  let newKey = "";

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // if it ends with a bracket then its an array so we want to keep it around because it should contain data
    // parts that are not arrays _shouldnt_ be needed since we strip them to flatten the payload shape
    if (part.endsWith("]") && i !== parts.length - 1) {
      newKey += `${part}.`;
    }
  }

  newKey += parts[parts.length - 1];

  return newKey;
};
