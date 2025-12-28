import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("nav to form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigatoTo().formLayoutPage();
  // const navTo = new NavigationPage(page);
  //await navTo.formLayoutPage();
  //hard code -- timeout --
  await page.waitForTimeout(1000);
  await navTo.datepickerPage();
});
