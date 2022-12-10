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
    await page.locator("text=Checkout").click()
    // paying
    await page.locator("[placeholder*='Country']").type("Ind", {delay:300})
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    let optionsCount = await dropdown.locator("button").count()
    for(let i = 0; i < optionsCount; i++) {
        let text = await dropdown.locator("button").nth(i).textContent()
        if(text === " India") {
            await dropdown.locator("button").nth(i).click()
            break
        }
    }
    await page.pause()
})

