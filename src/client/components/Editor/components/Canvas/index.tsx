import cn from "classnames";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { documentState, dropPlaceholderState, pageIdsState } from "../../recoil/atoms";
import { NodeSelector } from "../NodeSelector";

import { Page } from "./Page";
import { useScale } from "../../hooks/useScale";
import { SiOneplus } from "react-icons/si";
import { useNewPage } from "../../recoil/hooks/useNewPage";

export const CanvasContainer = () => {
  const { pageWidth, pageHeight } = useRecoilValue(documentState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scale = useScale(containerRef, pageWidth);

  const createPage = useNewPage();

  if (!scale) return null;

  return (
    <>
      <NodeSelector />

      <div className="flex-1 relative w-full overflow-hidden">
        <div className="h-full w-full flex overflow-auto" ref={containerRef}>
          <div className="mx-auto my-auto">
            <div className="flex items-center flex-col py-12">
              <Canvas scale={scale} pageWidth={pageWidth} pageHeight={pageHeight} />

              <div
                onClick={() => createPage()}
                className="mt-2 text-xs text-gray-400 rounded-full border border-gray-600 py-1 px-8 flex items-center cursor-pointer hover:bg-gray-900 hover:text-white border-dashed hover:border-solid"
              >
                Add Page <SiOneplus className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type CanvasProps = {
  scale: number;
  pageWidth: number;
  pageHeight: number;
};

const Positioner = () => {
  const positioner = useRecoilValue(dropPlaceholderState);

  if (!positioner) return null;

  if (positioner.x === 0 && positioner.y === 0) return null;

  return (
    <div
      className="bg-red fixed transition-all pointer-events-none bg-green-500"
      style={{
        ...positioner,
        zIndex: 100,
        top: positioner.y,
        left: positioner.x,
      }}
    >
      xx
    </div>
  );
};

const Canvas = ({ scale, pageWidth, pageHeight }: CanvasProps) => {
  const pageIds = useRecoilValue(pageIdsState);

  return (
    <div>
      <Positioner />

      {pageIds.map((pageId, index) => {
        return (
          <div
            key={pageId}
            className={cn({
              "pb-4": pageIds.length > 0,
            })}
          >
            <Page scale={scale} width={pageWidth} height={pageHeight} id={pageId} />
          </div>
        );
      })}
    </div>
  );
};
