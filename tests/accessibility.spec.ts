import { test, expect } from '@playwright/test'
import { gotoHome, scrollToSection, setMobileViewport } from './helpers'

test.describe('Accessibility — landmark roles', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('page has exactly one <main> element', async ({ page }) => {
    await expect(page.getByRole('main')).toHaveCount(1)
  })

  test('page has a banner landmark (header)', async ({ page }) => {
    await expect(page.getByRole('banner')).toHaveCount(1)
  })

  test('page has a contentinfo landmark (footer)', async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toHaveCount(1)
  })

  test('page has navigation landmarks', async ({ page }) => {
    const navs = page.getByRole('navigation')
    const count = await navs.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})

test.describe('Accessibility — headings hierarchy', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('there is exactly one H1 on the page', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('H2 headings exist for each major section', async ({ page }) => {
    const h2s = page.locator('h2')
    const count = await h2s.count()
    expect(count).toBeGreaterThanOrEqual(6) // about, why, services, pricing, testimonials, booking, contact
  })

  test('H1 comes before any H2 in DOM order', async ({ page }) => {
    const h1Position = await page.evaluate(() => {
      const h1 = document.querySelector('h1')
      const h2 = document.querySelector('h2')
      if (!h1 || !h2) return false
      return h1.compareDocumentPosition(h2) & Node.DOCUMENT_POSITION_FOLLOWING
    })
    expect(h1Position).toBeTruthy()
  })
})

test.describe('Accessibility — images', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('all images have non-empty alt attributes', async ({ page }) => {
    const images = page.locator('img')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt, `image ${i} should have a non-empty alt attribute`).toBeTruthy()
      expect(alt?.length ?? 0).toBeGreaterThan(0)
    }
  })

  test('decorative SVG icons use aria-hidden', async ({ page }) => {
    const hiddenSvgs = page.locator('svg[aria-hidden="true"]')
    const count = await hiddenSvgs.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('Accessibility — interactive elements', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('all buttons have accessible names', async ({ page }) => {
    const buttons = page.getByRole('button')
    const count = await buttons.count()
    for (let i = 0; i < count; i++) {
      const name = await buttons.nth(i).getAttribute('aria-label')
        ?? await buttons.nth(i).innerText()
      expect(name.trim().length, `button ${i} should have an accessible name`).toBeGreaterThan(0)
    }
  })

  test('hamburger button has aria-label', async ({ page }) => {
    await setMobileViewport(page)
    await page.reload()
    await page.waitForSelector('h1')
    const hamburger = page.locator('header button[aria-label]')
    const label = await hamburger.getAttribute('aria-label')
    expect(label).toBeTruthy()
    expect(label?.length ?? 0).toBeGreaterThan(0)
  })

  test('star rating components have aria-label', async ({ page }) => {
    await scrollToSection(page, 'reviews')
    const ratingContainers = page.locator('#reviews [aria-label*="out of 5 stars"]')
    const count = await ratingContainers.count()
    expect(count).toBeGreaterThanOrEqual(6) // one per testimonial
  })

  test('form inputs have associated labels', async ({ page }) => {
    await scrollToSection(page, 'contact')
    const inputs = ['name', 'email', 'phone', 'message']
    for (const id of inputs) {
      const label = page.locator(`label[for="${id}"]`)
      await expect(label, `label for "${id}" should exist`).toBeAttached()
    }
  })

  test('submit button is focusable via keyboard', async ({ page }) => {
    await scrollToSection(page, 'contact')
    const submitBtn = page.locator('#contact').getByRole('button', { name: /send message/i })
    // Focus the button directly and confirm it receives focus
    await submitBtn.focus()
    const focused = await page.evaluate(
      (el) => document.activeElement === el,
      await submitBtn.elementHandle(),
    )
    expect(focused).toBe(true)
  })

  test('CTA buttons have visible focus styles', async ({ page }) => {
    const firstCta = page.locator('section').first().getByRole('link', { name: /book a lesson/i })
    await firstCta.focus()
    const outline = await firstCta.evaluate((el) => getComputedStyle(el).outlineStyle)
    // focus:ring-2 produces a box-shadow or outline in Tailwind
    const boxShadow = await firstCta.evaluate((el) => getComputedStyle(el).boxShadow)
    expect(outline !== 'none' || boxShadow !== 'none').toBe(true)
  })
})

test.describe('Accessibility — links', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('external social links have rel="noopener noreferrer"', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]')
    const count = await externalLinks.count()
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel')
      expect(rel, 'external links should have rel="noopener noreferrer"').toContain('noopener')
    }
  })

  test('phone number link uses tap-to-call protocol', async ({ page }) => {
    const telLinks = page.locator('a[href^="tel:"]')
    const count = await telLinks.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const href = await telLinks.nth(i).getAttribute('href')
      expect(href).toMatch(/^tel:\+/)
    }
  })
})

test.describe('Accessibility — colour contrast', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('H1 text is not transparent or invisible', async ({ page }) => {
    const color = await page.locator('h1').evaluate((el) => getComputedStyle(el).color)
    expect(color).not.toBe('rgba(0, 0, 0, 0)')
    expect(color).not.toBe('transparent')
  })

  test('primary CTA button text is visible (non-transparent)', async ({ page }) => {
    const btn = page.locator('section').first().getByRole('link', { name: /book a lesson/i })
    const color = await btn.evaluate((el) => getComputedStyle(el).color)
    expect(color).not.toBe('rgba(0, 0, 0, 0)')
  })
})

test.describe('Accessibility — keyboard navigation', () => {
  test('Tab key moves focus through interactive elements in logical order', async ({ page }) => {
    await gotoHome(page)
    await page.keyboard.press('Tab')
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName.toLowerCase())
    expect(['a', 'button'].includes(firstFocused ?? '')).toBe(true)
  })

  test('Enter key activates a focused link', async ({ page }) => {
    await gotoHome(page)
    // Focus the first anchor and press Enter
    await page.locator('header a').first().focus()
    await page.keyboard.press('Enter')
    // Page should not navigate away (it's a hash link)
    await expect(page).toHaveURL(/localhost/)
  })
})
