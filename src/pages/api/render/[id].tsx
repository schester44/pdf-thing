import { renderToStream, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

type Node = {
  id: string;
  key?: string;
  type: "text" | "view" | "image";
  parentId?: string;
  nodes?: Node["id"][];
  styles?: Record<string, any>;
};

type Payload = Record<string, any>;

type Template = {
  rootNodeId: Node["id"];
  nodes: Record<string, Node>;
};

const template: Template = {
  rootNodeId: "root",
  nodes: {
    root: {
      id: "root",
      type: "view",
      nodes: ["header"],
    },
    header: {
      id: "header",
      type: "view",
      nodes: ["title", "subtitle"],
      parentId: "root",
    },
    title: {
      id: "title",
      type: "text",
      parentId: "header",
      styles: {
        fontSize: 20,
        fontWeight: "bold",
      },
    },
    subtitle: {
      id: "title",
      type: "text",
      parentId: "header",
      styles: {
        fontSize: 14,
        color: "gray",
        fontWeight: "bold",
      },
    },
  },
};

const nodeIds = Object.keys(template.nodes);

const payload: Payload = {
  title: "hello",
  subtitle: "world",
};

const renderNode = (nodeId: string, node: Node, payload: Payload, styles: Record<string, any>) => {
  switch (node.type) {
    case "text":
      return (
        <Text key={nodeId} style={styles[nodeId]}>
          {payload[nodeId]}
        </Text>
      );
    case "view":
      return (
        <View key={nodeId} style={styles[nodeId]}>
          {node.nodes?.map((childNodeId) =>
            renderNode(childNodeId, template.nodes[childNodeId], payload, styles)
          )}
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

const Renderer = () => {
  const styles = StyleSheet.create(createStyles(nodeIds, template));

  return (
    <Document>
      <Page size="A4">
        {renderNode(template.rootNodeId, template.nodes[template.rootNodeId], payload, styles)}
      </Page>
    </Document>
  );
};

export default async function handler(req, res: any) {
  const pdfStream = await renderToStream(<Renderer />);

  res.setHeader("Content-Type", "application/pdf");

  pdfStream.pipe(res);

  pdfStream.on("end", () => console.log("Done streaming, response sent."));
}
