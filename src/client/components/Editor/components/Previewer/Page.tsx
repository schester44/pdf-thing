import { Page as PDFPage } from "@react-pdf/renderer";
import { useRecoilValue } from "recoil";
import { nodesState } from "../../recoil/atoms";
import { Node } from "./Node";

type Props = {
  scale: number;
  width: number;
  height: number;
  id: string;
};

export const Page = ({ scale, width, height, id }: Props) => {
  const node = useRecoilValue(nodesState(id));

  if (!node) return null;

  return (
    <div
      className="rounded-lg bg-white overflow-hidden shadow-sm"
      style={{
        width: width * scale,
        height: height * scale,
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          direction: "ltr",
        }}
      >
        <PDFPage style={node.styles} size="A4">
          {node.nodes &&
            node.nodes.map((nodeId) => {
              return <Node id={nodeId} key={nodeId} />;
            })}
        </PDFPage>
      </div>
    </div>
  );
};
