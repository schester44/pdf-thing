import { useRecoilCallback } from "recoil";
import { v4 } from "uuid";
import { Node } from "../types";
import { nodesState } from "./atoms";

const createNode = ({ type, parentId }: { type: Node["type"]; parentId: Node["id"] }): Node => {
  const node: Node = {
    id: v4(),
    type,
    parentId,
  };

  if (node.type === "view") {
    node.nodes = [];
  }

  return node;
};

export function useNewNode() {
  return useRecoilCallback(({ set, snapshot }) => async ({ type, parentId }) => {
    const node = createNode({ type, parentId });

    set(nodesState(node.id), () => node);

    console.log(node, parentId);

    const parentNode = snapshot.getLoadable(nodesState(parentId)).contents;

    set(nodesState(parentId), () => {
      return {
        ...parentNode,
        nodes: [...parentNode.nodes, node.id],
      };
    });

    return node;
  });
}
