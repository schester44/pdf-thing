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

export const nodesState = atomFamily<Node | undefined, string>({
  key: "nodesState",
  default: undefined,
});

export const selectedNodeState = atom<string | undefined>({
  key: "selectedNodesState",
  default: undefined,
});

export const localStorageState = memoize((key: string) => {
  return atom({ key: `recoilLocalStorage-${key}`, default: undefined });
});
