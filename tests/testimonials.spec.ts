import { test, expect } from '@playwright/test'
import { gotoHome, scrollToSection } from './helpers'

test.describe('Testimonials section', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'reviews')
  })

  test('section is present with correct id', async ({ page }) => {
    await expect(page.locator('#reviews')).toBeAttached()
  })

  test('heading mentions "Students Say"', async ({ page }) => {
    await expect(
      page.locator('#reviews').getByRole('heading', { name: /what students say/i }),
    ).toBeVisible()
  })

  test('renders 6 testimonial cards', async ({ page }) => {
    const cards = page.locator('#reviews').locator('.grid > div')
    await expect(cards).toHaveCount(6)
  })

  test('each testimonial card shows a reviewer name', async ({ page }) => {
    const cards = page.locator('#reviews .grid > div')
    const count = await cards.count()
    for (let i = 0; i < count; i++) {
      const nameEl = cards.nth(i).locator('p.text-white.text-sm.font-semibold')
      await expect(nameEl).toBeVisible()
      expect((await nameEl.innerText()).length).toBeGreaterThan(0)
    }
  })

  test('each testimonial card shows a date', async ({ page }) => {
    const dates = page.locator('#reviews .grid > div span.text-slate-500.text-xs')
    const count = await dates.count()
    expect(count).toBe(6)
  })

  test('each testimonial card shows star rating icons', async ({ page }) => {
    const cards = page.locator('#reviews .grid > div')
    const count = await cards.count()
    for (let i = 0; i < count; i++) {
      const stars = cards.nth(i).locator('svg')
      const starCount = await stars.count()
      expect(starCount).toBeGreaterThanOrEqual(5)
    }
  })

  test('each testimonial shows "Verified Google Review" label', async ({ page }) => {
    const labels = page.locator('#reviews').getByText('Verified Google Review')
    await expect(labels).toHaveCount(6)
  })

  test('testimonial text is italic and quoted', async ({ page }) => {
    const firstQuote = page.locator('#reviews .grid > div').first().locator('p.italic')
    await expect(firstQuote).toBeVisible()
    const text = await firstQuote.innerText()
    expect(text.startsWith('"')).toBe(true)
    expect(text.endsWith('"')).toBe(true)
  })

  test('Google rating summary block shows "5.0"', async ({ page }) => {
    await expect(page.locator('#reviews').getByText('5.0')).toBeVisible()
  })

  test('Google rating summary block shows star icons', async ({ page }) => {
    const summaryBlock = page.locator('#reviews').locator('.max-w-md')
    await expect(summaryBlock).toBeVisible()
    await expect(summaryBlock.locator('svg')).toHaveCount(5)
  })

  test('Google rating summary block mentions "Google Reviews"', async ({ page }) => {
    await expect(page.locator('#reviews').getByText(/google reviews/i)).toBeVisible()
  })

  test('Google rating summary block shows area name (not raw placeholder)', async ({ page }) => {
    const summary = page.locator('#reviews .max-w-md').or(
      page.locator('#reviews').getByText(/top-rated by students/i)
    )
    const text = await summary.first().innerText()
    expect(text).not.toContain('[Your Area]')
    expect(text.length).toBeGreaterThan(0)
  })
})
