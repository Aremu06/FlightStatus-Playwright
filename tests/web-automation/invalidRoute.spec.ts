import { test } from '../../src/fixture/baseTest';
import { FlightStatusPage } from '../../src/pages/flightStatusPage'
import * as Airport from '../../src/data/flightData';

test.describe('Flight Status Tests Invalid Route', () => {
  let flightStatusPage: FlightStatusPage;
  let dates: { label: string; formattedDate: string; }[];

  test.beforeEach(async ({ baseTest }) => {
    const page = await baseTest.getNewPage();
    flightStatusPage = new FlightStatusPage(page);

    // Calculate and format both dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    dates = [
      { label: "today", formattedDate: flightStatusPage.formatDate(today) },
      { label: "tomorrow", formattedDate: flightStatusPage.formatDate(tomorrow) }
    ];

    await flightStatusPage.navigate();
  });

  test('Verify flight status by invalid route for different dates', async () => {
    for (const { label, formattedDate } of dates) {
      await test.step(`Testing invalid route for ${label}`, async () => {
        await flightStatusPage.selectDepartureAirport(Airport.AirportBER.cityCode);
        await flightStatusPage.selectDestinationAirport(Airport.invalidDepartureAirport.cityCode);
        await flightStatusPage.selectDate(formattedDate);
        await flightStatusPage.search();
        await flightStatusPage.getErrorMessage();
      });
    }
  });
});