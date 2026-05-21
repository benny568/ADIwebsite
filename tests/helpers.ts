import { type Page } from '@playwright/test'

/** Navigate to the home page and wait for the hero section to be visible. */
export async function gotoHome(page: Page) {
  await page.goto('/')
  await page.waitForSelector('h1', { state: 'visible' })
}

/** Scroll an element into view using its anchor id. */
export async function scrollToSection(page: Page, id: string) {
  await page.evaluate((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView()
  }, id)
}

/** Set viewport to a common mobile size (375×812 — iPhone X). */
export async function setMobileViewport(page: Page) {
  await page.setViewportSize({ width: 375, height: 812 })
}

/** Set viewport to a desktop size. */
export async function setDesktopViewport(page: Page) {
  await page.setViewportSize({ width: 1280, height: 800 })
}

/** Mock a Formspree POST to return a given HTTP status. */
export async function mockFormspree(page: Page, status: 200 | 500) {
  await page.route('**/formspree.io/**', (route) => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(status === 200 ? { ok: true } : { error: 'server error' }),
    })
  })
}
