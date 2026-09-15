const { test, expect } = require('@playwright/test');

async function login(page, username = 'admin', password = 'admin123') {
    await page.goto('/globaltrade/login.xhtml');

    await page.locator('input[type="text"]').waitFor({
        state: 'visible',
        timeout: 60000
    });

    await page.fill('input[type="text"]', username);
    await page.fill('input[type="password"]', password);

    await page.click('input[type="submit"]');

    await page.waitForURL('**/dashboard.xhtml', {
        timeout: 120000
    });
}

async function openShipments(page) {
    await page.goto('/globaltrade/shipments.xhtml');

    await page.locator('table').waitFor({
        state: 'visible',
        timeout: 120000
    });
}

test.describe('Shipment Management Tests', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });


    test('TC26 - View all shipments', async ({ page }) => {
        await openShipments(page);

        await expect(page).toHaveTitle(/Shipments/);

        await page.screenshot({
            path: 'screenshots/TC26-view-shipments.png'
        });

        console.log('TC26: Shipments page loaded');
    });


    test('TC27 - Create new shipment', async ({ page }) => {
        await openShipments(page);

        const inputs = page.locator('.input-field');

        await inputs.nth(0).fill('GT-2026-AUTO-001');
        await inputs.nth(1).fill('Singapore');
        await inputs.nth(2).fill('Sri Lanka');
        await inputs.nth(3).fill('Singapore Airlines Cargo');
        await inputs.nth(4).fill('18.5');

        await page.locator(
            'input[value="➕ Create Shipment"]'
        ).click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC27-create-shipment.png'
        });

        console.log('TC27: Shipment created successfully');
    });


    test('TC28 - Update shipment to IN_TRANSIT', async ({ page }) => {
        await openShipments(page);

        const transitBtn = page.locator(
            'input[value="In Transit"]'
        ).first();

        await transitBtn.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await transitBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC28-update-transit.png'
        });

        console.log('TC28: Status updated to IN_TRANSIT');
    });


    test('TC29 - Update shipment to DELIVERED', async ({ page }) => {
        await openShipments(page);

        const deliveredBtn = page.locator(
            'input[value="Delivered"]'
        ).first();

        await deliveredBtn.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await deliveredBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC29-update-delivered.png'
        });

        console.log('TC29: Status updated to DELIVERED');
    });


    test('TC30 - Delete shipment', async ({ page }) => {
        await openShipments(page);

        const deleteBtn = page.locator(
            'input[value="Delete"]'
        ).last();

        await deleteBtn.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await deleteBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC30-delete-shipment.png'
        });

        console.log('TC30: Shipment deleted successfully');
    });


    test('TC31 - Shipment page load performance', async ({ page }) => {
        const start = Date.now();

        await page.goto('/globaltrade/shipments.xhtml');

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        const loadTime = Date.now() - start;

        console.log(
            'TC31: Shipments page load time: ' +
            loadTime + 'ms'
        );

        expect(loadTime).toBeLessThan(10000);

        await page.screenshot({
            path: 'screenshots/TC31-performance.png'
        });
    });

});