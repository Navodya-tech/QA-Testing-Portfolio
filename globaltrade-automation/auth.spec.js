const { test, expect } = require('@playwright/test');

async function login(page, username, password) {
    await page.goto('/globaltrade/login.xhtml', {
        waitUntil: 'domcontentloaded',
        timeout: 120000
    });

    await page.locator('input[type="text"]').waitFor({
        state: 'visible',
        timeout: 60000
    });

    await page.fill('input[type="text"]', username);
    await page.fill('input[type="password"]', password);

    await page.locator('input[type="submit"]').click({
        noWaitAfter: true
    });

    await page.waitForURL('**/dashboard.xhtml', {
        timeout: 180000
    });
}

test.describe('Authentication Tests', () => {

    test('TC01 - Admin login successful', async ({ page }) => {
        await login(page, 'admin', 'admin123');

        await expect(page).toHaveURL(/dashboard/);

        await page.screenshot({
            path: 'screenshots/TC01-admin-login.png'
        });

        console.log('TC01: Admin login successful');
    });


    test('TC02 - Customs agent login successful', async ({ page }) => {
        await login(page, 'customs', 'customs123');

        await expect(page).toHaveURL(/dashboard/);

        await page.screenshot({
            path: 'screenshots/TC02-customs-login.png'
        });

        console.log('TC02: Customs agent login successful');
    });


    test('TC03 - Warehouse manager login successful', async ({ page }) => {
        await login(page, 'warehouse', 'warehouse123');

        await expect(page).toHaveURL(/dashboard/);

        await page.screenshot({
            path: 'screenshots/TC03-warehouse-login.png'
        });

        console.log('TC03: Warehouse manager login successful');
    });


    test('TC04 - Vendor login successful', async ({ page }) => {
        await login(page, 'vendor', 'vendor123');

        await expect(page).toHaveURL(/dashboard/);

        await page.screenshot({
            path: 'screenshots/TC04-vendor-login.png'
        });

        console.log('TC04: Vendor login successful');
    });


    test('TC05 - Invalid login shows error', async ({ page }) => {
        await page.goto('/globaltrade/login.xhtml');

        await page.locator('input[type="text"]').waitFor({
            state: 'visible',
            timeout: 60000
        });

        await page.fill('input[type="text"]', 'wronguser');
        await page.fill('input[type="password"]', 'wrongpass');

        await page.click('input[type="submit"]');

        await page.waitForTimeout(1000);

        await expect(page).not.toHaveURL(/dashboard/);

        await page.screenshot({
            path: 'screenshots/TC05-invalid-login.png'
        });

        console.log('TC05: Invalid login handled correctly');
    });


    test('TC06 - Admin logout successful', async ({ page }) => {
        await login(page, 'admin', 'admin123');

        await page.locator('input[value="Logout"]').waitFor({
            state: 'visible',
            timeout: 60000
        });

        await page.click('input[value="Logout"]');

        await page.waitForURL('**/login.xhtml', {
            timeout: 120000
        });

        await expect(page).toHaveURL(/login/);

        await page.screenshot({
            path: 'screenshots/TC06-logout.png'
        });

        console.log('TC06: Logout successful');
    });

});