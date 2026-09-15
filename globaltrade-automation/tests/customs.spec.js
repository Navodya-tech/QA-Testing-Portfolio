const { test, expect } = require('@playwright/test');

async function login(page) {
    await page.goto('/globaltrade/login.xhtml');

    await page.locator('input[type="text"]').waitFor({
        state: 'visible',
        timeout: 60000
    });

    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');

    await page.click('input[type="submit"]');

    await page.waitForURL('**/dashboard.xhtml', {
        timeout: 120000
    });
}

async function openCustoms(page) {
    await page.goto('/globaltrade/customs.xhtml');

    await page.locator('table').waitFor({
        state: 'visible',
        timeout: 120000
    });
}

test.describe('Customs Document Tests', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });


    test('TC07 - View all customs documents', async ({ page }) => {
        await openCustoms(page);

        await expect(page).toHaveTitle(/Customs/);

        await page.screenshot({
            path: 'screenshots/TC07-view-customs.png'
        });

        console.log('TC07: Customs page loaded');
    });


    test('TC08 - Create customs document', async ({ page }) => {
        await openCustoms(page);

        const inputs = page.locator('.input-field');

        await inputs.nth(0).fill('CUST-2026-AUTO-001');
        await inputs.nth(1).fill('Import Declaration');
        await inputs.nth(2).fill('India');
        await inputs.nth(3).fill('Sri Lanka');

        await page.locator(
            'input[value="➕ Create Document"]'
        ).click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC08-create-customs.png'
        });

        console.log('TC08: Customs document created');
    });


    test('TC09 - Approve customs document', async ({ page }) => {
        await openCustoms(page);

        const approveBtn = page.locator(
            'input[value="✅ Approve"]'
        ).first();

        await approveBtn.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await approveBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC09-approve-customs.png'
        });

        console.log('TC09: Customs document approved');
    });


    test('TC10 - Reject customs document', async ({ page }) => {
        await openCustoms(page);

        const rejectBtn = page.locator(
            'input[value="❌ Reject"]'
        ).last();

        await rejectBtn.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await rejectBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC10-reject-customs.png'
        });

        console.log('TC10: Customs document rejected');
    });


    test('TC11 - Customs page load performance', async ({ page }) => {
        const start = Date.now();

        await page.goto('/globaltrade/customs.xhtml');

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        const loadTime = Date.now() - start;

        console.log(
            'TC11: Customs page load time: ' +
            loadTime + 'ms'
        );

        expect(loadTime).toBeLessThan(15000);

        await page.screenshot({
            path: 'screenshots/TC11-customs-performance.png'
        });
    });

});
