import { Page, Text, View, Image, Document, StyleSheet } from "@react-pdf/renderer";
import { get } from "lodash";
import { createNextPath, removeKeyNesting } from "src/utils/absolute-key";
import invariant from "tiny-invariant";
import fs from "fs";

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

type RenderNodeArgs = {
  template: Template;
  node: Node;
  path: string;
  styles: Record<string, any>;
  payload: Record<string, any>;
};

const renderNode = ({ template, payload, node, path, styles }: RenderNodeArgs) => {
  const style = styles[node.id];

  switch (node.type) {
    case "text":
      let nodeText = "";

      if (node.key) {
        const nextPath = createNextPath(path, node.key);

        nodeText = get(payload, nextPath);
      } else {
        const text = node.text || "";

        nodeText = text.replace(variableRegex, (tag, variable) => {
          const variableDataPath = createNextPath(path, variable);

          return get(payload, variableDataPath);
        });
      }

      return (
        <Text key={node.id} {...node.props} style={styles[node.id]}>
          {nodeText}
        </Text>
      );
    case "image":
      return <Image key={node.id} src={node.props?.src} {...node.props} style={style} />;
    case "page_number":
      return <Text key={node.id} style={style} render={({ pageNumber }) => `Page ${pageNumber}`} />;
    case "view":
      let children = [];

      if (node.props?.repeats) {
        const nextPath = createNextPath(path, node.key);

        const cleanPath = removeKeyNesting(nextPath);

        // If data doesn't exist then its possible the payload is missing expected data/vice versa. do the payload keys match the template keys?
        const data = get(payload, cleanPath) as any[];

        // we don't really care about the contents of data here, we just want to loop over every item within the data to ensure we print the Node enough times with the correct key.
        children = data.map((data, index) => {
          invariant(node.nodes, "node.nodes is required");

          return node.nodes.map((nodeId) => {
            const path = `${nextPath}[${index}]`;

            return renderNode({
              template,
              payload,
              node: template.nodes[nodeId],
              path: path,
              styles,
            });
          });
        });
      } else {
        // TODO: Is it possible for this to not exist? guess we will see. Ideally TS would know that this type of element would have an array of nodes.
        invariant(node.nodes, "node.nodes is required");

        children = node.nodes.map((nodeId) => {
          const childNode = template.nodes[nodeId];

          return renderNode({
            template,
            payload,
            node: childNode,

            // we can just pass the parent path as this nodes path since we know that it does  not repeat. non-repeated nodes are excluded from paths because they're stripped from the payload to keep the payload flat.
            path: path,
            styles,
          });
        });
      }

      return (
        <View key={node.id} {...node.props} style={style}>
          {children}
        </View>
      );
  }
};

const createStyles = (nodeIds: Node["id"][], template: Template) => {
  const styles: Record<string, any> = {};

  nodeIds.forEach((nodeId) => {
    const node = template.nodes[nodeId];

    styles[nodeId] = node.styles;
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
        const page = template.nodes[id];

        if (!page.nodes?.length) return null;

        return (
          <Page size="A4" {...page.props} key={id} style={styles[id]}>
            {page.nodes.map((id) => {
              const node = template.nodes[id];

              return renderNode({
                styles,
                template,
                node,
                // FIXME: Typescript should know that a page Node will always have a key
                path: page.key!,
                payload,
              });
            })}
          </Page>
        );
      })}
    </Document>
  );
};
