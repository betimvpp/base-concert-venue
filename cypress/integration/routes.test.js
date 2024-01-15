/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable import/named */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-sequences */
/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand"
import { generateRandomId } from "../../lib/features/reservations/utils"

it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /shows/i }).click();
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /bands/i }).click();
  cy.findByRole("heading", { name: /our illustrious performers/i }).should("exist");
});

it("displays correct band name for band route that existed at build time", () => {
  cy.task("db:reset").visit("/bands/51100");
  cy.findByRole("heading", { name: /The Blue Face Society/i }).should("exist");
});

it("displays error for band not in db", () => {
  cy.task("db:reset").visit("/bands/12345");
  cy.findByRole("heading", { name: /Error: band not found/i }).should("exist");
});

it("displays name for band that was not present at build time", () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);

  cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);
  cy.wait(100).visit(`/bands/${bandId}`);
  cy.findByRole("heading", { name: /Avalanche of Cheese/i}).should("exist")
})