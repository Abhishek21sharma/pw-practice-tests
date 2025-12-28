import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  //clicking on an element based on the title..

  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Child Element", async ({ page }) => {
  //child elemnt --> at any root level
  //can be immediate or can be any root element

  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
});

test("locator chaining", async ({ page }) => {
  //this technique is easy to implement
  //locators canbe re-used easily

  const mainBox = page.locator("nb-card"); //this will search in the whole page
  const radioBoxes = mainBox.locator("nb-radio"); // this will search just inside the mainBox and not withing the whole page (so fast search)
  await radioBoxes.getByText("Option 1").click(); //the search will start from the radioBoxes and not from the page

  //expect condition
  await expect(radioBoxes).toHaveValue("some value");
});

test("by index of ele", async ({ page }) => {
  //index of ele starts from: 0
  await page.locator("nb-card").nth(3).click(); //this will click on 4th ele
});
