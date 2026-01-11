const { test, expect } = require('@playwright/test')

test('simulator basic flow (Tool1 -> Tool2)', async ({ page }) => {
  // Navigate to simulator
  await page.goto('/simulator')
  await expect(page).toHaveURL(/\/simulator/)

  // Tool1: expect the main heading for Tool1
  await expect(page.locator('text=בדיקת התאמת משימות ל-AI')).toBeVisible()

  // Answer three questions by clicking the first visible option for each step
  for (let i = 0; i < 3; i++) {
    // wait for at least one button inside main
    const btn = page.locator('main button').first()
    await expect(btn).toBeVisible()
    await btn.click()
    // small pause to allow UI to update
    await page.waitForTimeout(200)
  }

  // After finishing tool1 we should see a /10 result and a continue button
  await expect(page.locator('text=/10/')).toBeVisible()
  await page.locator('text=המשך לבדיקת בטיחות').click()

  // Tool2: ensure question context exists
  await expect(page.locator('text=כלי AI עובדים עם נתוני העסק')).toBeVisible()

  // Q1: click first option
  await page.locator('main button').first().click()
  await page.waitForTimeout(200)

  // Q2: slider - set to 8
  const range = page.locator('input[type="range"]').first()
  await range.evaluate((el) => { el.value = 8; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')); })
  // click next (the page has a localized "הבא" button)
  await page.locator('text=הבא').first().click()
  await page.waitForTimeout(200)

  // Q3: click first option
  await page.locator('main button').first().click()
  await page.waitForTimeout(200)

  // Q4: slider - set to 4 and submit
  const ranges = page.locator('input[type="range"]')
  // the range for Q4 will be the first (or second) range depending on DOM; set all ranges to safe values
  await ranges.evaluateAll((els) => {
    els.forEach((el, i) => {
      el.value = i === 0 ? 8 : 4
      el.dispatchEvent(new Event('input'))
      el.dispatchEvent(new Event('change'))
    })
  })
  await page.locator('text=הבא').first().click()

  // Expect safety result heading or score to be visible
  await expect(page.locator('text=הערכת בטיחות')).toBeVisible()
  await expect(page.locator('text=/\\d+\/10/')).toBeVisible()
})
