const {test, expect} = require('@playwright/test')


test('Browser context', async ({page}) =>
{
    const productName = "zara coat 3"
    const products = page.locator(".card-body")
    // login
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("uralsmart@gmail.com")
    await page.locator("#userPassword").fill("12345678rA")
    await page.locator("#login").click()
    await page.waitForLoadState("networkidle")
    // list of goods
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)
    // Zara coat 4
    const count = await products.count()
    for(let i = 0; i < count; i++) {
        if(await products.nth(i).locator("b").textContent() === productName) {
            // add to a cart
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }
    // check cart
    await page.locator("[routerlink*='cart']").click()
    await page.locator("div li").first().waitFor()
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible()
    expect(bool).toBeTruthy()
})

