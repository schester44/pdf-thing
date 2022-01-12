import { ImageNode } from "./ImageNode";
import { PageNumberNode } from "./PageNumberNode";
import { TextNode } from "./TextNode";
import { ViewNode } from "./ViewNode";

export const nodeMap = {
  text: TextNode,
  image: ImageNode,
  view: ViewNode,
  page_number: PageNumberNode,
};
