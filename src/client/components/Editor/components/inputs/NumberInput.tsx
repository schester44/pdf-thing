import { useRecoilState } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "../../types";

const Input = ({
  type = "text",
  min,
  max,
  step,
  value,
  onChange,
}: {
  type?: string;
  min?: string;
  max?: string;
  step?: string;

  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      value={value}
      className="bg-gray-700 rounded text-white w-full text-xs p-1 outline-none"
    />
  );
};

export const NumberInputWithSlider = ({
  min,
  max,
  step,
  valueKey,
  nodeId,
}: {
  min?: string;
  max?: string;
  step?: string;
  valueKey: string;
  nodeId: Node["id"];
}) => {
  const [node, setNodeState] = useRecoilState(nodesState(nodeId));

  if (!node) return null;

  const styles = node.styles || {};

  return (
    <div className="flex items-center">
      <div className="w-16">
        <Input
          min={min}
          max={max}
          step={step}
          type="number"
          value={styles[valueKey as keyof typeof styles]}
          onChange={({ target: { value } }) => {
            setNodeState((node) => {
              if (!node) return node;

              return {
                ...node,
                styles: {
                  ...node?.styles,
                  [valueKey]: value ? Number(value) : "",
                },
              };
            });
          }}
        />
      </div>
      <div className="text-xs text-white pl-2">slider placeholder</div>
    </div>
  );
};
