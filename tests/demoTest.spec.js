import { test } from '@playwright/test';
import { chromium } from 'playwright';

test('getCookies', async ({ page }) => {

    let cookies = [];
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    try {
        const page = await context.newPage();
        await page.goto(BASE_URL);

        // ... Login codes ...

        // Get cookies from the current context
        cookies = await context.cookies();
        console.log('Cookies after logging in:', cookies);

    } catch (err) {
        await chrome.close();
        throw new Error(err.message);
    }

    return cookies;
});
