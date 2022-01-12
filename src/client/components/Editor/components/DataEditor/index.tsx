import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";
import { useRecoilValue } from "recoil";
import { pageIdsState } from "../../recoil/atoms";

const code = `{ "json": true, "valid": true }`;

export const DataEditor = () => {
  const pageIds = useRecoilValue(pageIdsState);

  // TODO: Validate JSON show message on error
  // Theme
  // Update with new JSON when JSON changes
  // how to save existing inputted data when this component unmounts
  // auto format the nodes
  
  return (
    <div className="bg-black text-white h-full">
      <Editor
        value={code}
        onValueChange={(code) => {
          console.log({ code });
        }}
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
