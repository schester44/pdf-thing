import cn from "classnames";
import { Input } from "../inputs/Input";

export type Direction = "top" | "right" | "bottom" | "left";

type Props = {
  label?: string;
  topValue?: number;
  leftValue?: number;
  rightValue?: number;
  bottomValue?: number;
  placeholder?: string;
  onChange?: (direction: Direction, value: number) => void;
};

const InputUnit = ({ value }: { value: Props["topValue"] }) => {
  if (typeof value === "undefined" || isNaN(value)) return null;

  return <div className="text-xs text-gray-500 pr-2">px</div>;
};

type InputWithAdornmentProps = {
  value?: Props["topValue"];
  onChange: (value: number) => void;
  placeholder?: string;
};

const InputWithAdornment = ({ value, onChange, placeholder = "auto" }: InputWithAdornmentProps) => {
  return (
    <div className="w-14">
      <div className="relative w-full flex items-center justify-between bg-gray-100 rounded">
        <Input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(parseFloat(e.target.value));
            }
          }}
        />
        <InputUnit value={value} />
      </div>
    </div>
  );
};

export const FourSidedPanelInput: React.FC<Props> = ({
  label,
  children,
  topValue,
  leftValue,
  rightValue,
  bottomValue,
  placeholder,
  onChange,
}) => {
  return (
    <div className="h-full flex flex-col relative">
      {label && <span className="text-xs absolute top-1 left-0 text-gray-600">{label}</span>}

      <div className="w-full h-12 flex items-center justify-center">
        <InputWithAdornment
          placeholder={placeholder}
          value={topValue}
          onChange={(value) => onChange && onChange("top", value)}
        />
      </div>
      <div className="flex flex-1">
        <div className="h-full flex items-center justify-center">
          <InputWithAdornment
            placeholder={placeholder}
            value={leftValue}
            onChange={(value) => onChange && onChange("left", value)}
          />
        </div>
        <div className={cn("flex-1 px-2 mx-2", { "border-4 border-gray-50": !!children })}>
          {children}
        </div>
        <div className="h-full flex items-center justify-center">
          <InputWithAdornment
            placeholder={placeholder}
            value={rightValue}
            onChange={(value) => onChange && onChange("right", value)}
          />
        </div>
      </div>
      <div className="w-full h-12 flex items-center justify-center">
        <InputWithAdornment
          placeholder={placeholder}
          value={bottomValue}
          onChange={(value) => onChange && onChange("bottom", value)}
        />
      </div>
    </div>
  );
};
