import { Listbox, Transition } from "@headlessui/react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const fontMap = {
  "Ubuntu Mono": "Ubuntu Mono",
  "Roboto Mono": "Roboto Mono",
};

const fonts = Object.keys(fontMap);

export const FontPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="z-50 relative">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className="rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:text-gray-900 text-gray-700 text-xs bg-gray-100 w-full text-left p-2">
          {fontMap[value as keyof typeof fontMap] || fontMap[fonts[0]]}
        </Listbox.Button>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-50"
        >
          <Listbox.Options className="absolute rounded-md shadow-lg bg-white text-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden mt-2">
            {fonts.map((key) => {
              const font = fontMap[key as keyof typeof fontMap];

              return (
                <Listbox.Option
                  key={key}
                  value={key}
                  className="text-gray-900 hover:bg-gray-100 px-2 py-2 text-xs block cursor-pointer"
                >
                  {font}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default FontPicker;
