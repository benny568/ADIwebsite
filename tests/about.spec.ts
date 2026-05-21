import { test, expect } from '@playwright/test'
import { gotoHome, scrollToSection } from './helpers'

test.describe('About section', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'about')
  })

  test('section is present with correct id', async ({ page }) => {
    await expect(page.locator('#about')).toBeAttached()
  })

  test('"About Me" heading is visible', async ({ page }) => {
    await expect(page.locator('#about').getByRole('heading', { level: 2 })).toBeVisible()
  })

  test('bio text mentions RSA qualification', async ({ page }) => {
    const section = page.locator('#about')
    await expect(section).toContainText(/RSA Approved Driving Instructor/i)
  })

  test('bio text mentions EDT', async ({ page }) => {
    const section = page.locator('#about')
    await expect(section).toContainText(/EDT/i)
  })

  test('instructor photo image is present', async ({ page }) => {
    const img = page.locator('#about img').first()
    await expect(img).toBeAttached()
    const alt = await img.getAttribute('alt')
    expect(alt).toContain('ADI Driving Instructor')
  })

  test('ADI badge/licence section is visible', async ({ page }) => {
    await expect(page.locator('#about').getByText(/RSA Approved Driving Instructor/i).first()).toBeVisible()
  })

  test('shows three stat cards', async ({ page }) => {
    const stats = page.locator('#about').locator('.grid').last().locator('> div')
    await expect(stats).toHaveCount(3)
  })

  test('stat cards contain meaningful values', async ({ page }) => {
    const section = page.locator('#about')
    await expect(section).toContainText('500+')
    await expect(section).toContainText('5★')
  })
})
