const {test, expect} = require('@playwright/test')


test('Browser context', async ({page}) =>
{
    // login
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("uralsmart@gmail.com")
    await page.locator("#userPassword").fill("12345678rA")
    await page.locator("#login").click()
    await page.waitForLoadState("networkidle")
    // list of goods
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)
})

