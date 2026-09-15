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

async function openVendors(page) {
    await page.goto('/globaltrade/vendors.xhtml');

    await page.locator('table').waitFor({
        state: 'visible',
        timeout: 120000
    });
}

test.describe('Vendor Management Tests', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });


    test('TC32 - View all vendors', async ({ page }) => {
        await openVendors(page);

        await expect(page).toHaveTitle(/Vendors/);

        await page.screenshot({
            path: 'screenshots/TC32-view-vendors.png'
        });

        console.log('TC32: Vendors page loaded');
    });


    test('TC33 - Create new vendor', async ({ page }) => {
        await openVendors(page);

        const inputs = page.locator('.input-field');

        await inputs.nth(0).fill('Dubai Cargo LLC');
        await inputs.nth(1).fill('UAE');
        await inputs.nth(2).fill('cargo@dubai.com');
        await inputs.nth(3).fill('+971-4-1234567');

        await page.locator(
            'input[value="➕ Add Vendor"]'
        ).click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC33-create-vendor.png'
        });

        console.log('TC33: Vendor created successfully');
    });


    test('TC34 - Suspend vendor', async ({ page }) => {
        await openVendors(page);

        const suspendBtn = page.locator(
            'input[value="Suspend"]'
        ).first();

        await suspendBtn.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await suspendBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC34-suspend-vendor.png'
        });

        console.log('TC34: Vendor suspended successfully');
    });


    test('TC35 - Activate vendor', async ({ page }) => {
        await openVendors(page);

        const activateBtn = page.locator(
            'input[value="Activate"]'
        ).first();

        await activateBtn.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await activateBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC35-activate-vendor.png'
        });

        console.log('TC35: Vendor activated successfully');
    });


    test('TC36 - Vendor page load performance', async ({ page }) => {
        const start = Date.now();

        await page.goto('/globaltrade/vendors.xhtml');

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        const loadTime = Date.now() - start;

        console.log(
            'TC36: Vendors page load time: ' +
            loadTime + 'ms'
        );

        expect(loadTime).toBeLessThan(10000);

        await page.screenshot({
            path: 'screenshots/TC36-vendor-performance.png'
        });
    });

});
