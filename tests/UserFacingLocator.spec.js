import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  //clicking on an element based on the title..

  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("User facing locators", async ({ page }) => {
  //clicln=ing on name
  await page.getByRole("textbox", { name: "Email" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByPlaceholder("Jane Doe").click();

  //can use any static text avaible in the UI
  await page.getByText("Using the grid").click();

  //by testId.. can assign TestID by ourself in the code
});
