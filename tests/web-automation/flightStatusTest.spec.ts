import { test, expect } from '../../src/fixture/baseTest';
import { FlightStatusPage } from '../../src/pages/flightStatusPage';
import * as Airport from '../../src/data/flightData';

interface FlightTestData {
  departure: string;
  arrival: string;
  date: string;
  expectedDate: string;
}

test.describe('Flight Status Tests with Enhanced Access Handling', () => {
  let flightStatusPage: FlightStatusPage;
  let testData: FlightTestData[];

  test.beforeEach(async ({ baseTest }) => {
    const page = await baseTest.getNewPage();
    flightStatusPage = new FlightStatusPage(page);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    testData = [
      {
        departure: Airport.AirportBER.cityCode,
        arrival: Airport.AirportCGN.cityCode,
        date: flightStatusPage.formatDate(today),
        expectedDate: new Date().toLocaleDateString()
      },
      {
        departure: Airport.AirportCGN.cityCode,
        arrival: Airport.AirportBER.cityCode,
        date: flightStatusPage.formatDate(tomorrow),
        expectedDate: new Date().toLocaleDateString()
      }
    ];

    await flightStatusPage.navigate();
  });

  test('Verify flight status by routes', async () => {
    for (const data of testData) {
      await test.step(`Testing route: ${data.departure} to ${data.arrival}`, async () => {
        await flightStatusPage.selectDepartureAirport(data.departure);
        await flightStatusPage.selectDestinationAirport(data.arrival);
        await flightStatusPage.selectDate(data.date);
        await flightStatusPage.search();

        await expect(flightStatusPage.getResultContainer()).toBeTruthy();
      });
    }
  });

  test("Verify flight status by flight number", async () => {
    await flightStatusPage.enterFlightNumber(Airport.flightNumber.flightCode);
    await flightStatusPage.selectDate(testData[0].date);
    await flightStatusPage.search();

    await expect(flightStatusPage.getResultContainer()).toBeTruthy();
  });

  test("Verify flight status by invalid route", async () => {
    await flightStatusPage.selectDepartureAirport(Airport.AirportBER.cityCode);
    await flightStatusPage.selectDestinationAirport(Airport.invalidDepartureAirport.cityCode);
    await flightStatusPage.selectDate(testData[0].date);
    await flightStatusPage.search();
    await flightStatusPage.getErrorMessage();
  });
});