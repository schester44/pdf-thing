import { atom, atomFamily } from "recoil";
import memoize from "../utils/memoize";
import { Node } from "../types";

const defaultDocumentState = {
  id: undefined,
  name: "Untitled Template",
  pageWidth: 2480 / 3,
  pageHeight: 3508 / 3,
};

export const documentState = atom({
  key: "documentState",
  default: defaultDocumentState,
});

export const pageIdsState = atom<string[]>({
  key: "pageIdsState",
  default: [],
});

export const dropPlaceholderState = atom({
  key: "dropPlaceholderState",
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export const hiddenNodesState = atom<Record<Node["id"], boolean>>({
  key: "hiddenNodesState",
  default: {},
});

export const totalNodeCountsState = atom<Record<Node["type"], number>>({
  key: "nodeCounts",
  default: {
    page: 0,
    text: 0,
    view: 0,
    image: 0,
    page_number: 0,
  },
});

export const nodesState = atomFamily<Node | undefined, string>({
  key: "nodesState",
  default: undefined,
});

export const nodeIdsState = atomFamily({
  key: "nodeIdsState",
  default: [],
});

export const collapsedTreeNodesState = atom<string[]>({
  key: "collapsedTreeNodesState",
  default: [],
});

export const collapsedSettingsPanelState = atom<string[]>({
  key: "collapsedSettingsPanelState",
  default: ["Margins & Padding", "Borders", "Effects", "Size"],
});

export const selectedNodeState = atom<string | undefined>({
  key: "selectedNodesState",
  default: undefined,
});

export const localStorageState = memoize((key: string) => {
  return atom({ key: `recoilLocalStorage-${key}`, default: undefined });
});
