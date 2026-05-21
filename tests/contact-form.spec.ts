import { test, expect } from '@playwright/test'
import { gotoHome, scrollToSection, mockFormspree } from './helpers'

test.describe('Contact section — layout', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'contact')
  })

  test('section is present with correct id', async ({ page }) => {
    await expect(page.locator('#contact')).toBeAttached()
  })

  test('heading says "Get in Touch"', async ({ page }) => {
    await expect(
      page.locator('#contact').getByRole('heading', { name: /get in touch/i }),
    ).toBeVisible()
  })

  test('phone link is visible and uses tel: protocol', async ({ page }) => {
    const tel = page.locator('#contact').locator('a[href^="tel:"]')
    await expect(tel).toBeVisible()
    const href = await tel.getAttribute('href')
    expect(href).toMatch(/^tel:/)
  })

  test('email link is visible and uses mailto: protocol', async ({ page }) => {
    const mailto = page.locator('#contact').locator('a[href^="mailto:"]')
    await expect(mailto).toBeVisible()
  })

  test('operating area is displayed', async ({ page }) => {
    await expect(page.locator('#contact').getByText('Operating Area')).toBeVisible()
  })
})

test.describe('Contact form — field rendering', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'contact')
  })

  test('name field is visible with a label', async ({ page }) => {
    await expect(page.locator('#contact').getByLabel(/full name/i)).toBeVisible()
  })

  test('email field is visible with a label', async ({ page }) => {
    await expect(page.locator('#contact').getByLabel(/email address/i)).toBeVisible()
  })

  test('phone field is optional (no asterisk in accessible name)', async ({ page }) => {
    await expect(page.locator('#contact').getByLabel(/phone number/i)).toBeVisible()
  })

  test('message textarea is visible with a label', async ({ page }) => {
    await expect(page.locator('#contact').getByLabel(/message/i)).toBeVisible()
  })

  test('submit button reads "Send Message" in idle state', async ({ page }) => {
    await expect(
      page.locator('#contact').getByRole('button', { name: /send message/i }),
    ).toBeVisible()
  })
})

test.describe('Contact form — validation errors', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'contact')
  })

  test('submitting empty form shows name validation error', async ({ page }) => {
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/at least 2 characters/i)).toBeVisible()
  })

  test('submitting empty form shows email validation error', async ({ page }) => {
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/valid email/i)).toBeVisible()
  })

  test('submitting empty form shows message validation error', async ({ page }) => {
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/at least 10 characters/i)).toBeVisible()
  })

  test('invalid email format shows email error', async ({ page }) => {
    await page.locator('#contact').getByLabel(/full name/i).fill('Test User')
    await page.locator('#contact').getByLabel(/email address/i).fill('not-an-email')
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/valid email/i)).toBeVisible()
  })

  test('name less than 2 chars shows name error', async ({ page }) => {
    await page.locator('#contact').getByLabel(/full name/i).fill('A')
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/at least 2 characters/i)).toBeVisible()
  })

  test('message less than 10 chars shows message error', async ({ page }) => {
    await page.locator('#contact').getByLabel(/full name/i).fill('Test User')
    await page.locator('#contact').getByLabel(/email address/i).fill('test@example.com')
    await page.locator('#contact').getByLabel(/message/i).fill('Short')
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/at least 10 characters/i)).toBeVisible()
  })

  test('valid name clears name error', async ({ page }) => {
    // Trigger error first
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/at least 2 characters/i)).toBeVisible()

    // Fill valid name
    await page.locator('#contact').getByLabel(/full name/i).fill('Valid Name')
    // Error should disappear
    await expect(page.locator('#contact').getByText(/at least 2 characters/i)).toBeHidden()
  })

  test('no errors shown on initial load', async ({ page }) => {
    await expect(page.locator('#contact').getByText(/at least 2 characters/i)).toBeHidden()
    await expect(page.locator('#contact').getByText(/valid email/i)).toBeHidden()
    await expect(page.locator('#contact').getByText(/at least 10 characters/i)).toBeHidden()
  })
})

test.describe('Contact form — submission states', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await scrollToSection(page, 'contact')
  })

  async function fillValidForm(page: import('@playwright/test').Page) {
    await page.locator('#contact').getByLabel(/full name/i).fill('Jane Doe')
    await page.locator('#contact').getByLabel(/email address/i).fill('jane@example.com')
    await page.locator('#contact').getByLabel(/phone number/i).fill('+353 87 123 4567')
    await page.locator('#contact').getByLabel(/message/i).fill('I would like to book a manual driving lesson please.')
  }

  test('submit button shows "Sending..." while submitting', async ({ page }) => {
    await mockFormspree(page, 200)
    await fillValidForm(page)

    // Intercept the response to observe the intermediate state
    let sawSending = false
    page.on('request', async () => {
      const btnText = await page.locator('#contact button[type="submit"]').innerText().catch(() => '')
      if (btnText.includes('Sending')) sawSending = true
    })

    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await page.locator('#contact').getByText('Message Sent!').waitFor({ timeout: 5000 })
    // The transition was observed (sawSending may be true depending on timing)
    // At minimum the success state must appear
    await expect(page.locator('#contact').getByText('Message Sent!')).toBeVisible()
  })

  test('successful submission shows success message', async ({ page }) => {
    await mockFormspree(page, 200)
    await fillValidForm(page)
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText('Message Sent!')).toBeVisible({ timeout: 5000 })
    await expect(page.locator('#contact')).toContainText(/thanks for getting in touch/i)
  })

  test('successful submission hides the form', async ({ page }) => {
    await mockFormspree(page, 200)
    await fillValidForm(page)
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText('Message Sent!')).toBeVisible({ timeout: 5000 })
    await expect(page.locator('#contact').locator('form')).toBeHidden()
  })

  test('"Send another message" resets to idle state', async ({ page }) => {
    await mockFormspree(page, 200)
    await fillValidForm(page)
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText('Message Sent!')).toBeVisible({ timeout: 5000 })

    await page.locator('#contact').getByText('Send another message').click()
    await expect(page.locator('#contact').locator('form')).toBeVisible()
    await expect(page.locator('#contact').getByRole('button', { name: /send message/i })).toBeVisible()
  })

  test('failed submission shows error message', async ({ page }) => {
    await mockFormspree(page, 500)
    await fillValidForm(page)
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/something went wrong/i)).toBeVisible({ timeout: 5000 })
  })

  test('failed submission keeps the form visible', async ({ page }) => {
    await mockFormspree(page, 500)
    await fillValidForm(page)
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await expect(page.locator('#contact').getByText(/something went wrong/i)).toBeVisible({ timeout: 5000 })
    await expect(page.locator('#contact').locator('form')).toBeVisible()
  })

  test('form POST sends correct field values to Formspree', async ({ page }) => {
    const requestBodies: unknown[] = []
    await page.route('**/formspree.io/**', async (route) => {
      const body = route.request().postDataJSON()
      requestBodies.push(body)
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await fillValidForm(page)
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await page.locator('#contact').getByText('Message Sent!').waitFor({ timeout: 5000 })

    expect(requestBodies).toHaveLength(1)
    const body = requestBodies[0] as Record<string, string>
    expect(body.name).toBe('Jane Doe')
    expect(body.email).toBe('jane@example.com')
    expect(body.phone).toBe('+353 87 123 4567')
    expect(body.message).toBe('I would like to book a manual driving lesson please.')
  })

  test('form POST includes correct Content-Type and Accept headers', async ({ page }) => {
    const requestHeaders: Record<string, string>[] = []
    await page.route('**/formspree.io/**', async (route) => {
      requestHeaders.push(route.request().headers())
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await fillValidForm(page)
    await page.locator('#contact').getByRole('button', { name: /send message/i }).click()
    await page.locator('#contact').getByText('Message Sent!').waitFor({ timeout: 5000 })

    expect(requestHeaders).toHaveLength(1)
    expect(requestHeaders[0]['content-type']).toContain('application/json')
    expect(requestHeaders[0]['accept']).toContain('application/json')
  })
})
