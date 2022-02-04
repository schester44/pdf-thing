import React, { useEffect, useState } from "react";
import { get } from "lodash";
import Editor from "react-simple-code-editor";
import diff from "deep-diff";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";

import { getInitialPayload } from "./utils/getInitialPayload";
import { useGetTemplate } from "../../recoil/hooks/useGetTemplate";
import { useRecoilCallback, useRecoilState } from "recoil";
import { sampleDataState } from "../../recoil/atoms";
import { recursivelyGetAbsoluteKey, removeKeyNesting } from "src/utils/absolute-key";

export const DataEditor = () => {
  const [payload, setPayload] = useRecoilState(sampleDataState);

  const getCurrentPayload = useRecoilCallback(({ snapshot }) => {
    return () => {
      return snapshot.getLoadable(sampleDataState).contents;
    };
  });

  const getTemplate = useGetTemplate();

  React.useEffect(() => {
    const template = getTemplate();

    const keyMap: Record<string, { path: string; key: string | undefined }> = {};

    template.nodeIds.forEach((id) => {
      const node = template.nodes[id];

      keyMap[id] = {
        path: recursivelyGetAbsoluteKey(template.nodes, id, node.key),
        key: node.key,
      };

      template.nodes[id].key;
    });

    const currentState = getCurrentPayload();
    const payload = JSON.parse(currentState.payload);

    let valuesToPersist: Record<string, string> = {};

    // fixme: this is hacky and probably buggy. relies on keys being unique and non-reusable.
    Object.keys(currentState.keyMap).forEach((id) => {
      const current = currentState.keyMap[id];
      const update = keyMap[id];

      if (current.path !== update.path && update.key) {
        const value = get(payload, removeKeyNesting(current.path));

        valuesToPersist[update.key] = value || "";
      }
    });

    const data = getInitialPayload(template.nodes);

    diff.observableDiff(
      payload,
      data,
      (d) => {
        if (d.kind !== "E") {
          diff.applyChange(payload, data, d);
        }
      },
      {
        normalize: (path, key, lhs, rhs) => {
          return [lhs, valuesToPersist[key] || rhs];
        },
      }
    );

    setPayload((prev) => ({
      ...prev,
      keyMap,
    }));

    setInputValue(JSON.stringify(payload, null, 2));
  }, []);

  const [inputValue, setInputValue] = useState("");

  // needed because recoil makes the cursor jump to the end of the input without it
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      payload: inputValue,
    }));
  }, [inputValue]);

  return (
    <div className="bg-gray-100 text-gray-800 h-full p-4 px-8">
      <div className="bg-white shadow-lg p-2 rounded-lg">
        <Editor
          value={inputValue}
          onValueChange={setInputValue}
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
