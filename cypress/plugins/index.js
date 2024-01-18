/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { resetDB } = require("../../__tests__/__mocks__/db/utils/reset-db");
const {addBand} = require("../../lib/features/bands/queries");
const {addReservation} = require("../../lib/features/reservations/queries")
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  config.env.REVALIDATION_SECRET =  process.env.REVALIDATION_SECRET;
  on("task", {
    "db:reset": () => resetDB().then(() => null),
    addBand: (newBand) => addBand(newBand).then(() => null),
    addReservation: (newReservation) => addReservation(newReservation).then(() => null),
  });

  return config;
}
