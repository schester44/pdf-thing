import NextAuth, { User } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "src/db/prisma/client";
import { JWT } from "next-auth/jwt";
import moniker from "moniker";

async function generateProjectAndAssignToUser(user: User & { id: number }) {
  const names = moniker.generator([moniker.adjective, moniker.noun], { glue: " " });

  const project = await prisma.project.create({
    data: {
      name: names.choose(),
    },
  });

  await prisma.projectUsers.create({
    data: {
      projectId: project.id,
      userId: user.id,
      role: "ADMIN",
    },
  });

  return project;
}

const emailServerConfig = {
  host: process.env.EMAIL_SERVER_HOST || "",
  port: Number(process.env.EMAIL_SERVER_PORT || 587),
  auth: {
    user: process.env.EMAIL_SERVER_USER || "",
    pass: process.env.EMAIL_SERVER_PASSWORD || "",
  },
};

console.log({
  emailServerConfig,
});

export default NextAuth({
  callbacks: {
    // FIXME:
    //@ts-ignore
    jwt(token: JWT, user: User & { id: number }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    // FIXME:
    //@ts-ignore
    async session(session: Session & { currentProject: string }, user: User & { id: number }) {
      session.user.id = user.id;

      const userSession = await prisma.session.findFirst({
        where: {
          accessToken: session.accessToken,
        },
      });

      session.currentProject = userSession?.currentProject;

      if (!session.currentProject) {
        const projects = await prisma.projectUsers.findFirst({ where: { userId: user.id } });

        if (projects) {
          session.currentProject = projects.projectId;
        } else {
          const project = await generateProjectAndAssignToUser(user);

          session.currentProject = project.id;
        }

        if (userSession) {
          await prisma.session.update({
            data: {
              currentProject: session.currentProject,
            },
            where: {
              id: userSession.id,
            },
          });
        }
      }

      return Promise.resolve(session);
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  // Configure one or more authentication providers #ref https://next-auth.js.org/providers/email
  providers: [
    Providers.Email({
      server: emailServerConfig,
      from: process.env.EMAIL_FROM,
    }),
  ],
  // DB Adapter #ref https://next-auth.js.org/schemas/adapters#prisma-adapter
  adapter: Adapters.Prisma.Adapter({ prisma }),
});
