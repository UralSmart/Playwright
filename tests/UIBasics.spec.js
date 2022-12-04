const {test, expect} = require('@playwright/test')


test('Browser context', async ({browser}) =>
{
    const contex = await browser.newContext()
    const page = await contex.newPage()
    const userName = page.locator("#username")
    const userPass = page.locator("#password")
    const signIn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    // wrong username
    await userName.type("aaa")
    await userPass.type("learning")
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent(""))
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")
    // correct credentials
    await userPass.fill("")
    await userName.fill("rahulshettyacademy")
    await userPass.fill("learning")
    await signIn.click()
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
})

