import { useRecoilCallback } from "recoil";
import { v4 } from "uuid";
import { Node } from "../../types";

export const createNode = ({
  type,
  name,
  parentId,
}: {
  type: Node["type"];
  name?: string;
  parentId?: Node["id"];
}): Node => {
  const id = v4();

  const node: Node = {
    id,
    type,
    parentId,
    name: name || `${type} ${id}`,
    styles: {
      opacity: 1,
    },
  };

  if (node.type === "view") {
    node.nodes = [];

    node.styles = defaultViewStyles();
  }

  return node;
};

const defaultViewStyles = () => {
  return {
    opacity: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
  };
};
