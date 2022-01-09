import { useState, useEffect } from "react";

export const useRefDimensions = (ref: { current: HTMLElement | null | undefined }) => {
  const [state, setState] = useState({
    width: ref.current?.clientWidth || 0,
    height: ref.current?.clientHeight || 0,
  });

  useEffect(() => {
    if (!ref.current) return;

    const listener = () => {
      setState({
        width: ref.current?.clientWidth || 0,
        height: ref.current?.clientHeight || 0,
      });
    };

    window.addEventListener("resize", listener);

    listener();

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [ref]);

  return state;
};
