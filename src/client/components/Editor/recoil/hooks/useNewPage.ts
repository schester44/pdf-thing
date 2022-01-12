import { useRecoilCallback } from "recoil";
import { nodesState, pageIdsState, totalNodeCountsState } from "../atoms";
import { createNode } from "../utils/createPage";

export function useNewPage() {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    const nodeCounts = snapshot.getLoadable(totalNodeCountsState).contents;

    const name = `Page ${nodeCounts.page + 1}`;

    const node = createNode({ type: "page", name });

    set(nodesState(node.id), () => node);

    set(totalNodeCountsState, (counts) => ({
      ...counts,
      [node.type]: counts[node.type] + 1,
    }));

    set(pageIdsState, (ids) => [...ids, node.id]);

    return node;
  });
}
