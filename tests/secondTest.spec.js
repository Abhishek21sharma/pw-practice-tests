import { test } from "@playwright/test";

test.beforeAll(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  //clicking on an element based on the text..

  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax", async ({ page }) => {
  //by tag name
  page.locator("input"); //may not be unique.. it returns list of elements

  //by id
  page.locator("#inputEmail");

  //by class value
  page.locator(".shape-rectangle");

  //by attribute --attributename=attributeValue
  page.locator('[placeholder="Email]');

  //by entire-class value
  page.locator(
    '[class="appearance-filled size-medium shape-rectangle status-primary nb-transition"]'
  );

  //combining different selecotrs to find the best suited
  page.locator('input[placeholder="Email]');

  //combinig more selecotrs
  page.locator('input[placeholder="Email].shape-rectangle');

  //or something like this:
  page.locator("input.shape-rectangle");

  //BY  XAPTH also works -- but not recommended by playwright....

  //by partial text match
  page.locator(':text("Using")');

  //by exact text match
  page.locator(':text-is("USing the Grid")');
});
