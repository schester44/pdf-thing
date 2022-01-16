import { useRecoilCallback } from "recoil";
import invariant from "tiny-invariant";
import { Node } from "../../types";
import { nodesState } from "../atoms";

type MoveNodeArgs = {
  movingNodeId: Node["id"];
  newParentNodeId: Node["id"];
};

export function useMoveNode() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async ({ movingNodeId, newParentNodeId }: MoveNodeArgs) => {
        const node = snapshot.getLoadable(nodesState(movingNodeId)).contents;

        invariant(node);

        // remove the moving node from its current parent
        set(nodesState(node.parentId), (node) => {
          if (!node) return node;

          const nodes = (node.nodes || []).filter((id) => id !== movingNodeId);

          return {
            ...node,
            nodes,
          };
        });

        set(nodesState(node.id), () => {
          return {
            ...node,
            parentId: newParentNodeId,
          };
        });

        set(nodesState(newParentNodeId), (parentNode) => {
          invariant(parentNode);

          // tood: ugly syntax.. if this is a view node then nodes should always exist
          return {
            ...parentNode,
            nodes: (parentNode.nodes || []).concat(node.id),
          };
        });

        return node;
      }
  );
}
