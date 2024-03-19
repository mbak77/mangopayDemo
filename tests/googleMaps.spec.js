import {test, expect} from '@playwright/test';
import {GdprPopUpPage} from '../pages/gdprPopUpPage'
import {LeftPanelPage} from '../pages/leftPanelPage'

var cookies;

test.use({
    locale: 'en-GB',
    baseURL: 'https://www.google.com/maps',
});

test.beforeAll('Gather cookies for the tests',
    async ({browser}) => {

        const context = await browser.newContext()
        const page = await context.newPage();
        await page.goto('')
        const gdprPopUp = await new GdprPopUpPage(page)
        await gdprPopUp.acceptAll();
        cookies = await context.cookies()
        await tearDown(page, context)
    })

/**
 * Acceptance Criteria 1:
 * Given a user is on the Google Maps page
 * When the user enters “Paris” in the search box
 * AND clicks “Search”
 * Then the left panel should have "Paris" as the headline text
 */

test('Google Maps - searching for Paris, validating header',
    async ({browser}) => {

        const [page, context] = await initializeContext(browser)
        const leftPanel = new LeftPanelPage(page)
        await page.goto('')
        await leftPanel.searchFor('Paris');
        await expect(await leftPanel.getHeadlineTitle()).toEqual('Paris');
        await tearDown(page, context)
    })

/**
 * Acceptance Criteria 2:
 * Given a user is on the Google Maps page
 * When the user enters “London” in the search box
 * AND clicks “Search”
 * Then the left panel should have "London" as the headline text
 * When the user clicks the “Directions” button
 * Then the destination field should contain "London"
 */

test('Google Maps - searching for London, checking destination',
    async ({browser}) => {

        const [page, context] = await initializeContext(browser)
        const leftPanel = new LeftPanelPage(page)
        await page.goto('')
        await leftPanel.searchFor('London');
        await expect(await leftPanel.getHeadlineTitle()).toEqual('London');
        await leftPanel.clickDirections();
        await expect(await leftPanel.getDestinationFieldText()).toContain('London');
        await tearDown(page, context)
    })

/**
 * Acceptance Criteria 3:
 * Given a user is on the Google Maps page
 * When the user enters “London” in the search box
 * AND clicks “Search”
 * Then the left panel should have "London" as the headline text
 * When the user clicks the “Directions” button
 * Then the destination field should contain "London"
 * When the user enters "Luton" in the source search box
 * AND clicks "Search"
 * Then the list of directions should contain at least 1 item
 */

test.only('Google Maps - checking London to Luton directions',
    async ({browser}) => {

        const [page, context] = await initializeContext(browser)
        const leftPanel = new LeftPanelPage(page)
        await page.goto('')
        await leftPanel.searchFor('London');
        await expect.soft(await leftPanel.getHeadlineTitle()).toEqual('London');
        await leftPanel.clickDirections();
        await expect.soft(await leftPanel.getDestinationFieldText()).toContain('London');
        await leftPanel.setStartingPoint('Luton, UK');
        await expect(await page.locator(leftPanel.directions_table)).toHaveCount(1);
        await tearDown(page, context)
    })

/**
 * Acceptance Criteria 4:
 * Given a user is on the Google Maps page
 * When the user enters coordinates “52.23703081263759, 21.000360903771707” (Warsaw) in the search box
 * AND clicks “Search”
 * Then the left panel should contain "Warszawa" in the address field
 */

test('Google Maps - searching by coordinates',
    async ({browser}) => {

        const [page, context] = await initializeContext(browser)
        const leftPanel = new LeftPanelPage(page)
        await page.goto('')
        await leftPanel.searchFor('52.23703081263759, 21.000360903771707');
        await expect(await leftPanel.getAddressFieldText()).toContain("Warszawa")
        await tearDown(page, context)
    })

/**
 * Acceptance Criteria 5 (negative scenario):
 * Given a user is on the Google Maps page
 * When the user enters incorrect coordinates “91°00'00.0"N 181°00'00.0"E” in the search box
 * AND clicks “Search”
 * Then the left panel should contain "Google Maps can't find .*" text
 */

test('Google Maps - searching by incorrect coordinates', {tag: '@negative'},
    async ({browser}) => {

        const [page, context] = await initializeContext(browser)
        const leftPanel = new LeftPanelPage(page)
        await page.goto('')
        await leftPanel.searchFor('91°00\'00.0"N 181°00\'00.0"E');
        await expect(await page.getByText("Google Maps can't find")).toBeVisible()
        await tearDown(page, context)
    })

/**
 * Acceptance Criteria 6 (negative scenario):
 * Given a user is on the Google Maps page
 * When the user enters 'Sydney' in the search box
 * AND clicks “Search”
 * Then the left panel should have "Sydney" as the headline text
 * When the user clicks the “Directions” button
 * AND enters "Los Angeles" in the source search box
 * AND choose "Driving" as a travel mode
 * AND clicks "Search"
 * Then "Sorry, we could not calculate driving directions from" should be displayed
 */

test('Google Maps - checking impossible car route', {tag: '@negative'},
    async ({browser}) => {

        const [page, context] = await initializeContext(browser)
        const leftPanel = new LeftPanelPage(page)
        await page.goto('')
        await leftPanel.searchFor('Sydney');
        await expect.soft(await leftPanel.getHeadlineTitle()).toEqual('Sydney');
        await leftPanel.clickDirections();
        await expect.soft(await leftPanel.getDestinationFieldText()).toContain('Sydney');
        await leftPanel.setStartingPoint('Los Angeles');
        await leftPanel.clickDrivingMode();
        await expect(await page.getByText("Sorry, we could not calculate driving directions from ")).toBeVisible()
        await tearDown(page, context)
    })


//region Functions
async function initializeContext(browser) {
    const context = await browser.newContext();
    await context.addCookies([...cookies]);
    const page = await context.newPage();
    return [page, context]
}

async function tearDown(page, context) {
    await page.close()
    await context.close()
}

//endregion