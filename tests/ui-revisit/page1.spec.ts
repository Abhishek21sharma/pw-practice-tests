import { test, expect } from "@playwright/test";
import { NavPage } from "./NavPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("form page nav tests", async ({ page }) => {
  const navPage = new NavPage(page);
  await navPage.formLayoutPage();
});
