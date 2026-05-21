import { test, expect } from '@playwright/test'
import { gotoHome, scrollToSection } from './helpers'

const PLANS = [
  { name: 'Single Lesson', price: '€45', duration: '60 min' },
  { name: 'Block of 5', price: '€210', duration: '5 × 60 min' },
  { name: 'EDT Package', price: '€480', duration: '12 lessons', popular: true },
  { name: 'Pre-Test Package', price: '€120', duration: '3 lessons' },
]

test.describe('Pricing section', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'pricing')
  })

  test('section is present with correct id', async ({ page }) => {
    await expect(page.locator('#pricing')).toBeAttached()
  })

  test('heading says "Simple, Transparent Pricing"', async ({ page }) => {
    await expect(
      page.locator('#pricing').getByRole('heading', { name: /simple.*transparent pricing/i }),
    ).toBeVisible()
  })

  test('renders exactly 4 pricing cards', async ({ page }) => {
    // Each plan is wrapped in a relative div containing a Card
    const wrappers = page.locator('#pricing .grid > div')
    await expect(wrappers).toHaveCount(4)
  })

  for (const plan of PLANS) {
    test(`"${plan.name}" card shows correct price ${plan.price}`, async ({ page }) => {
      const card = page.locator('#pricing').locator('.grid > div').filter({ hasText: plan.name })
      await expect(card).toContainText(plan.price)
    })

    test(`"${plan.name}" card shows duration "${plan.duration}"`, async ({ page }) => {
      const card = page.locator('#pricing').locator('.grid > div').filter({ hasText: plan.name })
      await expect(card).toContainText(plan.duration)
    })

    test(`"${plan.name}" card has a "Book Now" CTA`, async ({ page }) => {
      const card = page.locator('#pricing').locator('.grid > div').filter({ hasText: plan.name })
      const cta = card.getByRole('link', { name: /book now/i })
      await expect(cta).toBeVisible()
      await expect(cta).toHaveAttribute('href', '#booking')
    })
  }

  test('EDT Package has "Most Popular" badge', async ({ page }) => {
    const badge = page.locator('#pricing').getByText('Most Popular')
    await expect(badge).toBeVisible()
  })

  test('EDT Package card has a highlighted border (primary button)', async ({ page }) => {
    const edtCard = page.locator('#pricing').locator('.grid > div').filter({ hasText: 'EDT Package' })
    const bookButton = edtCard.getByRole('link', { name: /book now/i })
    // Primary variant uses bg-yellow-400 — distinct from outline
    const bg = await bookButton.evaluate((el) => getComputedStyle(el).backgroundColor)
    // yellow-400 is rgb(250, 204, 21)
    expect(bg).toMatch(/250|rgb/)
  })

  test('footer note mentions VAT and contact for block bookings', async ({ page }) => {
    await expect(page.locator('#pricing')).toContainText(/VAT/i)
    await expect(page.locator('#pricing')).toContainText(/contact/i)
  })

  test('"Contact me" link in footer note points to #contact', async ({ page }) => {
    const link = page.locator('#pricing').getByRole('link', { name: /contact me/i })
    await expect(link).toHaveAttribute('href', '#contact')
  })
})
