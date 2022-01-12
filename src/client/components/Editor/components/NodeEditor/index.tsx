import { useRecoilValue } from "recoil";
import { activeNodeSelector } from "../../recoil/selectors";
import { TextTools } from "./TextTools";
import { ImageTools } from "./ImageTools";
import { ViewTools } from "./ViewTools";

export const NodeEditor = () => {
  const activeNode = useRecoilValue(activeNodeSelector);

  if (!activeNode) return <div>No active node</div>;

  if (activeNode.type === "text") {
    return <TextTools node={activeNode} />;
  }

  if (activeNode.type === "image") {
    return <ImageTools node={activeNode} />;
  }

  if (activeNode.type === "view") {
    return <ViewTools nodeId={activeNode.id} />;
  }

  return <div>no tools implemented for type {activeNode.type}</div>;
};
