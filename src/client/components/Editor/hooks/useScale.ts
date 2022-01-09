import { useRefDimensions } from "@client/hooks/useRefDimensions";
import { MutableRefObject, useEffect } from "react";
import { useRecoilLocalStorage } from "../recoil/hooks/useRecoilLocalStorage";

const RESERVED_SPACE = 400;

export const useScale = (containerRef: MutableRefObject<HTMLElement | null>, pageWidth: number) => {
  const [scaleData, setScale] = useRecoilLocalStorage("scale", () => {
    return {
      isFit: true,
      scale: parseFloat(((window.outerWidth - RESERVED_SPACE) / pageWidth).toFixed(2)),
    };
  });

  const { width } = useRefDimensions(containerRef);
  const { scale, isFit } = scaleData || {};

  useEffect(() => {
    if (!isFit || !width) return;

    let scale = (width - 100) / pageWidth;

    if (scale > 1) {
      scale = 1;
    }

    setScale({ isFit: true, scale });
  }, [pageWidth, width, isFit, setScale]);

  return scale;
};
