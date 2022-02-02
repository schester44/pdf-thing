import path from "path";
import { makeSchema, fieldAuthorizePlugin, queryType, mutationType } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import { GraphQLJSONObject } from "graphql-type-json";
import { asNexusMethod } from "nexus";

import * as User from "./User";
import * as Project from "./Project";
import * as Billing from "./Billing";
import * as Template from "./Template";

const Mutation = mutationType({
  definition(t) {},
});

const Query = queryType({
  definition(t) {},
});

export const JSON = asNexusMethod(GraphQLJSONObject, "json");

// FIXME: This feels wrong
const resolvers = { Query, Mutation, ...User, ...Project, ...Billing, ...Template, JSON };

const outputPath = path.join(process.cwd(), "src", "server", "graphql");

export const schema = makeSchema({
  outputs: {
    typegen: path.join(outputPath, "nexus-typegen.ts"),
    schema: path.join(outputPath, "schema.graphql"),
  },
  types: { resolvers },
  plugins: [fieldAuthorizePlugin(), nexusPrisma()],
  contextType: {
    module: path.join(outputPath, "context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
