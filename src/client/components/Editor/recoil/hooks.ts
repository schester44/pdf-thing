import { useRecoilCallback } from "recoil";
import { Node } from "../types";
import { nodeIdsState, nodesState, selectedNodeState, totalNodeCountsState } from "./atoms";
import { activeNodeSelector } from "./selectors";
import { createNode } from "./utils/createPage";

type NewNodeArgs = {
  type: Node["type"];
  parentId: Node["id"];
  positionInParent?: number;
  styles?: Node["styles"];
  nodes?: Node["nodes"];
};

export function useNewNode() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async ({ type, parentId, positionInParent }: NewNodeArgs) => {
        const nodeCounts = snapshot.getLoadable(totalNodeCountsState).contents;

        const name = `${type === "view" ? "container" : type} ${nodeCounts[type] + 1}`;

        const node = createNode({ type, parentId, name });

        set(nodesState(node.id), () => node);

        set(totalNodeCountsState, (counts) => ({
          ...counts,
          [node.type]: counts[node.type] + 1,
        }));

        set(selectedNodeState, node.id);

        set(nodeIdsState, (ids) => [...ids, node.id]);

        set(nodesState(parentId), (parentNode) => {
          if (!parentNode) return parentNode;

          let position = positionInParent || (parentNode.nodes || []).length;

          // tood: ugly syntax.. if this is a view node then nodes should always exist
          return {
            ...parentNode,
            nodes: [
              ...(parentNode.nodes || []).slice(0, position),
              node.id,
              ...(parentNode.nodes || []).slice(position),
            ],
          };
        });

        return node;
      }
  );
}
