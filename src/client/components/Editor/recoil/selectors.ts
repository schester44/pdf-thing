import { selector } from "recoil";
import memoize from "../utils/memoize";
import {
  nodesState,
  selectedNodeState,
  collapsedTreeNodesState,
  collapsedSettingsPanelState,
  hiddenNodesState,
} from "./atoms";

export const isNodeVisible = memoize((id: string) =>
  selector<boolean>({
    key: `isNodeVisible-${id}`,
    get: ({ get }) => {
      const ids = get(hiddenNodesState);

      return !ids[id];
    },

    set: ({ set }, hidden) => {
      set(hiddenNodesState, (prev) => {
        return {
          ...prev,
          [id]: !hidden,
        };
      });
    },
  })
);

export const isSettingsPanelCollapsed = memoize((id: string) =>
  selector({
    key: `isSettingsPanelCollapsed-${id}`,
    get: ({ get }) => {
      const ids = get(collapsedSettingsPanelState);

      return ids.includes(id);
    },

    set: ({ set, get }, collapsed) => {
      const ids = get(collapsedSettingsPanelState);

      if (collapsed) {
        set(collapsedSettingsPanelState, () => [...ids, id]);
      } else {
        set(collapsedSettingsPanelState, () => ids.filter((i) => i !== id));
      }
    },
  })
);

export const isTreeNodeCollapsed = memoize((id: string) =>
  selector({
    key: `isTreeNodeCollapsed-${id}`,
    get: ({ get }) => {
      const ids = get(collapsedTreeNodesState);

      return ids.includes(id);
    },

    set: ({ set, get }, collapsed) => {
      const ids = get(collapsedTreeNodesState);

      if (collapsed) {
        set(collapsedTreeNodesState, () => [...ids, id]);
      } else {
        set(collapsedTreeNodesState, () => ids.filter((i) => i !== id));
      }
    },
  })
);

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
