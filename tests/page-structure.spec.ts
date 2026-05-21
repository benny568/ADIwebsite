import { test, expect } from '@playwright/test'
import { gotoHome } from './helpers'

test.describe('Page structure', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('has correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(/Driving Instructor/)
  })

  test('has correct language attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBe('en-IE')
  })

  test('has a description meta tag', async ({ page }) => {
    const meta = page.locator('meta[name="description"]')
    const content = await meta.getAttribute('content')
    expect(content).toBeTruthy()
    expect(content!.length).toBeGreaterThan(50)
  })

  test('has Open Graph meta tags', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_IE')
  })

  test('renders a single H1', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('has a <main> landmark', async ({ page }) => {
    await expect(page.locator('main')).toHaveCount(1)
  })

  test('has a <header> landmark', async ({ page }) => {
    await expect(page.locator('header')).toHaveCount(1)
  })

  test('has a <footer> landmark', async ({ page }) => {
    await expect(page.locator('footer')).toHaveCount(1)
  })

  test('all required section ids exist in the DOM', async ({ page }) => {
    const ids = ['about', 'why', 'services', 'pricing', 'reviews', 'booking', 'contact']
    for (const id of ids) {
      await expect(page.locator(`#${id}`), `section #${id} should exist`).toBeAttached()
    }
  })

  test('page has no broken anchor links', async ({ page }) => {
    const anchors = page.locator('a[href^="#"]')
    const count = await anchors.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await anchors.nth(i).getAttribute('href')
      if (!href || href === '#') continue
      const id = href.slice(1)
      const target = page.locator(`#${id}`)
      await expect(target, `anchor target #${id} should exist`).toBeAttached()
    }
  })
})
