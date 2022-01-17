import cn from "classnames";
import invariant from "tiny-invariant";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { SiPagekit } from "react-icons/si";
import { dropPlaceholderState, nodesState, selectedNodeState } from "../../recoil/atoms";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { BsBox, BsImage } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
import { AiOutlineEllipsis } from "react-icons/ai";

import { isActiveNode, isNodeVisible, isTreeNodeCollapsed } from "../../recoil/selectors";
import { FiDelete, FiEye, FiTrash, FiTrash2 } from "react-icons/fi";
import { useDrag, useDrop } from "react-dnd";
import { useNewNode } from "../../recoil/hooks";
import { Node as NodeI } from "../../types";
import { useMoveNode } from "../../recoil/hooks/useMoveNode";
import { Dropdown, MenuItem } from "../Dropdown";
import { Menu } from "@headlessui/react";
import { useDeleteNode } from "../../recoil/hooks/useDeleteNode";

type Props = {
  id: string;
  isParentHidden: boolean;
};

const icons = {
  page: SiPagekit,
  view: BsBox,
  image: BsImage,
  text: MdTextFields,
  page_number: MdTextFields,
};

export const TreeNode = ({ id, isParentHidden }: Props) => {
  const node = useRecoilValue(nodesState(id));
  const [isCollapsed, setIsCollapsed] = useRecoilState(isTreeNodeCollapsed(id));
  const [isVisible, setVisibility] = useRecoilState(isNodeVisible(id));
  const createNode = useNewNode();
  const moveNode = useMoveNode();
  const deleteNode = useDeleteNode();

  const isSelected = useRecoilValue(isActiveNode(id));
  const setSelected = useSetRecoilState(selectedNodeState);

  const clearDropPlaceholder = useSetRecoilState(dropPlaceholderState);

  const [, drag] = useDrag({
    type: `sidebar-treenode-${node?.type}`,
    item: { type: node?.type, id: node?.id },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const [collectedProps, drop] = useDrop<
    { type: NodeI["type"]; id?: NodeI["id"] },
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: ["view", "image", "text", "sidebar-treenode-image"],
    collect: (monitor) => {
      return {
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      };
    },
    canDrop: () => {
      invariant(node);

      return node.type === "view";
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

      invariant(node);

      const isExistingNode = !!item.id;

      if (isExistingNode) {
        moveNode({
          newParentNodeId: node.id,
          movingNodeId: item.id,
        });
      } else {
        createNode({
          type: item.type,
          parentId: node.id,
        });
      }
    },
  });

  if (!node) return null;

  const isCollapsible = node.nodes && node.nodes.length > 0;

  const Icon = icons[node.type as keyof typeof icons];

  return drag(
    drop(
      <div
        className={cn("pt-1 text-white", {
          "pl-2": isCollapsible,
          "pl-6": !isCollapsible,
          "bg-gray-800": collectedProps.isOver && collectedProps.canDrop,
        })}
      >
        <div className="flex items-center">
          {isCollapsible && (
            <div
              className="pr-1 cursor-pointer"
              onClick={() => {
                if (isCollapsible) {
                  setIsCollapsed(!isCollapsed);
                }
              }}
            >
              {isCollapsed ? <BiChevronRight /> : <BiChevronDown />}
            </div>
          )}

          <div className="flex items-center justify-between flex-1" onClick={() => setSelected(id)}>
            <div className="flex items-center">
              <Icon
                className={cn({
                  "text-yellow-500": isSelected,
                  "text-gray-300": !isSelected && isVisible,
                  "text-gray-500": !isVisible,
                })}
              />

              <span
                className={cn("ml-2 hover:text-gray-100 cursor-pointer", {
                  "text-gray-300": !isSelected && isVisible,
                  "text-gray-500": !isVisible,
                  "text-white": isSelected,
                })}
              >
                {node.name}
              </span>
            </div>

            <div className="pr-1 cursor-pointer">
              <Dropdown
                dropdownClassNames="w-32"
                content={
                  <>
                    {!isParentHidden && (
                      <MenuItem
                        className="flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (isVisible) {
                            setIsCollapsed(true);
                          }

                          setVisibility(!isVisible);
                        }}
                      >
                        <FiEye className="mr-2" /> {isVisible ? "Hide" : "Show"}
                      </MenuItem>
                    )}

                    <MenuItem
                      className="flex items-center"
                      onClick={() => {
                        deleteNode(node.id);
                      }}
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </MenuItem>
                  </>
                }
              >
                <Menu.Button className="rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 hover:text-white">
                  <AiOutlineEllipsis className="hover:text-white" />
                </Menu.Button>
              </Dropdown>
            </div>
          </div>
        </div>

        {node.nodes && !isCollapsed && (
          <div className="ml-2 pl-1 border-l border-gray-600">
            {node.nodes.map((nodeId) => {
              return (
                <TreeNode key={nodeId} id={nodeId} isParentHidden={isParentHidden || !isVisible} />
              );
            })}
          </div>
        )}
      </div>
    )
  );
};
