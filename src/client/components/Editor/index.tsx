import { useEffect, useState } from "react";

import { RecoilRoot } from "recoil";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { MiddlePanel } from "./components/MiddlePanel";
import { RightPanel } from "./components/RightPanel";
import { ActionBar } from "./components/ActionBar";

import { Template } from "./types";
import { useLoadDocument } from "./recoil/hooks/useLoadDocument";

type Props = { initialTemplate: Template };

export const Editor = ({ initialTemplate }: Props) => {
  const [activeWindow, setActiveWindow] = useState("design");
  const loadDocument = useLoadDocument();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    loadDocument(initialTemplate).then(() => {
      setLoaded(true);
    });
  }, [initialTemplate]);

  if (!isLoaded) return <div>LOADING</div>;

  return (
    <div className="w-full bg-gray-100 h-full flex flex-col ">
      <ActionBar />

      <div className="flex-1 flex w-full overflow-hidden">
        <div className="flex-1">
          <MiddlePanel activeWindow={activeWindow} onWindowChange={setActiveWindow} />
        </div>

        <RightPanel />
      </div>
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
