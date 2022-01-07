import { renderToStream, Page, Text, View, Image, Document, StyleSheet } from "@react-pdf/renderer";

type Node = {
  id: string;
  key?: string;
  type: "text" | "view" | "image" | "page_number";
  parentId?: string;
  nodes?: Node["id"][];
  styles?: Record<string, any>;
  props?: Record<string, any>;
  text?: string;
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
      nodes: ["header", "general_information", "footer"],
    },
    footer_text: {
      id: "footer_text",
      type: "text",
      parentId: "footer",
      text: "Program administered by Obie Risk - +1 (773) 820-7132\nsupport@obierisk.com - 1134 W Hubbard St. Floor 3, Chicago, IL 60642, USA",
      styles: {
        fontSize: 8,
        color: "gray",
      },
    },
    page_number: {
      id: "page_number",
      type: "view",
      parentId: "footer",
      nodes: ["page_number_text"],
      styles: {
        borderRadius: 20,
        backgroundColor: "rgba(80,50, 161, 0.8)",
        color: "white",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 10,
      },
    },
    page_number_text: {
      id: "page_number_text",
      type: "page_number",
      parentId: "page_number",
    },
    footer: {
      id: "footer",
      type: "view",
      parentId: "root",
      nodes: ["footer_text", "page_number"],
      props: {
        fixed: true,
      },
      styles: {
        width: "100%",
        padding: "16px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    header: {
      id: "header",
      type: "view",
      nodes: ["obie_logo", "quote_number"],
      parentId: "root",
      styles: {
        padding: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    quote_number: {
      id: "quote_number",
      type: "text",
      parentId: "header",
      key: "quote_number",
      styles: {
        fontSize: 16,
      },
    },
    obie_logo: {
      id: "obie_logo",
      type: "image",
      parentId: "header",
      styles: {
        maxWidth: "100px",
      },
      props: {
        src: "https://obiestatic.s3.amazonaws.com/logos/obie-spelled.png",
      },
    },
    general_information: {
      id: "general_information",
      key: "general_information",
      type: "view",
      nodes: ["general_information_header", "general_information_row"],
      parentId: "root",
      styles: {
        background: "red",
      },
    },
    general_information_header: {
      id: "general_information_header",
      type: "view",
      parentId: "general_information",
      nodes: ["gi_header_text"],
    },
    gi_header_text: {
      id: "gi_header_text",
      type: "text",
      text: "General Information",
      parentId: "general_information_header",
      styles: {
        fontWeight: "bold",
        color: "rgb(100,54,251)",
        padding: 8,
      },
    },
    general_information_row: {
      id: "general_information_row",
      key: "general_information_row",
      type: "view",
      nodes: ["gi_name", "gi_value"],
      parentId: "general_information",
      styles: {
        fontSize: 33,
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      },
    },
    gi_name: {
      id: "gi_name",
      key: "gi_name",
      type: "text",
      parentId: "general_information_row",
      styles: {
        fontSize: 12,
        fontFamily: "Helvetica",
      },
    },
    gi_value: {
      id: "gi_value",
      key: "gi_value",
      type: "text",
      parentId: "general_information_row",
      styles: {
        fontSize: 12,
        fontFamily: "Helvetica",
        fontWeight: "bold",
      },
    },
  },
};

const nodeIds = Object.keys(template.nodes);

const payload: Payload = {
  quote_number: "QuoteNumber: 1423",
  general_information_row: [
    {
      gi_name: "Insured Name",
      gi_value: "Client Clientson",
    },
    {
      gi_name: "Arcana Reg #",
      gi_value: "26968282958",
    },
    {
      gi_name: "Property Type",
      gi_value: "Residential 1-4 Family Dwelling",
    },
    {
      gi_name: "Propert Address",
      gi_value: "8982 S. Wacker Dr. Chicago, IL 60606",
    },
  ],
};

const renderNode = (
  nodeId: string,
  data: string | null,
  node: Node,
  payload: Payload,
  styles: Record<string, any>
) => {
  const style = styles[nodeId];

  switch (node.type) {
    case "image":
      return <Image src={node.props?.src} {...node.props} style={style} key={nodeId} />;
    case "page_number":
      return (
        <Text key={nodeId} style={style} render={({ pageNumber }) => `Page ${pageNumber}`}></Text>
      );
    case "text":
      return (
        <Text key={nodeId} style={style}>
          {data || node.text}
        </Text>
      );
    case "view":
      if (Array.isArray(data)) {
        return data.map((data, index) => {
          return (
            <View key={nodeId + index} style={style}>
              {node.nodes?.map((childNodeId) => {
                const childData = data[childNodeId];

                return renderNode(
                  childNodeId,
                  childData,
                  template.nodes[childNodeId],
                  payload,
                  styles
                );
              })}
            </View>
          );
        });
      }

      return (
        <View {...node.props} key={nodeId} style={style}>
          {node.nodes?.map((childNodeId) => {
            const data = payload[childNodeId];

            return renderNode(childNodeId, data, template.nodes[childNodeId], payload, styles);
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

const Renderer = () => {
  const styles = StyleSheet.create(createStyles(nodeIds, template));

  return (
    <Document>
      <Page size="A4">
        {renderNode(
          template.rootNodeId,
          null,
          template.nodes[template.rootNodeId],
          payload,
          styles
        )}
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
