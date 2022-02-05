import { get } from "lodash";
import { sampleDataState } from "@client/components/Editor/recoil/atoms";
import { useGetTemplate } from "@client/components/Editor/recoil/hooks/useGetTemplate";
import { useEffect, useState } from "react";
import { useRecoilCallback } from "recoil";
import { recursivelyGetAbsoluteKey, removeKeyNesting } from "src/utils/absolute-key";
import { NodeContainer } from "../NodeContainer";
import { marginStyles } from "../utils/marginStyles";
import { BaseNodeProps } from "./types";

const variableRegex = new RegExp(/{{\s*([^}]+)\s*}}/, "g");

export const TextNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  const [text, setText] = useState(() => {
    if (node.key) {
      return `{{${node.key}}}`;
    }

    return node.text || node.name;
  });

  const getTemplate = useGetTemplate();

  const getCurrentPayload = useRecoilCallback(({ snapshot }) => {
    return () => {
      return snapshot.getLoadable(sampleDataState).contents;
    };
  });

  useEffect(() => {
    const { nodes } = getTemplate();

    const sampleData = JSON.parse(getCurrentPayload().payload);

    // todo does this re-render if the node position changes nodes?
    if (node.key) {
      const path = removeKeyNesting(recursivelyGetAbsoluteKey(nodes, node.id, node.key));

      // todo: this wont scale.
      const data = get(sampleData, path);

      setText(data || `{{${node.key}}}`);
    } else {
      if (node.text) {
        const path = removeKeyNesting(recursivelyGetAbsoluteKey(nodes, node.id));

        const text = node.text.replace(variableRegex, (tag, variable) => {
          return (
            get(sampleData, path !== "undefined" ? `${path}${variable}` : variable) ||
            `{{${variable}}}`
          );
        });

        if (text) {
          setText(text);
        }
      } else {
        setText(<span className="text-red-500">{node.name}</span>);
      }

      // TODO: Implement replacing variables.
      // Need access to the path ( can get it from recursivelyGetAbsoluteKey )
      // also need to know the index of parents so we can get the correct payload value
      // may need to do something similar to what we're doing in the Renderer (path)
      //
      //
      // Would also be nice if we could cache these values so we don't have to do this every time.
    }
  }, [node.id, node.key, node.text, node.parentId]);

  return (
    <NodeContainer isHoverOver={isHoverOver} isSelected={isSelected}>
      <p
        style={{
          ...node.styles,
          ...marginStyles(node),
          opacity: (node.styles?.opacity ?? 100) / 100,
        }}
      >
        {text}
      </p>
    </NodeContainer>
  );
};
