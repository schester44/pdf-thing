import { useRecoilValue } from "recoil";
import { SiPagekit } from "react-icons/si";
import { nodesState } from "../../recoil/atoms";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { BsBox, BsImage } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
import { useState } from "react";

type Props = {
  id: string;
  depth: number;
};

const icons = {
  page: SiPagekit,
  view: BsBox,
  image: BsImage,
  text: MdTextFields,
  page_number: MdTextFields,
};

export const TreeNode = ({ id, depth }: Props) => {
  const node = useRecoilValue(nodesState(id));
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!node) return null;

  const isCollapsible = node.nodes && node.nodes.length > 0;

  const Icon = icons[node.type as keyof typeof icons];

  return (
    <div className={`pt-1 ${isCollapsible ? "pl-2" : "pl-6"}`}>
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

        <Icon />

        <span className="ml-2">{node.id}</span>
      </div>

      {node.nodes && !isCollapsed && (
        <div className="ml-2 pl-1 border-l">
          {node.nodes.map((nodeId) => {
            return <TreeNode key={nodeId} id={nodeId} depth={depth + 1} />;
          })}
        </div>
      )}
    </div>
  );
};
