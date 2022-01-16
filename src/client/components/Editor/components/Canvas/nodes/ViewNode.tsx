import cn from "classnames";
import { useNewNode } from "@client/components/Editor/recoil/hooks";
import { useDrop } from "react-dnd";
import { Node as NodeI } from "../../../types";
import { NodeContainer } from "../NodeContainer";
import { Node } from "../Node";
import { BaseNodeProps } from "./types";
import { useRef } from "react";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import {
  dropPlaceholderState,
  localStorageState,
  nodesState,
} from "@client/components/Editor/recoil/atoms";

type SetDropPlaceholderProps = {
  offsets: { x: number; y: number };
  dom: HTMLElement;
  node: NodeI;
};

const getRelativePosition = ({ offsets, containerBox, scale }) => ({
  x: (offsets.x - containerBox.x) / scale,
  y: (offsets.y - containerBox.y) / scale,
});

export const ViewNode = ({ node, isSelected, isHoverOver }: BaseNodeProps) => {
  const createNode = useNewNode();
  const ref = useRef();
  const { scale } = useRecoilValue(localStorageState("scale"));
  const dropIndex = useRef();

  const clearDropPlaceholder = useSetRecoilState(dropPlaceholderState);

  const setDropPlaceholder = useRecoilCallback(
    ({ snapshot, set }) =>
      ({ offsets, node, dom }: SetDropPlaceholderProps) => {
        const willHaveHorizontalDropPlaceholders = node.styles?.flexDirection === "column";

        const containerBox = dom.getBoundingClientRect();

        const position = getRelativePosition({
          offsets,
          containerBox,
          scale,
        });

        // this should be the top of the element
        if (!node.nodes?.length) return "";

        const children = node.nodes?.map((id) => {
          return snapshot.getLoadable(nodesState(id)).contents;
        });

        // todo: score x/y/width/height of all VIew nodes and use that to compute would save us from having to read the DOM
        // todo this is terrible
        // todo how do we reliably take this info into account when calling createNode

        const domNodes = children
          .map((child) => {
            if (!child) return;
            const dom = document.querySelector(`[data-id="${child.id}"]`);

            if (!dom) return;

            const box = dom.getBoundingClientRect();

            return {
              node: child,
              dom,
              box,
            };
          })
          .filter((node) => !!node);

        var el = null,
          elOffset,
          x = position.x,
          y = position.y,
          distance,
          dx,
          dy,
          minDistance,
          pos = "left",
          index;

        domNodes.forEach((node, i) => {
          elOffset = getRelativePosition({
            offsets: { x: node.box.x, y: node.box.y },
            containerBox,
            scale,
          });

          const right = elOffset.x + node?.box.width;
          const bottom = elOffset.y + node?.box.height;

          if (x >= elOffset.x && x <= right && y >= elOffset.y && y <= bottom) {
            el = node;

            pos = "right";

            return false;
          }

          var offsets = [
            [elOffset.x, elOffset.y],
            [right, elOffset.y],
            [elOffset.x, bottom],
            [right, bottom],
          ];
          for (var off in offsets) {
            dx = offsets[off][0] - x;
            dy = offsets[off][1] - y;
            distance = Math.sqrt(dx * dx + dy * dy);

            if (minDistance === undefined || distance < minDistance) {
              const isLeft = x < right / 2;

              pos = isLeft ? "left" : "right";

              minDistance = distance;
              el = node;
              index = i;
              dropIndex.current = pos === "right" ? index + 1 : index;
            }
          }
        });

        const POSITIONER_SIZE = 2;

        if (el.box) {
          const height = willHaveHorizontalDropPlaceholders ? POSITIONER_SIZE : containerBox.height;
          const width = willHaveHorizontalDropPlaceholders ? containerBox.width : POSITIONER_SIZE;
          const x = willHaveHorizontalDropPlaceholders
            ? containerBox.left
            : pos === "left"
            ? el.box.x
            : el.box.x + el.box.width;

          const y = willHaveHorizontalDropPlaceholders
            ? el.box.y + el.box.height
            : containerBox.top;

          const styles = { width, height, x, y };

          set(dropPlaceholderState, styles);
        }
      },
    []
  );

  const [collectedProps, drop] = useDrop<{ type: NodeI["type"] }, void, { isOver: boolean }>({
    accept: ["view", "image", "text"],
    collect: (monitor) => {
      return {
        isOver: monitor.isOver({ shallow: true }),
      };
    },
    hover: async (item, monitor) => {
      const offsets = monitor.getClientOffset();

      setDropPlaceholder({ offsets, node, dom: ref.current });
    },
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();

      clearDropPlaceholder(() => ({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
      }));

      // already dropped in a child node
      if (didDrop) {
        return;
      }

      createNode({
        type: item.type,
        parentId: node.id,
        positionInParent: dropIndex.current,
        styles: {
          backgroundColor: "pink",
        },
      });
    },
  });

  return drop(
    <div>
      <NodeContainer
        // This  will probably change.. using this container to highlight the drop and selection state

        isDragOver={collectedProps.isOver}
        isHoverOver={isHoverOver}
        isSelected={isSelected}
      >
        <div
          ref={ref}
          style={node.styles}
          className={cn({
            "fixed bottom-0 left-0": node.props?.fixed,
            "p-4": !node.nodes?.length,
          })}
        >
          {node.nodes?.map((nodeId) => (
            <Node id={nodeId} key={nodeId} />
          ))}
        </div>
      </NodeContainer>
    </div>
  );
};
