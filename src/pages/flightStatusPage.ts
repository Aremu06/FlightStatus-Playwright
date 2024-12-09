import { expect, Locator, Page } from '@playwright/test';

export class FlightStatusPage {
  [x: string]: any;
  getResults() {
    throw new Error('Method not implemented.');
  }
  getError() {
    throw new Error('Method not implemented.');
  }
  private page: Page;

  readonly departureAirportInput: Locator;
  readonly arrivalAirportInput: Locator;
  readonly airportSelectBox: Locator;
  readonly datePicker: Locator;
  readonly searchButton: Locator;
  readonly resultsContainer: Locator;
  readonly errorMessage: Locator;
  readonly flightNumberInput: Locator;
  readonly flightNumberRadioButton: Locator;
  readonly defaultUrl: string;
  readonly resultText: string;


  constructor(page: Page) {
    this.page = page;
    this.airportSelectBox = page.locator('//div[@class="o-compact-search__cta-button"]');
    this.departureAirportInput = page.locator('input[aria-label="Departure airport"]');
    this.arrivalAirportInput = page.locator('input[aria-label="Destination airport"]');
    this.datePicker = page.locator('//input[contains(@name,"datepicker_input")]')
    this.searchButton = page.locator("button[class='a-cta a-cta-prio1']");
    this.flightNumberRadioButton = page.getByLabel('Flight number');
    this.flightNumberInput = page.locator('form[name="flight-search-by-criteria"]').getByText('Flight number')
    this.errorMessage = page.locator("//h2[contains(text(),'Unfortunately, we could not find any results for y')]")
    this.resultsContainer = page.locator(".o-search-flight-status__flight-list-content");

    this.defaultUrl = "https://www.eurowings.com/en/information/at-the-airport/flight-status.html";


  }

  async navigate() {
    await this.page.goto(this.defaultUrl);
  }

  async selectDepartureAirport(departure: string) {
    await this.airportSelectBox.nth(0).click();
    await this.departureAirportInput.click();
    await this.departureAirportInput.fill(departure)
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter')
  }
  async selectDestinationAirport(destination: string) {

    await this.airportSelectBox.nth(1).click();
    await this.arrivalAirportInput.click();
    await this.arrivalAirportInput.fill(destination)
    await this.page.keyboard.press('Enter')
  }

  async selectDate(date: string) {
    await this.datePicker.click();
    await this.page.locator(`input[value='${date}']`).click();
  }

  async search() {
    await this.searchButton.click();
  }

  async enterFlightNumber(flightNumber: string) {
    await this.flightNumberRadioButton.check();
    await this.flightNumberInput.click();
    await this.flightNumberInput.fill(flightNumber)
  }

  async getErrorMessage() {
    await expect(this.errorMessage).toBeTruthy();
  }

  async getResultContainer() {
    await this.resultsContainer.contentFrame()
  }
}