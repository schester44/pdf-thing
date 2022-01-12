export type Template = {
  pageIds: Node["id"][];
  nodes: Record<string, Node>;
};

export type Node = {
  id: string;
  name: string;
  key?: string;
  type: "page" | "text" | "view" | "image" | "page_number";
  parentId?: string;
  nodes?: Node["id"][];
  styles?: Record<string, any>;
  props?: Record<string, any>;
  text?: string;
};
