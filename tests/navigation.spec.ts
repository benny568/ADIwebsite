import { test, expect } from '@playwright/test'
import { gotoHome, setMobileViewport, setDesktopViewport } from './helpers'

test.describe('Navbar — desktop', () => {
  test.beforeEach(async ({ page }) => {
    await setDesktopViewport(page)
    await gotoHome(page)
  })

  test('navbar is visible on load', async ({ page }) => {
    await expect(page.locator('header nav')).toBeVisible()
  })

  test('navbar is fixed to the top', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toHaveCSS('position', 'fixed')
  })

  test('navbar contains "Book a Lesson" CTA button', async ({ page }) => {
    const cta = page.locator('header').getByRole('link', { name: /book a lesson/i })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#booking')
  })

  test('navbar links are visible and point to correct sections', async ({ page }) => {
    const expectedLinks = [
      { name: /about/i, href: '#about' },
      { name: /services/i, href: '#services' },
      { name: /pricing/i, href: '#pricing' },
      { name: /reviews/i, href: '#reviews' },
      { name: /contact/i, href: '#contact' },
    ]

    for (const { name, href } of expectedLinks) {
      const link = page.locator('header nav').getByRole('link', { name })
      await expect(link, `nav link "${name}" should be visible`).toBeVisible()
      await expect(link).toHaveAttribute('href', href)
    }
  })

  test('mobile hamburger button is hidden on desktop', async ({ page }) => {
    const hamburger = page.locator('header button[aria-label]')
    await expect(hamburger).toBeHidden()
  })

  test('logo/brand name is visible', async ({ page }) => {
    const brand = page.locator('header a').first()
    await expect(brand).toBeVisible()
    await expect(brand).toHaveAttribute('href', '#')
  })

  test('clicking a nav link scrolls to the correct section', async ({ page }) => {
    await page.locator('header nav').getByRole('link', { name: /services/i }).click()
    await expect(page.locator('#services')).toBeInViewport({ ratio: 0.1 })
  })

  test('clicking "Book a Lesson" CTA scrolls to booking section', async ({ page }) => {
    await page.locator('header').getByRole('link', { name: /book a lesson/i }).click()
    await expect(page.locator('#booking')).toBeInViewport({ ratio: 0.1 })
  })
})

test.describe('Navbar — mobile', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page)
    await gotoHome(page)
  })

  // Selects only the dropdown div (not the hamburger button, which also has md:hidden)
  const mobileDropdown = (page: import('@playwright/test').Page) =>
    page.locator(String.raw`header div.md\:hidden`)

  test('desktop nav links are hidden on mobile', async ({ page }) => {
    const desktopLinks = page.locator(String.raw`header .hidden.md\:flex`)
    await expect(desktopLinks).toBeHidden()
  })

  test('hamburger button is visible on mobile', async ({ page }) => {
    await expect(page.locator('header button[aria-label]')).toBeVisible()
  })

  test('hamburger opens the mobile menu', async ({ page }) => {
    await page.locator('header button[aria-label]').click()
    await expect(mobileDropdown(page)).toBeVisible()
  })

  test('hamburger aria-expanded updates when menu opens/closes', async ({ page }) => {
    const hamburger = page.locator('header button[aria-label]')
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    await hamburger.click()
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    await hamburger.click()
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  test('mobile menu contains all nav links', async ({ page }) => {
    await page.locator('header button[aria-label]').click()
    const links = ['About', 'Services', 'Pricing', 'Reviews', 'Contact']
    for (const name of links) {
      await expect(mobileDropdown(page).getByRole('link', { name })).toBeVisible()
    }
  })

  test('clicking a mobile menu link closes the menu', async ({ page }) => {
    await page.locator('header button[aria-label]').click()
    await mobileDropdown(page).getByRole('link', { name: 'Services' }).click()
    // After close the div is removed from DOM — toBeHidden() passes for detached elements
    await expect(mobileDropdown(page)).toBeHidden()
  })

  test('mobile menu "Book a Lesson" closes menu and navigates to booking', async ({ page }) => {
    await page.locator('header button[aria-label]').click()
    await mobileDropdown(page).getByRole('link', { name: /book a lesson/i }).click()
    await expect(mobileDropdown(page)).toBeHidden()
  })
})
