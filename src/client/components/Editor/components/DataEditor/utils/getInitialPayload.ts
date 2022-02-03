import { Template } from "@client/components/Editor/types";
import dot from "dot-object";
import { recursivelyGetAbsoluteKey, removeKeyNesting } from "src/utils/absolute-key";

const regex = new RegExp(/{{\s*([^}]+)\s*}}/, "g");

export const getInitialPayload = (nodes: Template["nodes"]): Record<string, any> => {
  const nodeIds = Object.keys(nodes);

  let dataKeys: Record<string, any> = {};

  console.log(nodeIds);

  nodeIds.forEach((id) => {
    const node = nodes[id as keyof typeof nodes];

    // no need to run this code if we're further up the tree since we're recursively calling this function and/or running this only on image nodes.
    if (node.type === "page" || (node.nodes && node.nodes?.length > 0)) return;

    if (!!node.key) {
      const absoluteKey = removeKeyNesting(recursivelyGetAbsoluteKey(nodes, id));

      dataKeys[absoluteKey] = "";

      return;
    }

    if (node.type !== "text" || !node.text) return false;

    node.text.match(regex)?.forEach((match) => {
      const key = match.replace("{{", "").replace("}}", "");

      const absoluteKey = removeKeyNesting(recursivelyGetAbsoluteKey(nodes, id, key));

      dataKeys[absoluteKey] = "";
    });
  });

  return dot.object(dataKeys);
};
