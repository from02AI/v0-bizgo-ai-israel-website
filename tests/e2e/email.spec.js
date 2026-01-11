const { test, expect } = require('@playwright/test')

test('Email capture submits and shows confirmation', async ({ page }) => {
  // Navigate directly to email capture page
  await page.goto('/simulator/email-capture')
  // heading text and submit button share similar label; target the heading explicitly
  await expect(page.locator('role=heading[name="שלחו לי את התוצאות"]').first()).toBeVisible()

  // Fill email and submit
  await page.fill('input[type="email"]', 'test@example.com')
  await page.check('#whatsapp')
  await page.locator('text=שלחו לי את התוצאות ←').click()

  // Expect success message
  await expect(page.locator('text=הדוח נשלח!')).toBeVisible()
  await expect(page.locator('text=test@example.com')).toBeVisible()
})
