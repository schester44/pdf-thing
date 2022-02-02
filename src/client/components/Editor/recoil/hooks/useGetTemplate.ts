import { useRecoilCallback } from "recoil";
import { documentState, nodeIdsState, nodesState } from "../atoms";

export const useGetTemplate = () => {
  return useRecoilCallback(({ snapshot }) => {
    return () => {
      const nodeIds = snapshot.getLoadable(nodeIdsState).contents;
      const template = snapshot.getLoadable(documentState).contents;

      const nodes: Record<string, any> = {};
      const pageIds: string[] = [];

      nodeIds.map((nodeId: string) => {
        const node = snapshot.getLoadable(nodesState(nodeId)).contents;

        nodes[node.id] = node;

        if (node.type === "page") {
          pageIds.push(node.id);
        }

        return node;
      });

      console.log(pageIds, nodeIds);

      return {
        id: template.id,
        key: template.key,
        name: template.name,
        nodes,
        pageIds,
      };
    };
  });
};
