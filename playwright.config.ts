import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 2,
    workers: undefined,
    reporter: [['list'], ['html']],
    use: {
        baseURL: 'https://tsgabrielle.us',
        trace: 'on',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
