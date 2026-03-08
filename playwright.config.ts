import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5173';

const browsersDir = process.env.PLAYWRIGHT_BROWSERS_PATH
  ? path.resolve(process.cwd(), process.env.PLAYWRIGHT_BROWSERS_PATH)
  : path.join(process.cwd(), '.playwright-browsers');
const projectChromiumPath = path.join(
  browsersDir,
  'chromium-1208',
  'chrome-mac-arm64',
  'Google Chrome for Testing.app',
  'Contents',
  'MacOS',
  'Google Chrome for Testing'
);

const useChromiumPath =
  fs.existsSync(projectChromiumPath) ?
    { launchOptions: { executablePath: projectChromiumPath } }
  : {};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 15_000,
  use: {
    baseURL,
    trace: 'on-first-retry',
    actionTimeout: 10_000,
    ...useChromiumPath,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
      },
});
