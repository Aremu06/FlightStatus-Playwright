# Automation Test Suite for AutomationPractice.pl

This repository contains automated end-to-end (E2E) tests for the website [AutomationPractice.pl](http://www.automationpractice.pl/index.php). The tests are written in TypeScript using Selenium WebDriver and follow the Page Object Model (POM) design pattern.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Tests](#running-the-tests)
- [Test Structure](#test-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Login Tests**: Validate user login functionality with valid and invalid credentials.
- **Search Functionality**: Test searching for both existing and non-existing products.
- **Add to Cart Functionality**: Ensure users can add products to the shopping cart successfully.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (Node Package Manager)
- Chrome WebDriver (or the appropriate driver for your browser)

You can install Chrome WebDriver using npm as follows:

```bash
npm install chromedriver --save-dev
npm install

automation-practice-tests/
│
├── pages/                     # Contains Page Object Model classes
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   └── SearchResultsPage.ts
│
├── tests/                     # Contains test scripts
│   ├── AddToCart.test.ts
│   ├── Login.test.ts
│   └── Search.test.ts
│
├── package.json               # NPM configuration file
└── tsconfig.json              # TypeScript configuration file

- You can run the test suite using the following command':
  npm test
