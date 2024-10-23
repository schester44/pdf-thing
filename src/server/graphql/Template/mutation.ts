import { UserInputError } from "apollo-server-micro";
import { mutationField, nonNull, stringArg } from "nexus";

export const createTemplate = mutationField("createTemplate", {
  type: "ProjectTemplate",
  args: {
    key: nonNull(stringArg()),
    name: nonNull(stringArg()),
  },
  async resolve(root, { key, name }, ctx) {
    const existingTemplate = await ctx.prisma.projectTemplate.findFirst({
      where: { key },
    });

    if (existingTemplate) {
      throw new UserInputError(`Template with key "${key}" already exists.`);
    }

    console.log(ctx);

    return ctx.prisma.projectTemplate.create({
      data: {
        key,
        name,
        data: {
          pageIds: ["page-1"],
          nodes: {
            "page-1": {
              id: "page-1",
              type: "page",
              nodes: [],
              name: "Page 1",
            },
          },
        },
        projectId: ctx.session.currentProject,
      },
    });
  },
});

export const saveTemplate = mutationField("saveTemplate", {
  type: "Boolean",
  args: {
    id: nonNull(stringArg()),
    // this is wrong, should be JSON
    data: nonNull("JSONObject"),
    key: nonNull(stringArg()),
    name: nonNull(stringArg()),
  },
  // TODO: Require authentication to save the template
  // authorize: isAuthenticated,
  async resolve(root, { id, data, key, name }, ctx) {
    // TODO: Ensure this user is the owner of the template

    const template = await ctx.prisma.projectTemplate.findUnique({
      where: {
        id,
      },
    });

    if (!template) {
      throw new UserInputError("Template not found");
    }

    await ctx.prisma.projectTemplate.update({
      where: {
        id,
      },
      data: {
        key: key || template.key,
        name: name || template.name,
        data: data || template.data,
      },
    });

    return true;
  },
});
