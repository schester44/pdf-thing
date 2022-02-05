import { useRecoilCallback } from "recoil";
import { sampleDataState } from "../atoms";

export const useSampleData = () =>
  useRecoilCallback(({ snapshot }) => () => {
    const { payload } = snapshot.getLoadable(sampleDataState).contents;

    return JSON.parse(payload);
  });
