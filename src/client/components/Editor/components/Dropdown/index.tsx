import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";

export const MenuItem: React.FC<{ onClick?: (e: any) => void; className?: string }> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <Menu.Item onClick={onClick}>
      <span
        className={cn("text-gray-900 hover:bg-gray-100 px-4 py-2 text-xs block cursor-pointer", {
          [className]: !!className,
        })}
      >
        {children}
      </span>
    </Menu.Item>
  );
};

export const Dropdown: React.FC<{ content: React.ReactNode; dropdownClassNames?: string }> = ({
  children,
  content,
  dropdownClassNames = "",
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      {children}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            "origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white z-50 text-white ring-1 ring-black ring-opacity-5 focus:outline-none",
            {
              [dropdownClassNames]: !!dropdownClassNames,
            }
          )}
        >
          <div className="py-1">{content}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
