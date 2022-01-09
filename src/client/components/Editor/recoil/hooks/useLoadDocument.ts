import { useRecoilCallback, useSetRecoilState } from "recoil";
import { documentState, nodesState, pageIdsState } from "../atoms";
import { Template } from "../../types";

export function useLoadDocument() {
  const setDocumentState = useSetRecoilState(documentState);
  const setPageIds = useSetRecoilState(pageIdsState);

  return useRecoilCallback(({ set }) => async (template: Template) => {
    setPageIds(template.pageIds);

    template.pageIds.forEach((pageId) => {});

    const nodeIds = Object.keys(template.nodes);

    nodeIds.forEach((nodeId) => {
      const node = template.nodes[nodeId];

      set(nodesState(nodeId), () => node);
    });
  });
}
