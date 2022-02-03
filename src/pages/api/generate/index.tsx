import fs from "fs";
import { v4 } from "uuid";
import jsum from "jsum";
import stream from "stream";

import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "@db/prisma/client";
import { renderToStream } from "@react-pdf/renderer";
import { Renderer } from "@client/components/Renderer";

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

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

  const hash = generateHash(template.data, req.body.data);

  const stream = await renderToStream(
    <Renderer template={template.data} payload={req.body.data} />
  );

  const key = `${v4()}.pdf`;

  const { writeStream, upload } = uploadStream({ Bucket: "pdf-thing", Key: key });

  stream.pipe(writeStream);

  await upload.done();

  await prisma.templateRuns.create({
    data: {
      projectId: template.projectId,
      templateId: template.id,
      externalId: key,
      hash,
      status: "SUCCESS",
    },
  });

  res.status(200).json({
    key,
    url: getExternalUrl(key),
  });
}

const generateHash = (template: any, data: any) => {
  return jsum.digest(template, "SHA256", "hex") + jsum.digest(data, "SHA256", "hex");
};

const getExternalUrl = (key: string) => {
  return `https://pdfthing.s3.amazonaws.com/${key}`;
};

const uploadStream = ({ Bucket, Key }: { Bucket: string; Key: string }) => {
  const pass = new stream.PassThrough();
  const client = new S3Client({
    region: "us-east-1",
  });

  pass.on("data", (x) => {
    console.log("data received", x.length);
  });

  return {
    writeStream: pass,
    upload: new Upload({
      client,
      params: {
        Bucket,
        Key,
        Body: pass,
        ContentType: "application/pdf",
      },
    }),
  };
};
