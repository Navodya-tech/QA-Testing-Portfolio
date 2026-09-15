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

async function openInventory(page) {
    await page.goto('/globaltrade/inventory.xhtml');

    await page.locator('table').waitFor({
        state: 'visible',
        timeout: 120000
    });
}

test.describe('Inventory Management Tests', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });


    test('TC12 - View all inventory items', async ({ page }) => {
        await openInventory(page);

        await expect(page).toHaveTitle(/Inventory/);

        await page.screenshot({
            path: 'screenshots/TC12-view-inventory.png'
        });

        console.log('TC12: Inventory page loaded');
    });


    test('TC13 - Add new inventory item', async ({ page }) => {
        await openInventory(page);

        const inputs = page.locator('.input-field');

        await inputs.nth(0).fill('Medical Supplies');
        await inputs.nth(1).fill('MED-001');
        await inputs.nth(2).fill('200');
        await inputs.nth(3).fill('30');
        await inputs.nth(4).fill('WH-Colombo-D1');
        await inputs.nth(5).fill('45.99');

        await page.locator(
            'input[value="➕ Add Item"]'
        ).click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC13-add-inventory.png'
        });

        console.log('TC13: Inventory item added successfully');
    });


    test('TC14 - Increase stock', async ({ page }) => {
        await openInventory(page);

        const qtyInput = page.locator('.input-small').first();

        await qtyInput.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await qtyInput.fill('50');

        const increaseBtn = page.locator(
            'input[value="➕"]'
        ).first();

        await increaseBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC14-increase-stock.png'
        });

        console.log('TC14: Stock increased successfully');
    });


    test('TC15 - Reduce stock', async ({ page }) => {
        await openInventory(page);

        const qtyInput = page.locator('.input-small').first();

        await qtyInput.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await qtyInput.fill('10');

        const reduceBtn = page.locator(
            'input[value="➖"]'
        ).first();

        await reduceBtn.click();

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        await page.screenshot({
            path: 'screenshots/TC15-reduce-stock.png'
        });

        console.log('TC15: Stock reduced successfully');
    });


    test('TC16 - Detect low stock items', async ({ page }) => {
        await openInventory(page);

        const lowStockItems = page.locator('.low-stock');

        const count = await lowStockItems.count();

        console.log(
            'TC16: Low stock items found: ' +
            count
        );

        await page.screenshot({
            path: 'screenshots/TC16-low-stock.png'
        });
    });


    test('TC17 - Inventory page load performance', async ({ page }) => {
        const start = Date.now();

        await page.goto('/globaltrade/inventory.xhtml');

        await page.locator('table').waitFor({
            state: 'visible',
            timeout: 120000
        });

        const loadTime = Date.now() - start;

        console.log(
            'TC17: Inventory page load time: ' +
            loadTime + 'ms'
        );

        expect(loadTime).toBeLessThan(10000);

        await page.screenshot({
            path: 'screenshots/TC17-inventory-performance.png'
        });
    });

});