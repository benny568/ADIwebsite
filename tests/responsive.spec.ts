import { test, expect } from '@playwright/test'
import { gotoHome, setMobileViewport, setDesktopViewport, scrollToSection } from './helpers'

test.describe('Responsive — mobile layout (375px)', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page)
    await gotoHome(page)
  })

  test('page renders without horizontal scroll', async ({ page }) => {
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = page.viewportSize()?.width ?? 375
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2) // 2px tolerance
  })

  test('hero H1 is visible at mobile width', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible()
  })

  test('hero CTAs stack vertically on mobile', async ({ page }) => {
    const hero = page.locator('section').first()
    const bookBtn = hero.getByRole('link', { name: /book a lesson/i })
    const pricesBtn = hero.getByRole('link', { name: /view prices/i })

    const bookBox = await bookBtn.boundingBox()
    const pricesBox = await pricesBtn.boundingBox()

    // On mobile, buttons stack: prices button should be below book button
    expect(pricesBox?.y ?? 0).toBeGreaterThan((bookBox?.y ?? 0) + (bookBox?.height ?? 0) / 2)
  })

  test('about section photo and text stack vertically on mobile', async ({ page }) => {
    await scrollToSection(page, 'about')
    const section = page.locator('#about')
    const img = section.locator('img').first()
    const heading = section.getByRole('heading', { level: 2 })

    const imgBox = await img.boundingBox()
    const headingBox = await heading.boundingBox()

    // On mobile, heading should be below image (stacked)
    expect(headingBox?.y ?? 0).toBeGreaterThan(imgBox?.y ?? 0)
  })

  test('services grid is single column on mobile', async ({ page }) => {
    await scrollToSection(page, 'services')
    const cards = page.locator('#services .grid > div')
    const count = await cards.count()

    const firstBox = await cards.nth(0).boundingBox()
    const secondBox = await cards.nth(1).boundingBox()

    // Single column: cards should have similar x coordinates
    expect(Math.abs((firstBox?.x ?? 0) - (secondBox?.x ?? 0))).toBeLessThan(20)
    // And stack vertically
    expect(secondBox?.y ?? 0).toBeGreaterThan((firstBox?.y ?? 0) + (firstBox?.height ?? 0) / 2)

    expect(count).toBe(4)
  })

  test('testimonials grid is single column on mobile', async ({ page }) => {
    await scrollToSection(page, 'reviews')
    const cards = page.locator('#reviews .grid > div')
    const firstBox = await cards.nth(0).boundingBox()
    const secondBox = await cards.nth(1).boundingBox()
    expect(secondBox?.y ?? 0).toBeGreaterThan((firstBox?.y ?? 0) + (firstBox?.height ?? 0) / 2)
  })

  test('footer stacks in single column on mobile', async ({ page }) => {
    const footerGrid = page.locator('footer .grid')
    const col1 = footerGrid.locator('> div').nth(0)
    const box1 = await col1.boundingBox()
    const viewportWidth = page.viewportSize()?.width ?? 375
    // Single column: each column fills most of the viewport width (>70%)
    // In a 3-column layout at 375px each column would only be ~87px wide
    expect(box1?.width ?? 0).toBeGreaterThan(viewportWidth * 0.7)
  })

  test('contact form takes full width on mobile', async ({ page }) => {
    await scrollToSection(page, 'contact')
    const form = page.locator('#contact').locator('.bg-slate-800.border')
    const box = await form.boundingBox()
    expect(box?.width ?? 0).toBeGreaterThan(300)
  })

  test('mobile hamburger is present and clickable', async ({ page }) => {
    const hamburger = page.locator('header button[aria-label]')
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    await expect(page.locator(String.raw`header .md\:hidden`).last()).toBeVisible()
  })
})

test.describe('Responsive — tablet layout (768px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await gotoHome(page)
  })

  test('page renders without horizontal scroll at 768px', async ({ page }) => {
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = page.viewportSize()?.width ?? 768
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })

  test('desktop nav links are visible at 768px', async ({ page }) => {
    // md: breakpoint is 768px — links become visible
    await expect(page.locator(String.raw`header nav .hidden.md\:flex`)).toBeVisible()
  })
})

test.describe('Responsive — desktop layout (1280px)', () => {
  test.beforeEach(async ({ page }) => {
    await setDesktopViewport(page)
    await gotoHome(page)
  })

  test('services renders in two columns on desktop', async ({ page }) => {
    await scrollToSection(page, 'services')
    const cards = page.locator('#services .grid > div')
    const firstBox = await cards.nth(0).boundingBox()
    const secondBox = await cards.nth(1).boundingBox()

    // Two columns: card 1 and card 2 should be on the same row (similar y)
    expect(Math.abs((firstBox?.y ?? 0) - (secondBox?.y ?? 0))).toBeLessThan(20)
  })

  test('pricing renders in four columns on desktop', async ({ page }) => {
    await scrollToSection(page, 'pricing')
    const cards = page.locator('#pricing .grid > div')

    // All four cards should be on the same row
    const boxes = await Promise.all(
      Array.from({ length: 4 }, (_, i) => cards.nth(i).boundingBox()),
    )
    const minY = Math.min(...boxes.map((b) => b?.y ?? 0))
    const maxY = Math.max(...boxes.map((b) => b?.y ?? 0))
    expect(maxY - minY).toBeLessThan(50)
  })

  test('about section is two-column on desktop', async ({ page }) => {
    await scrollToSection(page, 'about')
    const img = page.locator('#about img').first()
    const heading = page.locator('#about').getByRole('heading', { level: 2 })

    const imgBox = await img.boundingBox()
    const headingBox = await heading.boundingBox()

    // Side by side: they should overlap in vertical space
    const imgBottom = (imgBox?.y ?? 0) + (imgBox?.height ?? 0)
    const headingTop = headingBox?.y ?? 0
    expect(headingTop).toBeLessThan(imgBottom)
  })
})
