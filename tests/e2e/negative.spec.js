const { test, expect } = require('@playwright/test')

test.describe('Negative & edge-case checks', () => {
  test('invalid email prevents submission', async ({ page }) => {
    await page.goto('/simulator/email-capture')
    await expect(page.locator('role=heading[name="שלחו לי את התוצאות"]').first()).toBeVisible()

    // Fill invalid email and try to submit
    await page.fill('input[type="email"]', 'not-an-email')
    await page.locator('text=שלחו לי את התוצאות ←').click()

    // Browser validation should prevent submission; confirmation not shown
    await expect(page.locator('text=הדוח נשלח!')).not.toBeVisible()
    await expect(page.locator('role=heading[name="שלחו לי את התוצאות"]').first()).toBeVisible()
  })

  test('extreme numeric inputs are clamped and do not produce NaN/Infinity', async ({ page }) => {
    await page.goto('/simulator')

    // Progress Tool1 (3 steps)
    for (let i = 0; i < 3; i++) {
      const btn = page.locator('main button').first()
      await expect(btn).toBeVisible()
      await btn.click()
      await page.waitForTimeout(100)
    }
    await page.locator('text=המשך לבדיקת בטיחות').click()

    // Tool2: choose safe options to get to Tool3
    await page.locator('main button').first().click()
    await page.waitForTimeout(100)
    await page.locator('input[type="range"]').first().evaluate((el) => { el.value = 5; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')) })
    await page.locator('text=הבא').first().click()
    await page.locator('main button').first().click()
    await page.waitForTimeout(100)
    await page.locator('input[type="range"]').evaluate((el) => { el.value = 5; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')) })
    await page.locator('text=הבא').first().click()

    // Continue to Tool3
    await page.locator('text=לחישוב חסכון לעסק ←').click()

    // Tool3: set extreme values via eval (max allowed ranges and beyond)
    await page.locator('#hoursPerWeek').evaluate((el) => { el.value = 168; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')) })
    await page.locator('#numEmployees').evaluate((el) => { el.value = 1000; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')) })
    await page.locator('#hourlyRate').evaluate((el) => { el.value = 10000; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')) })
    await page.locator('text=המשך ←').click()

    // Step 2 & 3: accept defaults
    await page.locator('text=בינונית').first().click()
    await page.locator('text=עזרה מינימלית').first().click()

    // Step 4: use preferred budget and set a very large number
    await page.locator('button:has-text("תקציב מועדף")').click()
    await page.fill('#monthlyBudget', '9999999999')
    await page.locator('text=חישוב תוצאות').click()

    // Expect results view and that displayed currency is finite and contains digits
    const totalEl = await page.locator('div.text-5xl').first()
    await expect(totalEl).toBeVisible()
    const text = await totalEl.textContent()
    expect(text).toMatch(/₪\s*[-+\d,]+/) // contains numeric currency
    expect(text).not.toContain('NaN')
    expect(text).not.toContain('Infinity')
  })
})
