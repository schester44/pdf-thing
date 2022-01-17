import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { RgbaStringColorPicker } from "react-colorful";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <Popover className="relative">
        <Popover.Button>
          <div className="rounded-lg w-12 h-6 border border-gray-700" style={{ background: value || "white" }} />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 px-4 mt-3 transform">
            <div className=" bg-white p-1 rounded-lg shadow-lg">
              <RgbaStringColorPicker color={value} onChange={onChange} />
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};
