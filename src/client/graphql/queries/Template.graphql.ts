import { gql } from "urql";

export const createTemplateMutation = gql`
  mutation createTemplate($name: String!, $key: String!) {
    createTemplate(name: $name, key: $key) {
      id
      name
      key
    }
  }
`;

export const saveTemplateMutation = gql`
  mutation saveTemplate($id: String!, $data: JSONObject!, $name: String!, $key: String!) {
    saveTemplate(id: $id, name: $name, data: $data, key: $key)
  }
`;
