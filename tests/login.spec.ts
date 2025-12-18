import { test, expect } from '@playwright/test';

test.describe('Login UI', () => {
  test.beforeEach(async ({ page }) => {
    const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
    await page.goto(`${base}/login`);
  });

  test('renders login form fields and submit button', async ({ page }) => {
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
  });

  test('client-side validation prevents empty submit', async ({ page }) => {
    // Click submit with empty fields and assert the app shows validation messages
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('end-to-end login flow (optional)', async ({ page }) => {
    test.skip(!process.env.PLAYWRIGHT_LOGIN, 'Set PLAYWRIGHT_LOGIN env var to enable E2E login test');
    const email = process.env.PLAYWRIGHT_LOGIN_EMAIL ?? 'user@example.com';
    const password = process.env.PLAYWRIGHT_LOGIN_PASSWORD ?? 'Password123!';

    await page.fill('input[type="email"], input[name="email"]', email);
    await page.fill('input[type="password"], input[name="password"]', password);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button[type="submit"], button:has-text("Sign in"), button:has-text("Login")'),
    ]);

    // After a successful login the app commonly navigates to /dashboard or /app
    expect(page.url()).toMatch(/\/(dashboard|app|home)($|\?)/);
  });
});
