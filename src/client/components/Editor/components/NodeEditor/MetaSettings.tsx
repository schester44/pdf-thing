import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { Input } from "../inputs/Input";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

export const MetaSettings = ({ nodeId }: Props) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  if (!node) return null;

  const isViewNode = node.type === "view";

  return (
    <CollapsiblePanel title="Properties">
      <div className="px-3 pt-1">
        <Setting name="Name">
          <Input
            name="name"
            value={node?.name}
            onChange={(e) => {
              setNodeState((node) => {
                if (!node) return node;

                return {
                  ...node,
                  name: e.target.value,
                };
              });
            }}
          />
        </Setting>
      </div>

      <div className="px-3">
        <Setting name="Data Key">
          <Input
            name="key"
            value={node?.key}
            onChange={(e) => {
              setNodeState((node) => {
                if (!node) return node;

                return {
                  ...node,
                  key: e.target.value.trim().replace(".", ""),
                };
              });
            }}
          />
        </Setting>
      </div>

      {isViewNode && (
        <div className="px-3 pb-2">
          <Setting name="Fixed">
            <input
              type="checkbox"
              value={node.props?.fixed || false}
              onChange={(e) => {
                setNodeState((node) => {
                  if (!node) return node;

                  return {
                    ...node,
                    props: {
                      ...node.props,
                      fixed: e.target.checked,
                    },
                  };
                });
              }}
            />
          </Setting>
        </div>
      )}
    </CollapsiblePanel>
  );
};
