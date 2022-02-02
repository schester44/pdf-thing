import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/server/graphql/schema";
import { createContext } from "src/server/graphql/context";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import Cors from "cors";

const server = new ApolloServer({
  schema,
  context: createContext,
});

const cors = Cors();

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await runMiddleware(req, res, cors);

  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}
