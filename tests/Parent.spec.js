import { expect, test } from "@playwright/test";

test("locating parent elemts", async ({ page }) => {
  //lets say we want to select any nb-card --> nb-card-header (header has text = value)

  //we want to find the text then the parent

  //approach 1
  //in this approch , it will check the root which is nb-card and then go inside it
  //and check it any of it's child has text = USing the Grid..
  //it doesn't matter it can be in the body or anywhere..
  await page.locator("nb-card", { hasText: "Using the Grid" }); // it will return the nb-card

  //approach 2
  //proving a second attribute
  await page.locator("nb-card", { has: page.locator("#inputEmail") }); //it will return the nb-card

  //approcah 3 .. MOST IMPORTANT ONE
  //usage of filter in playwright..

  await page.locator("nb-card").filter({ hasText: "Baisc form" }); ///it returns that nb-card locator which has text
  // (can be anywhere under this parent node)

  //going one level up the hirechy.. in the DOM .. here locator("..") :->  this will go one level up
  await page
    .locator(':text-is("USing the Grid")')
    .locator("..")
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("selecting text", async ({ page }) => {
  //different ways based on the use case
  //single text

  const locator1 = page.locator("").getByText();
  expect(locator1).toEqual("Submit");

  //all text values
  expect(page.locator("").allTextContents()).toContain("Option 1");

  //get inner text
  expect(page.locator("").inputValue()).toEqual("");

  //get value of attribute
  expect(page.locator("").getAttribute("attributeNAme")).toEqual("");
});
