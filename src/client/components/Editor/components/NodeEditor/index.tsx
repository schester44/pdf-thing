import { useRecoilValue } from "recoil";
import { activeNodeSelector } from "../../recoil/selectors";

export const NodeEditor = () => {
  const activeNode = useRecoilValue(activeNodeSelector);

  if (!activeNode) return <div>No active node</div>;

  return <div>tools</div>;
};
