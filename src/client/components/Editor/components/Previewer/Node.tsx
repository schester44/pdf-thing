import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { useRecoilValue } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node as NodeI } from "../../types";

type Props = {
  id: string;
};

export const Node = ({ id }: Props) => {
  const node = useRecoilValue(nodesState(id));

  if (!node) return null;

  if (node.type === "view") {
    return <ViewNode node={node} />;
  }

  if (node.type === "text") {
    return <TextNode node={node} />;
  }

  return null;
};

export const TextNode = ({ node }: { node: NodeI }) => {
  return <Text style={node.styles}>{node.text || "nothing to see here"}</Text>;
};

export const ViewNode = ({ node }: { node: NodeI }) => {
  return (
    <View style={node.styles}>
      {node.nodes?.map((nodeId) => (
        <Node id={nodeId} key={nodeId} />
      ))}
    </View>
  );
};
