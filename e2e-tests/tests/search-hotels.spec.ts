import { expect, test } from "@playwright/test"
import path from "path"

const UI_URL = "http://localhost:5173"

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL)

    //get the login button

    await page.getByRole("link", { name: "Login" }).click()

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()

    await page.locator("[name=email]").fill("1@1.com")
    await page.locator("[name=password]").fill("password123")

    await page.getByRole("button", { name: "Login" }).click()

    await expect(page.getByText("Logged in succesfully")).toBeVisible()
})

test("Should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL)

    await page.getByPlaceholder("Where are you going?").fill("Test city")
    await page.getByRole("button", { name: "Search" }).click()
    await expect(page.getByText("Hotels found in Test city")).toBeVisible()
    await expect(page.getByText("Test Hotel")).toBeVisible()
})
