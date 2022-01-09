import cn from "classnames";
import { Document, PDFViewer } from "@react-pdf/renderer";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { useScale } from "../../hooks/useScale";
import { documentState, pageIdsState } from "../../recoil/atoms";
import { Page } from "./Page";

export const Previewer = () => {
  const { pageWidth, pageHeight } = useRecoilValue(documentState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scale = useScale(containerRef, pageWidth);

  const pageIds = useRecoilValue(pageIdsState);

  if (!scale) return null;

  return (
    <div className="flex-1 relative w-full overflow-hidden">
      <div className="h-full w-full flex min-h-full overflow-auto" ref={containerRef}>
        <div className="mx-auto my-auto">
          <div className="flex items-center flex-col py-12">
            <Document>
              {pageIds.map((pageId) => {
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
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PreviewerContainer = () => {
  return (
    <PDFViewer>
      <Previewer />
    </PDFViewer>
  );
};
