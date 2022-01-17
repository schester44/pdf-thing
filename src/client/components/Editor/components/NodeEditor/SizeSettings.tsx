import React from "react";
import { Node } from "../../types";
import { Input } from "../inputs/Input";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { Setting } from "./CollapsiblePanel/Setting";

type Props = { nodeId: Node["id"] };

export const SizeSettings = ({ nodeId }: Props) => {
  return (
    <CollapsiblePanel title="Size">
      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Width">
            <div className="w-20 pl-2">
              <Input type="number" />
            </div>
          </Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Height">
            <div className="w-20 pl-2">
              <Input type="number" />
            </div>
          </Setting>
        </div>
      </div>

      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Min Width">
            <div className="w-20 pl-2">
              <Input type="number" />
            </div>
          </Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Min Height">
            <div className="w-20 pl-2">
              <Input type="number" />
            </div>
          </Setting>
        </div>
      </div>

      <div className="flex px-3 py-2">
        <div className="w-1/2">
          <Setting name="Max Width">
            <div className="w-20 pl-2">
              <Input type="number" />
            </div>
          </Setting>
        </div>

        <div className="w-1/2">
          <Setting name="Max Height">
            <div className="w-20 pl-2">
              <Input type="number" />
            </div>
          </Setting>
        </div>
      </div>
    </CollapsiblePanel>
  );
};
