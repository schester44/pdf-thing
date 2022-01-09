import { v4 } from "uuid";
import { EditorContainer as Editor } from "@client/components/Editor";
import { Template } from "@client/components/Editor/types";

export default function EditorIndex({ initialTemplate }: { initialTemplate: Template }) {
  return <Editor initialTemplate={initialTemplate} />;
}

const template: Template = {
  pageIds: ["root"],
  nodes: {
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
        padding: 8,
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

EditorIndex.getInitialProps = (): { initialTemplate: Template } => {
  return {
    initialTemplate: template,
  };
};
