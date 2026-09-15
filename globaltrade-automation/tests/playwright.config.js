const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',

    fullyParallel: false,
    workers: 1,
    retries: 1,

    timeout: 180000,

    reporter: [
        ['html', { outputFolder: 'reports', open: 'never' }],
        ['list']
    ],

    use: {
        baseURL: 'http://localhost:8080',

        headless: false,

        screenshot: 'on',
        video: 'on',
        trace: 'on',

        actionTimeout: 60000,
        navigationTimeout: 120000
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ],

    outputDir: 'screenshots'
});
