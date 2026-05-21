import { test, expect } from '@playwright/test'
import { gotoHome, scrollToSection } from './helpers'

const EXPECTED_USPS = [
  'RSA Fully Qualified ADI',
  'Patient & Calm Instructor',
  'Flexible Scheduling',
  'High Pass Rate',
]

test.describe('Why Choose Me section', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'why')
  })

  test('section is present with correct id', async ({ page }) => {
    await expect(page.locator('#why')).toBeAttached()
  })

  test('heading is visible', async ({ page }) => {
    await expect(page.locator('#why').getByRole('heading', { name: /why learn with me/i })).toBeVisible()
  })

  test('subtitle is present', async ({ page }) => {
    const subtitle = page.locator('#why').locator('p').first()
    await expect(subtitle).toBeVisible()
    expect((await subtitle.innerText()).length).toBeGreaterThan(20)
  })

  test('renders exactly 4 USP cards', async ({ page }) => {
    const cards = page.locator('#why').locator('.grid > div')
    await expect(cards).toHaveCount(4)
  })

  for (const usp of EXPECTED_USPS) {
    test(`USP card "${usp}" is visible`, async ({ page }) => {
      await expect(page.locator('#why').getByText(usp)).toBeVisible()
    })
  }

  test('each USP card has a description paragraph', async ({ page }) => {
    const cards = page.locator('#why').locator('.grid > div')
    const count = await cards.count()
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i)
      const desc = card.locator('p')
      await expect(desc).toBeVisible()
      expect((await desc.innerText()).length).toBeGreaterThan(30)
    }
  })

  test('each USP card has an icon', async ({ page }) => {
    const icons = page.locator('#why .grid > div svg')
    await expect(icons).toHaveCount(4)
  })

  test('yellow accent bar is visible under heading', async ({ page }) => {
    const accentBar = page.locator('#why .bg-yellow-400.rounded-full')
    await expect(accentBar).toBeVisible()
  })
})
