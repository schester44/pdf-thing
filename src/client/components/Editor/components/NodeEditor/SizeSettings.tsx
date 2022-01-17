import React from "react";
import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { Input } from "../inputs/Input";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

const numberOrNone = (value: string) => {
  const _val = parseFloat(value.trim());

  return isNaN(_val) ? "none" : _val;
};

const numberOrAuto = (value: string) => {
  const _val = parseFloat(value.trim());

  return isNaN(_val) ? "auto" : _val;
};

export const SizeSettings = ({ nodeId }: Props) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  const styles = node?.styles || {};

  const setStyle = (newStyles: Record<string, any>) => {
    setNodeState((node) => {
      if (!node) return node;

      return {
        ...node,
        styles: {
          ...node.styles,
          ...newStyles,
        },
      };
    });
  };

  return (
    <CollapsiblePanel title="Size">
      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Width">
            <div className="w-28 pl-8">
              <Input
                type="number"
                placeholder="auto"
                value={styles.width || ""}
                onChange={(e) => {
                  const width = numberOrAuto(e.target.value);

                  setStyle({ width });
                }}
              />
            </div>
          </Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Height">
            <div className="w-28 pl-8">
              <Input
                type="number"
                placeholder="auto"
                value={styles.height || ""}
                onChange={(e) => {
                  const height = numberOrAuto(e.target.value);

                  setStyle({ height });
                }}
              />
            </div>
          </Setting>
        </div>
      </div>

      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Min Width">
            <div className="w-28 pl-8">
              <Input
                type="number"
                placeholder="none"
                value={styles.minWidth || ""}
                onChange={(e) => {
                  const minWidth = numberOrNone(e.target.value);

                  setStyle({ minWidth });
                }}
              />
            </div>
          </Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Min Height">
            <div className="w-28 pl-8">
              <Input
                type="number"
                placeholder="none"
                value={styles.minHeight || ""}
                onChange={(e) => {
                  const minHeight = numberOrNone(e.target.value);

                  setStyle({ minHeight });
                }}
              />
            </div>
          </Setting>
        </div>
      </div>

      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Max Width">
            <div className="w-28 pl-8">
              <Input
                type="number"
                placeholder="none"
                value={styles.maxWidth || ""}
                onChange={(e) => {
                  const maxWidth = numberOrNone(e.target.value);

                  setStyle({ maxWidth });
                }}
              />
            </div>
          </Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Max Height">
            <div className="w-28 pl-8">
              <Input
                type="number"
                placeholder="none"
                value={styles.maxHeight || ""}
                onChange={(e) => {
                  const maxHeight = numberOrNone(e.target.value);

                  setStyle({ maxHeight });
                }}
              />
            </div>
          </Setting>
        </div>
      </div>
    </CollapsiblePanel>
  );
};
