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

test("should show hotel details", async ({ page }) => {
    await page.goto(UI_URL)

    await page.getByPlaceholder("Where are you going?").fill("Test city")
    await page.getByRole("button", { name: "Search" }).click()

    await page.getByText("Test Hotel").click()
    await expect(page).toHaveURL(/detail/)
    await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible()
})

test("should book hotel", async ({ page }) => {
    await page.goto(UI_URL)

    await page.getByPlaceholder("Where are you going?").fill("Test city")

    const date = new Date()
    date.setDate(date.getDate() + 3)
    const formattedDate = date.toISOString().split("T")[0]
    await page.getByPlaceholder("Check-out Date").fill(formattedDate)

    await page.getByRole("button", { name: "Search" }).click()

    await page.getByText("Test Hotel").click()
    await page.getByRole("button", { name: "Book Now" }).click()

    await expect(page.getByText("Total Cost: €300.00")).toBeVisible()
    const stripeFrame = page.frameLocator("iframe").first()
    await stripeFrame
        .locator('[placeholder="Card number"]')
        .fill("4242424242424242")
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30")
    await stripeFrame.locator('[placeholder="CVC"]').fill("242")
    await stripeFrame.locator('[placeholder="ZIP"]').fill("46026")

    await page.getByRole("button", { name: "Confirm Booking" }).click()
    await expect(page.getByText("Booking Saved")).toBeVisible()

    await page.getByRole("link", { name: "Bookings" }).click()
    await expect(page.getByText("Test Hotel")).toBeVisible()
})
