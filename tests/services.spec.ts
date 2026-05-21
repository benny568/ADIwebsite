import { test, expect } from '@playwright/test'
import { gotoHome, scrollToSection } from './helpers'

const SERVICES = [
  { title: 'Manual Car Lessons', features: ['Beginner to advanced', 'Dual-controlled car'] },
  { title: 'Automatic Car Lessons', features: ['No gears or clutch to worry about'] },
  {
    title: 'EDT — Essential Driver Training',
    features: ['All 12 RSA EDT topics covered', 'Logbook completed & stamped'],
  },
  { title: 'Pre-Test Preparation', features: ['Mock test with full debrief'] },
]

test.describe('Services section', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'services')
  })

  test('section is present with correct id', async ({ page }) => {
    await expect(page.locator('#services')).toBeAttached()
  })

  test('heading is visible', async ({ page }) => {
    await expect(
      page.locator('#services').getByRole('heading', { name: /driving lessons/i }),
    ).toBeVisible()
  })

  test('renders exactly 4 service cards', async ({ page }) => {
    const cards = page.locator('#services .grid > div')
    await expect(cards).toHaveCount(4)
  })

  for (const { title, features } of SERVICES) {
    test(`"${title}" card is visible`, async ({ page }) => {
      await expect(page.locator('#services').getByText(title)).toBeVisible()
    })

    for (const feature of features) {
      test(`"${title}" includes feature: "${feature}"`, async ({ page }) => {
        const card = page.locator('#services').locator('.grid > div').filter({ hasText: title })
        await expect(card).toContainText(feature)
      })
    }

    test(`"${title}" card has a "Book This Lesson" CTA linking to #booking`, async ({ page }) => {
      const card = page.locator('#services').locator('.grid > div').filter({ hasText: title })
      const cta = card.getByRole('link', { name: /book this lesson/i })
      await expect(cta).toBeVisible()
      await expect(cta).toHaveAttribute('href', '#booking')
    })
  }

  test('each service card has an icon', async ({ page }) => {
    const icons = page.locator('#services .grid > div').locator('svg')
    // 2 svgs per card (icon + checkmarks), at minimum 4 service icons
    const count = await icons.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('EDT card mentions RSA and 12 lessons', async ({ page }) => {
    const edtCard = page
      .locator('#services .grid > div')
      .filter({ hasText: 'Essential Driver Training' })
    await expect(edtCard).toContainText('RSA')
    await expect(edtCard).toContainText('12')
  })
})
