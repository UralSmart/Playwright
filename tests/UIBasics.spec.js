const {test, expect} = require('@playwright/test')


test('Browser context', async ({browser}) =>
{
    const contex = await browser.newContext() //incognito like
    const page = await contex.newPage()
    const userName = page.locator("#username")
    const userPass = page.locator("#password")
    const signIn = page.locator("#signInBtn")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // css
    await userName.type("aaa")
    await userPass.type("learning")
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent(""))
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")
    // type - fill
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()
    // console.log(await page.locator(".card-body a").textContent())
})

