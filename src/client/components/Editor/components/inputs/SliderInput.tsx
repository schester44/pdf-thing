import React from "react";
import { Range } from "react-range";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const SliderInput = ({ value, onChange, min, max, step }: Props) => {
  return (
    <Range
      values={[value || 0]}
      min={min}
      max={max}
      step={step}
      onChange={([value]) => onChange(value)}
      renderTrack={({ props, children }) => (
        <div
          className="w-full h-1 bg-gray-200 rounded-3xl"
          {...props}
          style={{
            ...props.style,
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => {
        return (
          <div
            {...props}
            className="w-3 h-3 rounded-full bg-gray-800"
            style={{
              ...props.style,
            }}
          />
        );
      }}
    />
  );
};
