/* eslint-disable object-curly-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-assign */
import { testApiHandler } from "next-test-api-route-handler";
import showsHandler from "@/pages/api/shows/index";
import { readFakeData } from "../__mocks__/fakeData";

test("/api/shows returns shows from database", async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();
  
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ shows: fakeShows });
    },
  })
})
