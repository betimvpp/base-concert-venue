/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable simple-import-sort/imports */
import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { filenames, writeJSONToFile } from "@/lib/db/db-utils";

export const resetDB = async () => {

    const safeToReset = process.env.NODE_ENV === "test" || process.env.CYPRESS;
    if (!safeToReset) {
        console.log("WARNING: database reset unavailable outside test environment!");
        return;
    }

    const { fakeShows, fakeBands, fakeUsers, fakeReservations } = await readFakeData();

    await Promise.all([
        writeJSONToFile(filenames.bands, fakeBands),
        writeJSONToFile(filenames.shows, fakeShows),
        writeJSONToFile(filenames.users, fakeUsers),
        writeJSONToFile(filenames.reservations, fakeReservations)
    ])
}