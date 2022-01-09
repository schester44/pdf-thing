import { useDrag } from "react-dnd";
import { BsBox, BsImage } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
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
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: async (_, monitor) => {
      const result = monitor.getDropResult();

      console.log(result);
    },
  });

  const Icon = iconMap[type as keyof typeof iconMap];

  return drag(
    <div className="p-3 border-l border-r border-gray-800 flex items-center justify-center cursor-move hover:bg-gray-800">
      <Icon />
    </div>
  );
};

export const NodeSelector = () => {
  return (
    <div className="bg-gray-900 absolute text-white flex text-xl overflow-hidden z-50">
      <NodeTypeButton type="view" />
      <NodeTypeButton type="text" />
      <NodeTypeButton type="image" />
    </div>
  );
};
