import cn from "classnames";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { SiPagekit } from "react-icons/si";
import { nodesState, selectedNodeState } from "../../recoil/atoms";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { BsBox, BsImage } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
import {
  isActiveNode,
  isNodeHidden,
  isNodeVisible,
  isTreeNodeCollapsed,
} from "../../recoil/selectors";
import { FiEye } from "react-icons/fi";

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

  const isSelected = useRecoilValue(isActiveNode(id));
  const setSelected = useSetRecoilState(selectedNodeState);

  if (!node) return null;

  const isCollapsible = node.nodes && node.nodes.length > 0;

  const Icon = icons[node.type as keyof typeof icons];

  return (
    <div
      className={cn("pt-1 text-white", {
        "pl-2": isCollapsible,
        "pl-6": !isCollapsible,
      })}
    >
      <div className="flex items-center">
        {isCollapsible && (
          <div
            className="pr-2 cursor-pointer"
            onClick={() => {
              if (isCollapsible) {
                setIsCollapsed(!isCollapsed);
              }
            }}
          >
            {isCollapsed ? <BiChevronRight /> : <BiChevronDown />}
          </div>
        )}

        <div className="flex items-center" onClick={() => setSelected(id)}>
          {!isParentHidden && (
            <FiEye
              className={cn("text-xs mr-2 cursor-pointer", {
                "text-gray-200 hover:text-white": isVisible,
                "text-gray-400 hover:text-gray-400": !isVisible,
              })}
              onClick={(e) => {
                e.stopPropagation();

                if (isVisible) {
                  setIsCollapsed(true);
                }

                setVisibility(!isVisible);
              }}
            />
          )}

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
  );
};
