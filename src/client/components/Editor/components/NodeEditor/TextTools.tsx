import { memo } from "react";
import { Node } from "../../types";
import { EffectsSettings } from "./EffectsSettings";
import { MetaSettings } from "./MetaSettings";
import { TypographySettings } from "./TypographySettings";
import { TextSettings } from "./TextSettings";
import { PaddingSettings } from "./PaddingSettings";

type Props = {
  nodeId: Node["id"];
};

export const TextTools = memo(({ nodeId }: Props) => {
  return (
    <div>
      <MetaSettings nodeId={nodeId} />
      <TextSettings nodeId={nodeId} />
      <TypographySettings nodeId={nodeId} />
      <PaddingSettings nodeId={nodeId} />
      <EffectsSettings nodeId={nodeId} />
    </div>
  );
});
