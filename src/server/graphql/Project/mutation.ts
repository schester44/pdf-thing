import { logger } from "@server/logging";
import { UserInputError } from "apollo-server-micro";
import { mutationField, nonNull, stringArg } from "nexus";
import { AuthenticatedUserContext } from "@server/graphql/context";
import { isAuthenticated } from "../auth";

// Send invite url
// user loads url, sees invited from, do you want to accept?
// user accepts, we generate JWT/session, and log them in

export const inviteUserToProject = mutationField("inviteUserToProject", {
  type: "Boolean",
  args: {
    projectId: nonNull(stringArg()),
    email: nonNull(stringArg()),
    name: nonNull(stringArg()),
  },
  // TODO: check if user is admin of project
  authorize: isAuthenticated,
  async resolve(root, { projectId, email, name }, ctx) {
    const projectOwnedByUser = await ctx.prisma.projectUsers.findFirst({
      where: {
        projectId,
        userId: ctx.user.id,
      },
      include: {
        project: true,
      },
    });

    if (!projectOwnedByUser) {
      throw new UserInputError("No project found");
    }

    // TODO: Check if the user already exists on the project
    let user = await ctx.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const userHasAlreadyBeenInvited = await ctx.prisma.userInvites.findFirst({
        where: {
          projectId,
          user,
        },
      });

      if (userHasAlreadyBeenInvited) {
        throw new UserInputError("User has already been invited");
      }

      const userIsAlreadyATeamMember = await ctx.prisma.projectUsers.findFirst({
        where: {
          projectId,
          user,
        },
      });

      if (userIsAlreadyATeamMember) {
        throw new UserInputError("User is already a team member");
      }
    }

    if (!user) {
      user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    const invite = await ctx.prisma.userInvites.create({
      data: {
        projectId,
        userId: user.id,
        invitedByUserId: ctx.user.id,
      },
    });

    console.log({ invite });
    
    return true;
  },
});

export const createProject = mutationField("createProject", {
  type: "Project",
  args: {
    name: nonNull(stringArg()),
  },
  authorize: isAuthenticated,
  async resolve(root, { name }, ctx: AuthenticatedUserContext) {
    const project = await ctx.prisma.project.create({
      data: {
        name,
      },
    });

    await ctx.prisma.projectUsers.create({
      data: {
        userId: ctx.user.id,
        projectId: project.id,
      },
    });

    if (ctx.session) {
      await ctx.prisma.session.update({
        where: {
          accessToken: ctx.session.accessToken,
        },
        data: {
          currentProject: project.id,
        },
      });
    }

    return project;
  },
});

export const updateProject = mutationField("updateProject", {
  type: "Project",
  args: {
    id: nonNull(stringArg()),
    name: nonNull(stringArg()),
  },
  authorize: isAuthenticated,
  async resolve(root, { id, name }, ctx: AuthenticatedUserContext) {
    const project = await ctx.prisma.project.findFirst({
      where: { id, users: { some: { userId: ctx.user.id } } },
      include: { users: true },
    });

    if (!project) {
      logger.info(`User ${ctx.user.id} tried to update a project that does not exist (${id})`);

      throw new UserInputError("Project does not exist");
    }

    await ctx.prisma.project.update({ where: { id }, data: { name } });

    return ctx.prisma.project.findFirst({ where: { id } });
  },
});

export const deleteProject = mutationField("deleteProject", {
  type: "Boolean",
  args: {
    id: nonNull(stringArg()),
  },
  authorize: isAuthenticated,
  async resolve(root, { id }, ctx: AuthenticatedUserContext) {
    const project = await ctx.prisma.project.findFirst({
      where: { id, users: { some: { userId: ctx.user.id } } },
    });

    if (!project) {
      logger.info(`User ${ctx.user.id} tried to delete a project that does not exist (${id})`);

      throw new UserInputError("Project does not exist");
    }

    // FIXME: If this project is the currentProject then we need to update the currentProject in the DB.
    // FIXME: If project is only project, prevent deleting
    await ctx.prisma.project.delete({ where: { id } });

    return true;
  },
});
