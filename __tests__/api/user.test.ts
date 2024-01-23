/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { testApiHandler } from "next-test-api-route-handler";

import userAuthHandler from "@/pages/api/users/index";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";
import { validateToken } from "@/lib/auth/utils";

jest.mock("@/lib/auth/utils");
const mockValidateToken = validateToken as jest.Mock;

test("POST /api/users receives token with correct credentials", async () => {
  await testApiHandler({
    handler: userAuthHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: "test@test.test",
          password: "test"
        }),
      });

      expect(res.status).toBe(200);
      const json = await res.json();

      expect(json).toHaveProperty("user");
      expect(json.user.id).toEqual(1);
      expect(json.user.email).toEqual("test@test.test");
      expect(json.user).toHaveProperty("token");
    },
  });
});

test("GET /api/user/[userId]/reservations returns correct number of reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher(params) {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toEqual(200);
      const json = await res.json();

      expect(json.userReservations).toHaveLength(2);
    }
  });
});

test("GET /api/user/[userId]/reservations returns correct number of reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher(params) {
      params.userId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toEqual(200);
      const json = await res.json();

      expect(json.userReservations).toHaveLength(0);
    }
  });
});

test("GET /api/user/[userId]/reservations returns 401 status when unauthorized", async () => {
  mockValidateToken.mockResolvedValue(false);

  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher(params) {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toBe(401);
    },
  });
});
