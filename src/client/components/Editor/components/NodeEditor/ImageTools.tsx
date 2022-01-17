import { SourceSettings } from "./SourceSettings";
import { Node } from "../../types";
import { MetaSettings } from "./MetaSettings";
import { PaddingSettings } from "./PaddingSettings";
import { SizeSettings } from "./SizeSettings";

type Props = {
  nodeId: Node["id"];
};

export const ImageTools: React.FC<Props> = ({ nodeId }) => {
  return (
    <div>
      <MetaSettings nodeId={nodeId} />
      <SourceSettings nodeId={nodeId} />
      <SizeSettings nodeId={nodeId} />
      <PaddingSettings nodeId={nodeId} />
    </div>
  );
};
