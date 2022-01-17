import { memo } from "react";
import { Node } from "../../types";
import { EffectsSettings } from "./EffectsSettings";
import { MetaSettings } from "./MetaSettings";
import { TypographySettings } from "./TypographySettings";

type Props = {
  nodeId: Node["id"];
};

export const TextTools = memo(({ nodeId }: Props) => {
  return (
    <div>
      <MetaSettings nodeId={nodeId} />
      <TypographySettings nodeId={nodeId} />
      <EffectsSettings nodeId={nodeId} />
    </div>
  );
});
