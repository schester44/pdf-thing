import { useRecoilCallback, useSetRecoilState } from "recoil";
import { nodesState, pageIdsState, totalNodeCountsState } from "../atoms";
import { Template } from "../../types";

export function useLoadDocument() {
  const setPageIds = useSetRecoilState(pageIdsState);

  return useRecoilCallback(({ set }) => async (template: Template) => {
    setPageIds(template.pageIds);

    let nodeCounts = {
      page: 0,
      text: 0,
      view: 0,
      image: 0,
      page_number: 0,
    };

    const nodeIds = Object.keys(template.nodes);

    nodeIds.forEach((nodeId) => {
      const node = template.nodes[nodeId];

      nodeCounts[node.type]++;

      set(nodesState(nodeId), () => node);
    });

    set(totalNodeCountsState, () => nodeCounts);
  });
}
