import { extendType } from "@nexus/schema";
import { arg, nonNull, queryField, stringArg } from "nexus";
import { AuthenticatedUserContext, Context } from "src/server/graphql/context";

export const template = extendType({
  type: "Query",
  definition(t) {
    t.field("template", {
      type: "ProjectTemplate",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(parent, { id }, ctx: AuthenticatedUserContext) {
        return ctx.prisma.projectTemplate.findUnique({
          where: { id },
        });
      },
    });
  },
});
