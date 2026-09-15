const { test, expect } = require('@playwright/test');

async function login(page, username, password) {
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

test.describe('Role Based Access Control Tests', () => {

    test('TC22 - Admin can access all pages', async ({ page }) => {
        await login(page, 'admin', 'admin123');

        await page.goto('/globaltrade/shipments.xhtml');
        await expect(page).toHaveTitle(/Shipments/);

        await page.goto('/globaltrade/vendors.xhtml');
        await expect(page).toHaveTitle(/Vendors/);

        await page.goto('/globaltrade/inventory.xhtml');
        await expect(page).toHaveTitle(/Inventory/);

        await page.goto('/globaltrade/customs.xhtml');
        await expect(page).toHaveTitle(/Customs/);

        await page.screenshot({
            path: 'screenshots/TC22-admin-access.png'
        });

        console.log('TC22: Admin can access all pages');
    });


    test('TC23 - Customs agent can access customs page',
        async ({ page }) => {

            await login(page, 'customs', 'customs123');

            await page.goto('/globaltrade/customs.xhtml');

            await expect(page).toHaveTitle(/Customs/);

            await page.locator('table').waitFor({
                state: 'visible',
                timeout: 120000
            });

            await page.screenshot({
                path: 'screenshots/TC23-customs-access.png'
            });

            console.log('TC23: Customs agent accessed customs page');
        });


    test('TC24 - Warehouse manager can access inventory',
        async ({ page }) => {

            await login(page, 'warehouse', 'warehouse123');

            await page.goto('/globaltrade/inventory.xhtml');

            await expect(page).toHaveTitle(/Inventory/);

            await page.locator('table').waitFor({
                state: 'visible',
                timeout: 120000
            });

            await page.screenshot({
                path: 'screenshots/TC24-warehouse-access.png'
            });

            console.log('TC24: Warehouse manager accessed inventory');
        });


    test('TC25 - Dashboard shows correct data',
        async ({ page }) => {

            await login(page, 'admin', 'admin123');

            const cards = page.locator('.card');

            await cards.first().waitFor({
                state: 'visible',
                timeout: 120000
            });

            const count = await cards.count();

            console.log(
                'TC25: Dashboard cards found: ' +
                count
            );

            expect(count).toBeGreaterThan(0);

            await page.screenshot({
                path: 'screenshots/TC25-dashboard.png'
            });
        });

});