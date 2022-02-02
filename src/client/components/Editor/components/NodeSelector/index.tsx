import { useDrag } from "react-dnd";
import { BsBox, BsImage } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import { dropPlaceholderState } from "../../recoil/atoms";
import { Node } from "../../types";

const iconMap = {
  view: BsBox,
  image: BsImage,
  text: MdTextFields,
};

const NodeTypeButton = ({ type }: { type: Node["type"] }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type,
    item: { type },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    end: async (_, monitor) => {
      const result = monitor.getDropResult();
    },
  });

  const Icon = iconMap[type as keyof typeof iconMap];

  return drag(
    <div className="p-2 flex items-center justify-center cursor-move hover:text-gray-900 transition-colors  rounded-lg hover:bg-white">
      <Icon />
    </div>
  );
};

export const NodeSelector = () => {
  return (
    <div className="absolute text-gray-600 flex text-lg overflow-hidden z-50 mt-4 ml-4">
      <NodeTypeButton type="view" />
      <NodeTypeButton type="text" />
      <NodeTypeButton type="image" />
    </div>
  );
};
