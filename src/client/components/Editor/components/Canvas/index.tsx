import cn from "classnames";
import { useRefDimensions } from "@client/hooks/useRefDimensions";
import { MutableRefObject, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { documentState, pageIdsState } from "../../recoil/atoms";
import { useRecoilLocalStorage } from "../../recoil/hooks/useRecoilLocalStorage";
import { NodeSelector } from "../NodeSelector";

import { Page } from "./Page";
import { useScale } from "../../hooks/useScale";

export const CanvasContainer = () => {
  const { pageWidth, pageHeight } = useRecoilValue(documentState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scale = useScale(containerRef, pageWidth);

  if (!scale) return null;

  return (
    <>
      <NodeSelector />

      <div className="flex-1 relative w-full overflow-hidden">
        <div className="h-full w-full flex overflow-auto" ref={containerRef}>
          <div className="mx-auto my-auto">
            <div className="flex items-center flex-col py-12">
              <Canvas scale={scale} pageWidth={pageWidth} pageHeight={pageHeight} />
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

const Canvas = ({ scale, pageWidth, pageHeight }: CanvasProps) => {
  const pageIds = useRecoilValue(pageIdsState);

  return (
    <div>
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
