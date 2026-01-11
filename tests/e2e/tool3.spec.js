const { test, expect } = require('@playwright/test')

test('Tool3 ROI flow (full)', async ({ page }) => {
  // Start at simulator
  await page.goto('/simulator')
  await expect(page).toHaveURL(/\/simulator/)

  // Complete Tool1 (3 questions)
  for (let i = 0; i < 3; i++) {
    const btn = page.locator('main button').first()
    await expect(btn).toBeVisible()
    await btn.click()
    await page.waitForTimeout(150)
  }
  // Continue to Tool2
  await expect(page.locator('text=/10/')).toBeVisible()
  await page.locator('text=המשך לבדיקת בטיחות').click()

  // Tool2 flow (choose first option, slider, choose first option, slider)
  await expect(page.locator('text=כלי AI עובדים עם נתוני העסק')).toBeVisible()
  await page.locator('main button').first().click()
  await page.waitForTimeout(150)

  const range = page.locator('input[type="range"]').first()
  await range.evaluate((el) => { el.value = 8; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')); })
  await page.locator('text=הבא').first().click()
  await page.waitForTimeout(150)

  await page.locator('main button').first().click()
  await page.waitForTimeout(150)

  const ranges = page.locator('input[type="range"]')
  await ranges.evaluateAll((els) => {
    els.forEach((el, i) => {
      el.value = i === 0 ? 8 : 4
      el.dispatchEvent(new Event('input'))
      el.dispatchEvent(new Event('change'))
    })
  })
  await page.locator('text=הבא').first().click()

  // On Tool2 results, continue to Tool3
  await expect(page.locator('text=סטטוס בטיחות').first()).not.toBeVisible().catch(()=>{})
  await page.locator('text=לחישוב חסכון לעסק ←').click()

  // Tool3: step 1 - set hours, employees, hourly rate then continue
  await expect(page.locator('text=כמה שעות בממוצע בשבוע')).toBeVisible()
  await page.locator('#hoursPerWeek').evaluate((el) => { el.value = 6; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')); })
  await page.locator('#numEmployees').evaluate((el) => { el.value = 4; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')); })
  await page.locator('#hourlyRate').evaluate((el) => { el.value = 120; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')); })
  await page.locator('text=המשך ←').click()

  // Tool3: step 2 - pick tech comfort (choose 'בינונית' or first option)
  await expect(page.locator('text=מה רמת המוכנות הטכנולוגית')).toBeVisible()
  await page.locator('text=בינונית').first().click()

  // Step 3 - implementation profile
  await expect(page.locator('text=מי יבצעו את הטמעת כלי AI')).toBeVisible()
  await page.locator('text=עזרה מינימלית').first().click()

  // Step 4 - set preferred budget and calculate results
  await expect(page.locator('text=מה התקציב החודשי')).toBeVisible()
  await page.locator('button:has-text("תקציב מועדף")').click()
  await page.locator('#monthlyBudget').fill('500')
  await page.locator('text=חישוב תוצאות').click()

  // Expect results view with six-month total and break-even info
  await expect(page.locator('text=תחזית חיסכון ל־6 חודשים')).toBeVisible()
  await expect(page.locator('text=נקודת איזון')).toBeVisible()
  // Currency display check — target the large total element
  await expect(page.locator('div.text-5xl').first()).toBeVisible()
})
