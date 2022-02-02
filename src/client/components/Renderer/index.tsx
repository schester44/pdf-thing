import { Page, Text, View, Image, Document, StyleSheet } from "@react-pdf/renderer";
import { get } from "lodash";

type Node = {
  id: string;
  key?: string;
  type: "page" | "text" | "view" | "image" | "page_number";
  parentId?: string;
  nodes?: Node["id"][];
  styles?: Record<string, any>;
  props?: Record<string, any>;
  text?: string;
};

type Payload = Record<string, any>;

// TODO: Eliminate all of this..centralize it.. its duplicated accross  several files
type Template = {
  nodeIds: Node["id"][];
  pageIds: Node["id"][];
  nodes: Record<string, Node>;
};

const variableRegex = new RegExp(/{{\s*([^}]+)\s*}}/, "g");

const recursivelyGetParent = (
  nodes: Record<string, Node>,
  nodeId: string,
  parentIndex?: number
): string => {
  const parent = nodes[nodeId].parentId;

  if (parent && parent !== "root") {
    return (
      recursivelyGetParent(nodes, parent) + "." + (parentIndex ? `[${parentIndex}].` : "") + nodeId
    );
  } else {
    return nodeId;
  }
};

const renderNode = (
  template: Template,
  nodeId: string,
  data: string | null,
  node: Node,
  payload: Payload,
  styles: Record<string, any>,
  parentIndex?: number,
  parentNodePath?: string
) => {
  const style = styles[nodeId];

  switch (node.type) {
    case "page":
      return (
        <Page size="A4" {...node.props} key={nodeId} style={style}>
          {node.nodes?.map((childNodeId) => {
            const data = get(
              payload,
              parentNodePath ? `${parentNodePath}.${childNodeId}` : childNodeId
            );

            return renderNode(
              template,
              childNodeId,
              data,
              template.nodes[childNodeId],
              payload,
              styles,
              undefined,
              nodeId === "root" ? undefined : nodeId
            );
          })}
        </Page>
      );
    case "image":
      return <Image src={node.props?.src} {...node.props} style={style} key={nodeId} />;
    case "page_number":
      return (
        <Text key={nodeId} style={style} render={({ pageNumber }) => `Page ${pageNumber}`}></Text>
      );
    case "text":
      let nodeText = node.text || "";

      console.log({ data, nodeText });

      if (nodeText.length > 0) {
        nodeText = nodeText.replace(variableRegex, (tag, dataKey) => {
          return payload[dataKey];
        });
      }

      return (
        <Text key={nodeId} style={style}>
          {data || nodeText}
        </Text>
      );
    case "view":
      if (Array.isArray(data)) {
        return data.map((data, index) => {
          return (
            <View key={nodeId + index} style={style}>
              {node.nodes?.map((childNodeId) => {
                const childData = data[childNodeId];

                //TODO: Come back  to this... it's a bit of a hack
                // Will we be able to get the correct data based on our de-nested/simplified logic in the frontend?

                const parentNodeId = recursivelyGetParent(template.nodes, nodeId, parentIndex);

                return renderNode(
                  template,
                  childNodeId,
                  childData,
                  template.nodes[childNodeId],
                  payload,
                  styles,
                  index,
                  `${parentNodeId}.[${index}]`
                );
              })}
            </View>
          );
        });
      }

      return (
        <View {...node.props} key={nodeId} style={style}>
          {node.nodes?.map((childNodeId) => {
            const data = get(
              payload,
              parentNodePath ? `${parentNodePath}.${childNodeId}` : childNodeId
            );

            return renderNode(
              template,
              childNodeId,
              data,
              template.nodes[childNodeId],
              payload,
              styles,
              undefined,
              nodeId === "root" ? undefined : nodeId
            );
          })}
        </View>
      );
    default:
      return null;
  }
};

const createStyles = (nodeIds: Node["id"][], template: Template) => {
  const styles: Record<string, any> = {};

  nodeIds.forEach((nodeId) => {
    const node = template.nodes[nodeId];

    styles[nodeId] = {
      ...node.styles,
    };
  });

  return styles;
};

export const Renderer = ({
  template,
  payload,
}: {
  template: Template;
  payload: Record<string, any>;
}) => {
  const styles = StyleSheet.create(createStyles(template.nodeIds, template));

  return (
    <Document>
      {template.pageIds.map((id) => {
        return renderNode(template, id, null, template.nodes[id], payload, styles);
      })}
    </Document>
  );
};
