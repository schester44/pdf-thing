import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";
import { useRecoilCallback } from "recoil";
import { nodeIdsState, nodesState } from "../../recoil/atoms";
import { getInitialPayload } from "./utils/getInitialPayload";

const useGetTemplate = () => {
  return useRecoilCallback(({ snapshot }) => {
    return () => {
      const nodeIds = snapshot.getLoadable(nodeIdsState).contents;

      const nodes: Record<string, any> = {};
      const pageIds: string[] = [];

      nodeIds.map((nodeId: string) => {
        const node = snapshot.getLoadable(nodesState(nodeId)).contents;

        nodes[node.id] = node;

        if (node.type === "page") {
          pageIds.push(node.id);
        }

        return node;
      });

      return { nodes, pageIds };
    };
  });
};

// TODO: We need to leverage code in `getInitialPayload` to set the initial value of the editor.
// How do we get ALL nodes? do we need to use a nodeIdsState and fetch all nodes?
export const DataEditor = () => {
  const [payload, setPayload] = React.useState(() => {
    return `{ "loading": true }`;
  });

  const getTemplate = useGetTemplate();

  React.useEffect(() => {
    const template = getTemplate();

    console.log("running");

    const payload = getInitialPayload(template.nodes);

    console.log(payload);
    setPayload(
      JSON.stringify({ template_id: "d43cd85f-6020-40cb-84dc-8de0ff9937ab", payload }, null, 2)
    );
  }, []);

  return (
    <div className="bg-black text-white h-full">
      <Editor
        value={payload}
        onValueChange={setPayload}
        highlight={(code: any) => highlight(code, languages.json)}
        padding={16}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          height: "100%",
          outline: "none",
        }}
      />
    </div>
  );
};
