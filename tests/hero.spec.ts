import { test, expect } from '@playwright/test'
import { gotoHome } from './helpers'

test.describe('Hero section', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('hero section fills the viewport on load', async ({ page }) => {
    const hero = page.locator('section').first()
    const box = await hero.boundingBox()
    const viewportHeight = page.viewportSize()?.height ?? 0
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(viewportHeight * 0.9)
  })

  test('H1 headline is visible and contains key text', async ({ page }) => {
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText(/pass your test/i)
    await expect(h1).toContainText(/confidence/i)
  })

  test('eyebrow chip mentions RSA and Ireland', async ({ page }) => {
    // The eyebrow is inside the first <section> as a rounded-full chip
    const eyebrow = page.locator('section').first().locator('.rounded-full').filter({ hasText: /RSA/ })
    await expect(eyebrow).toBeVisible()
    await expect(eyebrow).toContainText('Ireland')
  })

  test('"Book a Lesson" primary CTA is visible and links to booking', async ({ page }) => {
    const cta = page.locator('section').first().getByRole('link', { name: /book a lesson/i })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#booking')
  })

  test('"View Prices" outline CTA is visible and links to pricing', async ({ page }) => {
    const cta = page.locator('section').first().getByRole('link', { name: /view prices/i })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#pricing')
  })

  test('trust bar shows RSA qualified, 5-Star rated, and Flexible Scheduling', async ({ page }) => {
    // Scope to hero section and use exact match to avoid collision with WhyChoose section text
    const hero = page.locator('section').first()
    await expect(hero.getByText('RSA Fully Qualified', { exact: true })).toBeVisible()
    await expect(hero.getByText('5-Star Rated', { exact: true })).toBeVisible()
    await expect(hero.getByText('Flexible Scheduling', { exact: true })).toBeVisible()
  })

  test('scroll indicator is visible', async ({ page }) => {
    await expect(page.getByText('Scroll')).toBeVisible()
  })

  test('subheadline mentions manual, automatic and EDT', async ({ page }) => {
    const subheadline = page.locator('section').first().locator('p').first()
    await expect(subheadline).toContainText(/manual/i)
    await expect(subheadline).toContainText(/automatic/i)
    await expect(subheadline).toContainText(/EDT/i)
  })
})
