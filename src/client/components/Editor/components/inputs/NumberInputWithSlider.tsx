import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";
import { Input } from "./Input";
import { SliderInput } from "./SliderInput";

export const NumberInputWithSlider = ({
  min,
  max,
  step,
  valueKey,
  defaultValue,
  nodeId,
}: {
  min?: string;
  max?: string;
  step?: string;
  valueKey: string;
  defaultValue?: number;
  nodeId: Node["id"];
}) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  if (!node) return null;

  const styles = node.styles || {};

  const value = styles[valueKey as keyof typeof styles] ?? defaultValue;

  const handleChange = (value: number) => {
    setNodeState((node) => {
      if (!node) return node;

      return {
        ...node,
        styles: {
          ...node?.styles,
          [valueKey]: Number(value),
        },
      };
    });
  };

  return (
    <div className="flex items-center">
      <div className="w-16">
        <Input
          min={min}
          max={max}
          step={step}
          type="number"
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
      </div>
      <div className="text-xs text-white pl-4 pr-1 flex-1">
        <SliderInput
          value={value}
          onChange={handleChange}
          min={Number(min)}
          max={Number(max)}
          step={Number(step)}
        />
      </div>
    </div>
  );
};
