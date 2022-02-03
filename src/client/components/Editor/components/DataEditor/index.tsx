import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";

import { getInitialPayload } from "./utils/getInitialPayload";
import { useGetTemplate } from "../../recoil/hooks/useGetTemplate";

export const DataEditor = () => {
  const [payload, setPayload] = React.useState(() => {
    return `{ "loading": true }`;
  });

  const getTemplate = useGetTemplate();

  React.useEffect(() => {
    const template = getTemplate();

    const data = getInitialPayload(template.nodes);

    console.log(data);

    setPayload(JSON.stringify({ template: template.key, data }, null, 2));
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 h-full p-4 px-8">
      <div className="bg-white shadow-lg p-2 rounded-lg">
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
    </div>
  );
};
