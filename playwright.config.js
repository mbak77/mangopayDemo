// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 1,
  timeout: 8000,
  expect: {
    timeout: 8000
  },
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    geolocation: { longitude: 51.11072, latitude: 17.01715 },
    permissions: ['geolocation'],
    // Emulates the user timezone.
    timezoneId: 'Europe/Paris',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://www.google.com/maps',
    // launchOptions: {
    //   slowMo: 1000,
    // },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

