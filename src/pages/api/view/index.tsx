import { Renderer } from "@client/components/Renderer";
import prisma from "@db/prisma/client";
import { renderToStream } from "@react-pdf/renderer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.template || !req.body.data) {
    return res.status(400).json({
      error_code: "BAD_REQUEST",
      error_message: "Missing required template or data key in request body",
    });
  }

  const template = await prisma.projectTemplate.findFirst({
    where: {
      key: req.body.template,
    },
  });

  if (!template) {
    return res.send("Template not found");
  }

  const pdfStream = await renderToStream(
    <Renderer template={template.data} payload={req.body.data} />
  );

  res.setHeader("Content-Type", "application/pdf");

  pdfStream.pipe(res);

  pdfStream.on("end", () => console.log("Done streaming, response sent."));
}
