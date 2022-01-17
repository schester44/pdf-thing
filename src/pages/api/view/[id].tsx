import {
  renderToStream,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Svg,
} from "@react-pdf/renderer";
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

type Template = {
  pageIds: Node["id"][];
  nodes: Record<string, Node>;
};

const template: Template = {
  pageIds: ["root", "root-2"],
  nodes: {
    "root-2": {
      id: "root-2",
      type: "page",
      nodes: ["header", "footer"],
    },
    root: {
      id: "root",
      type: "page",
      nodes: ["header", "sections_container", "footer"],
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
    sections_container: {
      id: "sections_container",
      type: "view",
      nodes: ["sections"],
      parentId: "root",
    },
    sections: {
      id: "sections",
      key: "sections",
      type: "view",
      nodes: ["section_header", "section_rows", "section_footer"],
      parentId: "root",
      styles: {
        marginBottom: 16,
      },
    },
    section_header: {
      id: "section_header",
      type: "view",
      parentId: "sections",
      nodes: ["section_header_text"],
    },
    section_footer: {
      id: "section_footer",
      type: "view",
      parentId: "sections",
      styles: {
        flexDirection: "row",
        justifyContent: "space-between",
        color: "green",
        borderTop: "3px dotted lightgray",
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
      },
      nodes: ["section_footer_name", "section_footer_value"],
    },
    section_footer_value: {
      id: "section_footer_value",
      type: "text",
      parentId: "section_footer",
      key: "section_total",
    },
    section_footer_name: {
      id: "section_total",
      type: "text",
      parentId: "section_footer",
      key: "section_footer_name",
    },
    section_header_text: {
      id: "section_header_text",
      type: "text",
      parentId: "section_header",
      styles: {
        fontWeight: "bold",
        color: "rgb(100,54,251)",
      },
    },
    section_rows: {
      id: "section_rows",
      key: "section_rows",
      type: "view",
      nodes: ["name", "value"],
      parentId: "sections",
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
    name: {
      id: "name",
      type: "text",
      styles: {
        fontSize: 12,
      },
    },
    value: {
      id: "name",
      type: "text",
      styles: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
      },
    },
  },
};

const nodeIds = Object.keys(template.nodes);

const payload: Payload = {
  quote_number: "QuoteNumber: 1423",
  sections: [
    {
      section_header_text: "Munich Information",
      section_rows: [
        {
          name: "Insured Name",
          value: "John Doe",
        },
        {
          name: "Arcana Reg #",
          value: "1242",
        },
        {
          name: "Property Type",
          value: "Residential 1-4 Family Dwelling",
        },
        {
          name: "Property Address",
          value: "8918 S. Wacker Dr. Chicago, IL 60606",
        },
      ],
    },

    {
      section_header_text: "Quote Information",
      section_rows: [
        {
          name: "Quote Date",
          value: "November 12, 2021",
        },
        {
          name: "Proposed effective start date",
          value: "November 12, 2021",
        },
        {
          name: "Quote valid until",
          value: "December 12, 2021",
        },
        {
          name: "Policy Type",
          value: "DP3-0003 Dwelling Policy",
        },
      ],
    },

    {
      section_header_text: "Premium & Fees",
      section_footer: {
        name: "Total annual premium",
        value: "$1,000.00",
      },
      section_rows: [
        {
          name: "8918 S. Wacker Dr. Chicago, IL 60606",
          value: "$1,379.00",
        },
      ],
    },
  ],
};

const recursivelyGetParent = (nodeId: string, parentIndex?: number): string => {
  const parent = template.nodes[nodeId].parentId;

  if (parent && parent !== "root") {
    return recursivelyGetParent(parent) + "." + (parentIndex ? `[${parentIndex}].` : "") + nodeId;
  } else {
    return nodeId;
  }
};

const renderNode = (
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
      return (
        <Text key={nodeId} style={style}>
          {data || node.text || ""}
        </Text>
      );
    case "view":
      if (Array.isArray(data)) {
        return data.map((data, index) => {
          return (
            <View key={nodeId + index} style={style}>
              {node.nodes?.map((childNodeId) => {
                const childData = data[childNodeId];

                //TODO:We want to get the complete path to the data in the payload
                // eg: "sections[0].section_rows[0].name"
                // eg: "sections[0].section_header_text"

                const parentNodeId = recursivelyGetParent(nodeId, parentIndex);

                return renderNode(
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

const Renderer = () => {
  const styles = StyleSheet.create(createStyles(nodeIds, template));

  return (
    <Document>
      {template.pageIds.map((id) => {
        return renderNode(id, null, template.nodes[id], payload, styles);
      })}
    </Document>
  );
};

export default async function handler(req, res: any) {
  const pdfStream = await renderToStream(<Renderer />);

  res.setHeader("Content-Type", "application/pdf");

  pdfStream.pipe(res);

  pdfStream.on("end", () => console.log("Done streaming, response sent."));
}
