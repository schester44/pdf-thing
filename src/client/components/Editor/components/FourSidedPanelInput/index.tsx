import cn from "classnames";
import { Input } from "../inputs/Input";

export type Direction = "top" | "right" | "bottom" | "left";

type Props = {
  label?: string;
  topValue?: number;
  leftValue?: number;
  rightValue?: number;
  bottomValue?: number;
  onChange?: (direction: Direction, value: number) => void;
};

export const FourSidedPanelInput: React.FC<Props> = ({
  label,
  children,
  topValue,
  leftValue,
  rightValue,
  bottomValue,
  onChange,
}) => {
  return (
    <div className="h-full flex flex-col relative">
      {label && <span className="text-xs absolute top-1 left-0 text-gray-400">{label}</span>}

      <div className="w-full h-12 flex items-center justify-center">
        <div className="w-14">
          <Input
            type="number"
            placeholder="auto"
            value={topValue}
            onChange={(e) => {
              if (onChange) {
                onChange("top", parseFloat(e.target.value));
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="w-14">
            <Input
              type="number"
              placeholder="auto"
              value={leftValue}
              onChange={(e) => {
                if (onChange) {
                  onChange("left", parseFloat(e.target.value));
                }
              }}
            />
          </div>
        </div>
        <div className={cn("flex-1 px-2 mx-2", { "border-4 border-gray-600": !!children })}>
          {children}
        </div>
        <div className="h-full flex items-center justify-center">
          <div className="w-14">
            <Input
              type="number"
              placeholder="auto"
              value={rightValue}
              onChange={(e) => {
                if (onChange) {
                  onChange("right", parseFloat(e.target.value));
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-12 flex items-center justify-center">
        <div className="w-14">
          <Input
            type="number"
            placeholder="auto"
            value={bottomValue}
            onChange={(e) => {
              if (onChange) {
                onChange("bottom", parseFloat(e.target.value));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
