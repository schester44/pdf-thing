import { Node } from "../../types";
import { LayoutSettings } from "./LayoutSettings";
import { SizeSettings } from "./SizeSettings";
import { BordersSettings } from "./BordersSettings";
import { EffectsSettings } from "./EffectsSettings";
import { memo } from "react";

type Props = {
  nodeId: Node["id"];
};

export const ViewTools = memo(({ nodeId }: Props) => {
  return (
    <div>
      <LayoutSettings nodeId={nodeId} />
      <SizeSettings nodeId={nodeId} />
      <BordersSettings nodeId={nodeId} />
      <EffectsSettings nodeId={nodeId} />
    </div>
  );
});
