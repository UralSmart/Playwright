const {test, expect} = require('@playwright/test')


test.skip('Browser context', async ({browser}) =>
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

test("UI Controls", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const userName = page.locator("#username")
    const userPass = page.locator("#password")
    const signIn = page.locator("#signInBtn")
    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    console.log(await page.locator(".radiotextsty").last().isChecked())
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    // await page.pause()
})

