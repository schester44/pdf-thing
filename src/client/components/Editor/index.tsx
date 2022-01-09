import { useEffect, useState } from "react";

import { RecoilRoot } from "recoil";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { LeftPanel } from "./components/LeftPanel";
import { MiddlePanel } from "./components/MiddlePanel";
import { RightPanel } from "./components/RightPanel";
import { Template } from "./types";
import { useLoadDocument } from "./recoil/hooks/useLoadDocument";

type Props = { initialTemplate: Template };

export const Editor = ({ initialTemplate }: Props) => {
  const [activeWindow, setActiveWindow] = useState("design");
  const loadDocument = useLoadDocument();

  useEffect(() => {
    loadDocument(initialTemplate);
  }, [initialTemplate]);

  return (
    <div className="w-full bg-black h-full flex">
      <LeftPanel />
      <div className="w-2/3">
        <MiddlePanel activeWindow={activeWindow} onWindowChange={setActiveWindow} />
      </div>

      <RightPanel />
    </div>
  );
};

export const EditorContainer = (props: Props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <Editor {...props} />
      </RecoilRoot>
    </DndProvider>
  );
};
