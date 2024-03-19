# Mangopay - Google Maps demo

### Installation

For the first time some environment configuration needs to be done. Follow below steps, be sure to have admin privileges:

`npm install`

`npm init playwright@latest` 

`npx playwright install`

Mored details can be found [here](https://playwright.dev/docs/intro).

### Running the tests

All the tests are in /tests folder. To run them use following commands in terminal (make sure project is
the current directory in terminal):

`npx playwright test ./tests/<testFile>` - if you want to run tests from specific file, where <testFile> is e.g. googleMaps.spec.js

`npx playwright test ./tests/` - if you want run all the tests at once

`npx playwright test ./tests/<testFile> --project=chromium --headed` - add following parameters to run headed tests on 1 browser only

### Report

Reports in Playwright are a built-in feature. In case of failure report should be opened right away, but you can always use following command:

`npx playwright show-report`

Videos are available in html report, but they're taken only in case of test failure, on the first retry (video: 'on-first-retry').