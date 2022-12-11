const {test, expect} = require('@playwright/test')


test('Browser context', async ({page}) =>
{
    const productName = "zara coat 3"
    const products = page.locator(".card-body")
    const email = "uralsmart@gmail.com"
    // login
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email)
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
    await expect(page.locator("label[type='text']")).toHaveText(email)
    await page.locator(".action__submit").click()
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.")
    let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    orderId = orderId.substring(2, 26)
    console.log(orderId)
    // order list
    await page.locator("button[routerlink*='myorders']").click()
    await page.locator("tbody").waitFor()
    const rows = await page.locator("tbody tr")
    for(let i = 0; i < await rows.count; i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent
        if(orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click()
            console.log(rowOrderId)
            break
        }
    }
    // const orderIdDetails = await page.locator(".col-text.-main").textContent()
    // console.log(orderIdDetails)
    // expect(orderId.includes(orderIdDetails)).toBeTruthy()
})

