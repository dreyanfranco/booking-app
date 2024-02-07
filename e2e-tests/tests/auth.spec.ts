import { expect, test } from "@playwright/test"

const UI_URL = "http://localhost:5173/"

test("should allow the user to sign in", async ({ page }) => {
    await page.goto(UI_URL)

    //get the login button

    await page.getByRole("link", { name: "Login" }).click()

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()

    await page.locator("[name=email]").fill("1@1.com")
    await page.locator("[name=password]").fill("password123")

    await page.getByRole("button", { name: "Login" }).click()

    await expect(page.getByText("Logged in succesfully")).toBeVisible()

    await expect(page.getByRole("link", { name: "Bookings" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Hotels" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible()
})

test("should allow user to register", async ({ page }) => {
    const testEmail = `test_register_${
        Math.floor(Math.random() * 90000) + 10000
    }@test.com`
    await page.goto(UI_URL)

    await page.getByRole("link", { name: "Login" }).click()
    await page.getByRole("link", { name: "Create an account here" }).click()
    await expect(
        page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible()

    await page.locator("[name=firstName]").fill("test_firstName")
    await page.locator("[name=lastName]").fill("test_lastName")
    await page.locator("[name=email]").fill(testEmail)
    await page.locator("[name=password]").fill("password123")
    await page.locator("[name=confirmPassword]").fill("password123")

    await page.getByRole("button", { name: "Register" }).click()

    await expect(page.getByText("Registration Succesful!")).toBeVisible()
    await expect(page.getByRole("link", { name: "Bookings" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Hotels" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible()
})
