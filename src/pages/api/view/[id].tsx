import { Renderer } from "@client/components/Renderer";
import { renderToStream } from "@react-pdf/renderer";

export default async function handler(req, res: any) {
  // TODO: Pass in props
  const pdfStream = await renderToStream(<Renderer />);

  res.setHeader("Content-Type", "application/pdf");

  pdfStream.pipe(res);

  pdfStream.on("end", () => console.log("Done streaming, response sent."));
}
