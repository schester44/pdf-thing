import { selector } from "recoil";
import memoize from "../utils/memoize";
import { nodesState, selectedNodeState } from "./atoms";
import { Node } from "../types";

export const nodeById = memoize((id: string) =>
  selector({
    key: `node${id}`,
    get: ({ get }) => {
      return get(nodesState(id));
    },

    set: ({ set }, newValue) => {
      const state = nodesState(id);

      // todo TS
      set(state, newValue);
    },
  })
);

export const activeNodeSelector = selector({
  key: "activeNodeSelector",
  get: ({ get }) => {
    const activeNodeId = get(selectedNodeState);

    return activeNodeId ? get(nodesState(activeNodeId)) : undefined;
  },
  set: ({ set, get }, newValues: any) => {
    const activeNodeId = get(selectedNodeState);

    if (!activeNodeId) return;

    set(nodesState(activeNodeId), (node) => ({ ...node, ...newValues }));
  },
});

export const isActiveNode = memoize((id: string) =>
  selector({
    key: `isActiveNode-${id}`,
    get: ({ get }) => {
      const activeNodId = get(selectedNodeState);

      return id === activeNodId;
    },
  })
);
