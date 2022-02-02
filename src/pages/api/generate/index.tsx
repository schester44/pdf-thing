import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "@db/prisma/client";
import { renderToStream } from "@react-pdf/renderer";
import { Renderer } from "@client/components/Renderer";

const cors = Cors({
  methods: ["POST"],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  /**
   * TODO:
   * - Post body validation (is required data sent)
   * - Require API key for authentication (Basic Auth?)
   * - Validate `data` payload... does it match the expected keys? is there data that shouldn't exist?
   */

  if (!req.body.template) {
    return res.status(400).json({
      error_code: "BAD_REQUEST",
      error_message: "Missing required template key in request body",
    });
  }

  const template = await prisma.projectTemplate.findFirst({
    where: {
      key: req.body.template,
    },
  });

  if (!template) {
    return res.status(404).json({
      error_code: "NOT_FOUND",
      error_message: "Template not found",
    });
  }

  const stream = await renderToStream(
    <Renderer
      payload={req.body.data}
      template={{
        nodes: template.data.nodes,
        nodeIds: template.data.nodeIds,
        pageIds: template.data.pageIds,
      }}
    />
  );

  // TODO: stream this to the cloud (aws)
  const writeStream = fs.createWriteStream("./test.pdf");

  stream.pipe(writeStream);

  res.status(200).json({
    url: "https://signed-url-of-uploaded-pdf.com",
  });
}
