import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";

const code = `{
  "section": [{ "section_rows": [{ "name": "Registration Name", "value": "418282" }] }],
  "valid": true,
}`;

// TODO: We need to leverage code in `getInitialPayload` to set the initial value of the editor.
// How do we get ALL nodes? do we need to use a nodeIdsState and fetch all nodes?
export const DataEditor = () => {
  const [payload, setPayload] = React.useState(() => {
    return code;
  });

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
