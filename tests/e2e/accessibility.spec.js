const { test, expect } = require('@playwright/test')

async function runAxe(page) {
  // inject axe from CDN and run
  await page.addScriptTag({ url: 'https://unpkg.com/axe-core@4.4.1/axe.min.js' })
  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })
  })
  return results
}

test.describe('a11y smoke', () => {
  test('simulator page should have no critical/serious violations', async ({ page }) => {
    await page.goto('/simulator')
    const res = await runAxe(page)
    // Fail if any violation with impact critical or serious
    const bad = res.violations.filter(v => v.impact === 'critical' || v.impact === 'serious')
    expect(bad.length).toBe(0)
  })

  test('email-capture page should have no critical/serious violations', async ({ page }) => {
    await page.goto('/simulator/email-capture')
    const res = await runAxe(page)
    const bad = res.violations.filter(v => v.impact === 'critical' || v.impact === 'serious')
    if (bad.length > 0) console.log('Axe violations:', JSON.stringify(bad, null, 2))
    expect(bad.length).toBe(0)
  })

  test('tool3 results page a11y smoke', async ({ page }) => {
    // drive the app to results quickly using existing flows
    await page.goto('/simulator')
    // progress Tool1
    for (let i = 0; i < 3; i++) {
      await page.locator('main button').first().click()
      await page.waitForTimeout(100)
    }
    await page.locator('text=המשך לבדיקת בטיחות').click()
    await page.locator('main button').first().click()
    await page.locator('input[type="range"]').first().evaluate(el => { el.value = 5; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')) })
    await page.locator('text=הבא').first().click()
    await page.locator('main button').first().click()
    await page.locator('input[type="range"]').evaluate(el => { el.value = 5; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')) })
    await page.locator('text=הבא').first().click()
    await page.locator('text=לחישוב חסכון לעסק ←').click()
    await page.locator('text=המשך ←').first().click()
    await page.locator('text=בינונית').first().click()
    await page.locator('text=עזרה מינימלית').first().click()
    await page.locator('text=חישוב תוצאות').click()

    await page.waitForSelector('text=תחזית חיסכון ל־6 חודשים')
    const res = await runAxe(page)
    const bad = res.violations.filter(v => v.impact === 'critical' || v.impact === 'serious')
    expect(bad.length).toBe(0)
  })
})
