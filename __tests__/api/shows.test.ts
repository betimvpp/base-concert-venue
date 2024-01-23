/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-assign */
import { testApiHandler } from "next-test-api-route-handler";
import showsHandler from "@/pages/api/shows/index";
import showIdHandler from "@/pages/api/shows/[showId]";
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

test("GET /api/shows/[showId] returns the data for ther correct show ID", async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => { params.showId = 0; },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();

      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ show: fakeShows[0] });
    },
  });
});

test("POST /api/shows returns 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: showsHandler,
    paramsPatcher: (params) => {
      params.queryStringURLParams = { secret: "NOT THE REAL SECRET" };
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST" });
      expect(res.status).toEqual(401);
    },
  });
});
