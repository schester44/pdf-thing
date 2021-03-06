import { useRecoilCallback, useSetRecoilState } from "recoil";
import {
  documentState,
  nodeIdsState,
  nodesState,
  pageIdsState,
  totalNodeCountsState,
} from "../atoms";
import { Template } from "../../types";

export function useLoadDocument() {
  const setPageIds = useSetRecoilState(pageIdsState);

  return useRecoilCallback(({ set }) => async (template: Template) => {
    setPageIds(template.pageIds);

    set(documentState, (doc) => {
      return {
        ...doc,
        id: template.id,
        key: template.key,
        name: template.name,
      };
    });

    let nodeCounts = {
      page: 0,
      text: 0,
      view: 0,
      image: 0,
      page_number: 0,
    };

    set(nodeIdsState, template.nodeIds);

    template.nodeIds.forEach((nodeId) => {
      const node = template.nodes[nodeId];

      nodeCounts[node.type]++;

      set(nodesState(nodeId), () => node);
    });

    set(totalNodeCountsState, () => nodeCounts);
  });
}
