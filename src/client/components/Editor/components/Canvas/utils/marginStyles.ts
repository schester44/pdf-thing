import { Node } from "../../../types";

export const marginStyles = ({ styles }: Node) => {
  return {
    marginTop: styles?.marginTop ?? "auto",
    marginBottom: styles?.marginBottom ?? "auto",
    marginLeft: styles?.marginLeft ?? "auto",
    marginRight: styles?.marginRight ?? "auto",
    paddingTop: styles?.paddingTop ?? "auto",
    paddingBottom: styles?.paddingBottom ?? "auto",
    paddingLeft: styles?.paddingLeft ?? "auto",
    paddingRight: styles?.paddingRight ?? "auto",
  };
};
