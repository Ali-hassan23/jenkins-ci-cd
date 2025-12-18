import { test, expect } from '@playwright/test'

test.describe('Dashboard UI', () => {
  test.beforeEach(async ({ page }) => {
    const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'
    await page.goto(`${base}/dashboard`)
  })

  test('renders header and stat cards', async ({ page }) => {
    await expect(page.locator('text=Welcome, Dr. Sarah Johnson')).toBeVisible()

    await expect(page.locator('text=Total Reports Generated')).toBeVisible()
    await expect(page.locator('text=Pending Reviews')).toBeVisible()
    await expect(page.locator('text=Reports This Week')).toBeVisible()
    await expect(page.locator('text=Avg. Analysis Time')).toBeVisible()
  })

  test('Start New Analysis card navigates to upload', async ({ page }) => {
    await expect(page.locator('text=Start New Analysis')).toBeVisible()
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('text=Start New Analysis'),
    ])

    expect(page.url()).toMatch(/\/upload($|\?)/)
  })

  test('recent reports table renders and search filters rows', async ({ page }) => {
    await expect(page.locator('text=Recent Reports')).toBeVisible()

    const rows = page.locator('table tbody tr')
    await expect(rows).toHaveCount(5)

    // Filter by patient id
    const search = page.locator('input[placeholder="Search by patient ID or diagnosis..."]')
    await search.fill('P-001234')
    await page.waitForTimeout(100) // small debounce (UI updates immediately but keep a short wait)
    await expect(page.locator('table tbody tr')).toHaveCount(1)
    const row = page.locator('table tbody tr').first()
    await expect(row.locator('td').nth(1)).toContainText('P-001234')
    await expect(row.locator('td').nth(2)).toContainText('Normal chest X-ray')
  })
})


test('Dashboard page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
  await expect(page.locator('text=Welcome, Dr. Sarah Johnson')).toBeVisible();
});
