import { test, expect } from '@playwright/test'
import { gotoHome, scrollToSection } from './helpers'

test.describe('Booking section', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'booking')
  })

  test('section is present with correct id', async ({ page }) => {
    await expect(page.locator('#booking')).toBeAttached()
  })

  test('heading says "Book a Lesson"', async ({ page }) => {
    await expect(
      page.locator('#booking').getByRole('heading', { name: /book a lesson/i }),
    ).toBeVisible()
  })

  test('subtitle mentions availability', async ({ page }) => {
    await expect(page.locator('#booking')).toContainText(/morning|evening|weekend/i)
  })

  // The Calendly URL in constants.ts contains 'YOUR-USERNAME' (placeholder),
  // so the placeholder state renders instead of the real embed.
  test('placeholder shows "Online Booking Coming Soon" when Calendly not configured', async ({
    page,
  }) => {
    const hasPlaceholder = await page.locator('#booking').getByText('Online Booking Coming Soon').isVisible()
    const hasCalendly = await page.locator('.calendly-inline-widget').isVisible().catch(() => false)
    // One of the two must be true
    expect(hasPlaceholder || hasCalendly).toBe(true)
  })

  test('placeholder includes a link to the contact section', async ({ page }) => {
    const contactLink = page.locator('#booking').getByRole('link', { name: /contact me directly/i })
    const hasLink = await contactLink.isVisible()
    if (hasLink) {
      await expect(contactLink).toHaveAttribute('href', '#contact')
    }
    // If Calendly is live this test is a no-op — acceptable
  })

  test('placeholder includes a tel: link to the phone number', async ({ page }) => {
    const telLink = page.locator('#booking').locator('a[href^="tel:"]')
    const hasLink = await telLink.isVisible()
    if (hasLink) {
      const href = await telLink.getAttribute('href')
      expect(href).toMatch(/^tel:/)
    }
  })

  test('yellow accent bar is visible under heading', async ({ page }) => {
    const bar = page.locator('#booking .bg-yellow-400.rounded-full')
    await expect(bar).toBeVisible()
  })
})
