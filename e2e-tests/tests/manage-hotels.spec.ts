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

test("should allow user to add hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`)
    await page.locator("[name=name]").fill("Test Hotel")
    await page.locator("[name=city]").fill("Test city")
    await page.locator("[name=country]").fill("Test country")
    await page.locator("[name=description]").fill("Test description")
    await page.locator("[name=pricePerNight]").fill("100")
    await page.selectOption('select[name="starRating"]', "3")

    await page.getByText("Budget").click()

    await page.getByLabel("Free Wifi").check()
    await page.getByLabel("Parking").check()

    await page.locator('[name="adultCount"]').fill("2")
    await page.locator('[name="childCount"]').fill("4")

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.avif"),
        path.join(__dirname, "files", "2.avif"),
    ])

    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Hotel saved!")).toBeVisible()
})

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`)

    // await page.waitForSelector(':text("Test Hotel")')
    // await expect(page.locator(':has-text("Test Hotel")')).toBeVisible()

    await expect(page.getByText("Test Hotel")).toBeVisible()
    await expect(page.getByText("Test description")).toBeVisible()
    await expect(page.getByText("Test city, Test country")).toBeVisible()
    await expect(page.getByText("Budget")).toBeVisible()
    await expect(page.getByText("€100 per night")).toBeVisible()
    await expect(page.getByText("2 adults, 4 children")).toBeVisible()
    await expect(page.getByText("3 Star Rating")).toBeVisible()

    await expect(page.getByRole("link", { name: "View details" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible()
})
