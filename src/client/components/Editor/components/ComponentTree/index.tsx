import { useRecoilValue } from "recoil";
import { pageIdsState } from "../../recoil/atoms";
import { TreeNode } from "./TreeNode";

export const ComponentTree = () => {
  const pageIds = useRecoilValue(pageIdsState);

  return (
    <div>
      {pageIds.map((pageId) => {
        return <TreeNode id={pageId} key={pageId} />;
      })}
    </div>
  );
};
