import React from "react";
import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { Input } from "../inputs/Input";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

export const TextSettings = ({ nodeId }: Props) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  if (!node) return null;

  return (
    <CollapsiblePanel title="Text">
      <div className="flex px-3 py-2">
        <textarea
          value={node.text || ""}
          className="bg-gray-700 text-white text-sm rounded p-1 outline-none w-full"
          onChange={(e) => {
            setNodeState((node) => {
              if (!node) return node;

              return {
                ...node,
                text: e.target.value,
              };
            });
          }}
        ></textarea>
      </div>
    </CollapsiblePanel>
  );
};
