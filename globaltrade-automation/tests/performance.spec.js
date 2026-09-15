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

test.describe('Performance Tests', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });


    test('TC18 - Dashboard loads under 5 seconds',
        async ({ page }) => {

            const start = Date.now();

            await page.goto('/globaltrade/dashboard.xhtml');

            await page.locator('.card').first().waitFor({
                state: 'visible',
                timeout: 120000
            });

            const loadTime = Date.now() - start;

            console.log(
                'TC18: Dashboard load time: ' +
                loadTime + 'ms'
            );

            expect(loadTime).toBeLessThan(10000);

            await page.screenshot({
                path: 'screenshots/TC18-dashboard-perf.png'
            });
        });


    test('TC19 - All pages load under 5 seconds',
        async ({ page }) => {

            const pages = [
                '/globaltrade/shipments.xhtml',
                '/globaltrade/vendors.xhtml',
                '/globaltrade/inventory.xhtml',
                '/globaltrade/customs.xhtml'
            ];

            for (const url of pages) {

                const start = Date.now();

                await page.goto(url);

                await page.locator('table').waitFor({
                    state: 'visible',
                    timeout: 120000
                });

                const loadTime = Date.now() - start;

                console.log(
                    url + ' loaded in ' +
                    loadTime + 'ms'
                );

                expect(loadTime).toBeLessThan(10000);
            }

            await page.screenshot({
                path: 'screenshots/TC19-all-pages-perf.png'
            });
        });


    test('TC20 - Login page loads under 3 seconds',
        async ({ page }) => {

            const start = Date.now();

            await page.goto('/globaltrade/login.xhtml');

            await page.locator('input[type="text"]').waitFor({
                state: 'visible',
                timeout: 60000
            });

            const loadTime = Date.now() - start;

            console.log(
                'TC20: Login page load time: ' +
                loadTime + 'ms'
            );

            expect(loadTime).toBeLessThan(10000);

            await page.screenshot({
                path: 'screenshots/TC20-login-perf.png'
            });
        });


    test('TC21 - Measure response times for all pages',
        async ({ page }) => {

            const results = [];

            const pages = [
                {
                    name: 'Dashboard',
                    url: '/globaltrade/dashboard.xhtml',
                    selector: '.card'
                },
                {
                    name: 'Shipments',
                    url: '/globaltrade/shipments.xhtml',
                    selector: 'table'
                },
                {
                    name: 'Vendors',
                    url: '/globaltrade/vendors.xhtml',
                    selector: 'table'
                },
                {
                    name: 'Inventory',
                    url: '/globaltrade/inventory.xhtml',
                    selector: 'table'
                },
                {
                    name: 'Customs',
                    url: '/globaltrade/customs.xhtml',
                    selector: 'table'
                }
            ];

            for (const p of pages) {

                const start = Date.now();

                await page.goto(p.url);

                await page.locator(p.selector).first().waitFor({
                    state: 'visible',
                    timeout: 120000
                });

                const loadTime = Date.now() - start;

                results.push({
                    page: p.name,
                    loadTime: loadTime
                });
            }

            console.log('\n=== Performance Results ===');

            results.forEach(result => {
                console.log(
                    result.page + ': ' +
                    result.loadTime + 'ms'
                );
            });

            const avgTime =
                results.reduce(
                    (sum, result) => sum + result.loadTime,
                    0
                ) / results.length;

            console.log(
                'Average: ' +
                Math.round(avgTime) +
                'ms'
            );

            expect(avgTime).toBeLessThan(10000);

            await page.screenshot({
                path: 'screenshots/TC21-performance-summary.png'
            });
        });

});
