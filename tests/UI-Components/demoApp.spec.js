import { test } from "@playwright/test";

test("demo app", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator(".submit-button").click();
});
