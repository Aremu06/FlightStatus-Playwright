# Flight Status Testing Project

# Overview
This project contains automated tests for the flight status checking functionality using Playwright and TypeScript. The tests verify the core functionality of searching flights by route and flight number.

# Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- TypeScript
- Playwright Test Framework

# Installation
1. Download and unzip the project in your desired local folder
2. run: npm install

# Project Structure


├── src/
│   ├── pages/
│   │   └── flightStatusPage.ts
│   └── data/
│       └── flightData.ts
├── tests/
│   └── api-automation/
|       └──userApi.spec.ts
|       └── web-automation/
|       └── flightStatus.spec.ts
|
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
└── storageState.json

# Key Components
Page Objects

- FlightStatusPage: Handles interactions with the flight status page elements

    - Search by route
    - Search by flight number
    - Date selection
    - Results verification

# Test Data

- flightData.ts: Contains test data for:

    - Airport Information
    - Flight numbers

# Running Tests
- Run all tests:npx playwright test

# Test Coverage
1. Current Test Scenarios:

    1. Flight status search by route
        - Validates departure and arrival city selection
        - Handles date selection
        - Verifies result display


    2. Flight status search by flight number

        - Validates flight number input
        - Handles date selection
        - Verifies result display

    3. Flight status search by invalid route
        - Validates invalid route departure and arrival city selection
        - Handles date selection
        - Verifies errorMessage display

# Browser Support
Tests run on the following browsers:

- Microsoft Edge
- Chrome
- Firefox

# Configuration
The tests use custom browser context settings including:

- User Agent specification
- Locale settings (en-GB)
- Custom HTTP headers

# Additional Resources
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/)
