import { useRecoilCallback } from "recoil";
import invariant from "tiny-invariant";
import { Node } from "../../types";
import { nodesState, totalNodeCountsState } from "../atoms";

export function useDeleteNode() {
  return useRecoilCallback(({ set, snapshot, reset }) => async (id: Node["id"]) => {
    const node = snapshot.getLoadable(nodesState(id)).contents;

    invariant(node);

    reset(nodesState(id));

    // remove the moving node from its current parent
    set(nodesState(node.parentId), (node) => {
      if (!node) return node;

      const nodes = (node.nodes || []).filter((_id) => id !== _id);

      return {
        ...node,
        nodes,
      };
    });

    set(totalNodeCountsState, (counts) => {
      if (!node) return counts;

      return {
        ...counts,
        [node.type]: counts[node.type as keyof typeof counts] - 1,
      };
    });

    return node;
  });
}
