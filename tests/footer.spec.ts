import { test, expect } from '@playwright/test'
import { gotoHome } from './helpers'

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    // Scroll to the bottom to ensure footer is rendered
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)
  })

  test('footer is present in the DOM', async ({ page }) => {
    await expect(page.locator('footer')).toBeAttached()
  })

  test('footer is visible when scrolled to bottom', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
  })

  test('footer shows "ADI" branding text', async ({ page }) => {
    await expect(page.locator('footer').getByText('ADI', { exact: true }).first()).toBeVisible()
  })

  test('footer shows ADI licence label', async ({ page }) => {
    await expect(page.locator('footer').getByText(/ADI Licence/i)).toBeVisible()
  })

  test('footer shows "RSA Approved Driving Instructor" text', async ({ page }) => {
    await expect(page.locator('footer').getByText(/RSA Approved Driving Instructor/i)).toBeVisible()
  })

  test('footer quick-links section is present', async ({ page }) => {
    await expect(page.locator('footer').getByText('Quick Links')).toBeVisible()
  })

  test('footer contains all quick links', async ({ page }) => {
    const links = ['About', 'Services', 'Pricing', 'Reviews', 'Book a Lesson', 'Contact']
    for (const name of links) {
      await expect(
        page.locator('footer').getByRole('link', { name }),
        `footer should have link "${name}"`,
      ).toBeVisible()
    }
  })

  test('footer phone link uses tel: protocol', async ({ page }) => {
    const tel = page.locator('footer').locator('a[href^="tel:"]')
    await expect(tel).toBeVisible()
  })

  test('footer email link uses mailto: protocol', async ({ page }) => {
    const mailto = page.locator('footer').locator('a[href^="mailto:"]')
    await expect(mailto).toBeVisible()
  })

  test('footer shows Facebook icon link', async ({ page }) => {
    const fb = page.locator('footer').getByRole('link', { name: /facebook/i })
    await expect(fb).toBeAttached()
    await expect(fb).toHaveAttribute('target', '_blank')
    await expect(fb).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('footer shows Instagram icon link', async ({ page }) => {
    const ig = page.locator('footer').getByRole('link', { name: /instagram/i })
    await expect(ig).toBeAttached()
    await expect(ig).toHaveAttribute('target', '_blank')
  })

  test('footer copyright shows current year', async ({ page }) => {
    const year = new Date().getFullYear().toString()
    await expect(page.locator('footer')).toContainText(year)
  })

  test('footer copyright contains "All rights reserved"', async ({ page }) => {
    await expect(page.locator('footer')).toContainText(/all rights reserved/i)
  })

  test('footer quick links are functional anchor hrefs', async ({ page }) => {
    const anchors = page.locator('footer a[href^="#"]')
    const count = await anchors.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await anchors.nth(i).getAttribute('href')
      if (!href || href === '#') continue
      const target = page.locator(`${href}`)
      await expect(target, `footer link "${href}" target should exist`).toBeAttached()
    }
  })
})
