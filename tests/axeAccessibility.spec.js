const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * Following pages were used:
 * https://playwright.dev/docs/accessibility-testing
 * https://www.npmjs.com/package/@axe-core/playwright
 */
test.describe('Google Home page', () => {
    test('Should not have any automatically detectable accessibility issues',
        async ({page}) => {
            await page.goto('https://www.google.com/');
            const accessibilityScanResults = await new AxeBuilder({page}).analyze();
            expect(accessibilityScanResults.violations).toEqual([]);
        });
});