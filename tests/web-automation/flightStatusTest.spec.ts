import { test, expect, BrowserContext } from '@playwright/test';
import { FlightStatusPage } from '../../src/pages/flightStatusPage';
import * as Airport from '../../src/data/flightData';

// Define interface for test data structure
interface FlightTestData {
  departure: string;
  arrival: string;
  date: string;
  expectedDate: string;
}

test.describe('Flight Status Tests with Enhanced Access Handling', () => {
  let flightStatusPage: FlightStatusPage;
  let context: BrowserContext;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
      locale: 'en-GB',
      extraHTTPHeaders: {
        "sec-ch-ua": '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"'
      }

    });
  });
  test.beforeEach(async ({ browser }) => {

    const page = await context.newPage();
    flightStatusPage = new FlightStatusPage(page);
    await flightStatusPage.navigate();
  });
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const testData: FlightTestData[] = [
    {
      departure: Airport.AirportBER.cityCode,
      arrival: Airport.AirportCGN.cityCode,
      date: formatDate(today),
      expectedDate: new Date().toLocaleDateString()
    },
    {
      departure: Airport.AirportCGN.cityCode,
      arrival: Airport.AirportBER.cityCode,
      date: formatDate(tomorrow),
      expectedDate: new Date().toLocaleDateString()
    }
  ];

  for (const data of testData) {
    test(`Verify flight status by route: ${data.departure} to ${data.arrival}`, async () => {
      await flightStatusPage.selectDepartureAirport(data.departure);
      await flightStatusPage.selectDestinationAirport(data.arrival);
      await flightStatusPage.selectDate(data.date);
      await flightStatusPage.search();

      // Verify that the result container is visible
      await expect(flightStatusPage.getResultContainer()).toBeTruthy();
    });
  }

  test("Verify flight status by flight number", async () => {

    await flightStatusPage.enterFlightNumber(Airport.flightNumber.flightCode);
    await flightStatusPage.selectDate(testData[0].date);
    await flightStatusPage.search();

    // Verify that the result container is visible
    await expect(flightStatusPage.getResultContainer()).toBeTruthy();
  });

  test("Verify flight status by invalid route", async () => {
    await flightStatusPage.selectDepartureAirport(Airport.AirportBER.cityCode);
    await flightStatusPage.selectDestinationAirport(Airport.invalidDepartureAirport.cityCode);
    await flightStatusPage.selectDate(testData[0].date);
    await flightStatusPage.search();
    await expect(flightStatusPage.getErrorMessage()).toBeTruthy();

  });

});

// function formatDate(date: Date): string {
//   if (date) {
//     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
//   }

//   return '';
// }

// modified function that adds zero-padding to ensure consistent formatting
function formatDate(date: Date): string {
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`;
  }

  return '';
}