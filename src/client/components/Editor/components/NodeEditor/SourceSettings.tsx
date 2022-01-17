import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { Input } from "../inputs/Input";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

export const SourceSettings = ({ nodeId }: Props) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  const debouncedStateUpdateTimer = useRef<number>();

  const src = node?.props?.src || "";

  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  if (!node) return null;

  return (
    <CollapsiblePanel title="Image">
      <div className="px-3 pt-1">
        <Setting name="Source">
          <Input
            name="src"
            value={imageSrc}
            onChange={(e) => {
              const src = e.target.value.trim();
              setImageSrc(src);

              if (debouncedStateUpdateTimer.current) {
                clearTimeout(debouncedStateUpdateTimer.current);
              }

              // @ts-ignore
              debouncedStateUpdateTimer.current = setTimeout(() => {
                setNodeState((node) => {
                  if (!node) return node;

                  return {
                    ...node,
                    props: {
                      ...node.props,
                      src,
                    },
                  };
                });
              }, 500);
            }}
          />
        </Setting>
      </div>
    </CollapsiblePanel>
  );
};
