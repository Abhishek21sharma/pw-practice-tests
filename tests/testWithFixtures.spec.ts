//fixturess will be test ENV
// we can basically add more to 'test' method from playwright..
// we can ask it to work as beforeEach + more features..
import { test } from "../test-options";

//here is anexample of fixture as pre-req : a code which will run automatically , when we
//'declare' it as a test and beforeeach or beforeall..

// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
// });

test("before fixture  example:", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test(" fixture  example:", async ({ page }) => {
  //since formLayoutPage is 'defined' as auto: true:
  //test(" fixture  example:", async ({ page, formLayoutPage }) => {
  //   await page.getByText("Forms").click();
  //   await page.getByText("Form Layouts").click();

  //above code is handled automatically as part of fixture itself
  console.log("fixtures as before and run automatically");
});
