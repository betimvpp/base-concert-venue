/* eslint-disable consistent-return */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable prettier/prettier */
import { createHandler } from "@/lib/api/handler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV !== "test") {
    return res.status(401)
      .json({ message: "endpppoint only available for test use" })
  }

  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    res.status(401).json({ message: "invalid revalidation secret" });
  }

  await res.unstable_revalidate("/shows");
  await res.unstable_revalidate("/bands");

  return res.status(200).end();
})

export default handler;
