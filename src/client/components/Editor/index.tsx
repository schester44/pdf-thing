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
  const [activeWindow, setActiveWindow] = useState("data");
  const loadDocument = useLoadDocument();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    loadDocument(initialTemplate).then(() => {
      setLoaded(true);
    });
  }, [initialTemplate]);

  if (!isLoaded) return <div>LOADING</div>;

  return (
    <div className="w-full bg-gray-100 h-full flex">
      <LeftPanel />

      <div className="flex-1">
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
