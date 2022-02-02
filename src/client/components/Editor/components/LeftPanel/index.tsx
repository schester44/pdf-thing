import { useRef, useState } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { documentState } from "../../recoil/atoms";
import { ComponentTree } from "../ComponentTree";
import { CollapsiblePanel } from "../NodeEditor/CollapsiblePanel";

const Logo = () => {
  const template = useRecoilValue(documentState);

  return (
    <div className="h-12 flex items-center">
      <Link href="/templates">
        <div className="bg-indigo-500 h-full w-12 text-2xl mr-4 flex items-center justify-center cursor-pointer">
          O
        </div>
      </Link>

      <div className="text-xl text-white italic">{template.name}</div>
    </div>
  );
};

export const LeftPanel = () => {
  const [width, setWidth] = useState(300);

  return (
    <div className="bg-gray-900 h-screen overflow-hidden flex flex-col relative" style={{ width }}>
      <Logo />

      <div className="pt-4 overflow-auto flex-1">
        <CollapsiblePanel title="Elements">
          <ComponentTree />
        </CollapsiblePanel>
      </div>
    </div>
  );
};
