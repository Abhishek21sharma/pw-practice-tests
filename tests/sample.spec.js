import { expect } from "@playwright/test";
import { test } from "../test-options";

//it#s a part of fixture..
test("sample test to see how to use global variables inside tests..", async ({
  page,
  globalsQaURL,
}) => {
  await page.goto(globalsQaURL);
  await page
    .getByRole("alertdialog", { name: "Decline optional cookies" })
    .click();

  await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
});

//it's outsideof fixture...
//it's a method param
test("another sample test", async ({ page }, testInfo) => {
  await page.goto("/"); //..it will go to base URL as defined in the config file..
  const projectNAME = testInfo.project.name;
  console.log("test info is: " + projectNAME);
  //look at the 'testInfo' .. so basically it will give us , the info about the test..
  //it is part of which project etc..
  //we can use them to do certain work..
  //for example
  if (projectNAME == "dev") {
    //click somewhere..
    console.log("in dev env");
  }
});

test("using env process variables..", async ({ page }) => {
  //in order to retieve the value from process.env -- we need the env lib too
  //npm i dotenv
  //once we have it , we need to update config file to enable it to read from filesystem..
  //we basically need to uncomment:dotenv.config({ path: path.resolve(__dirname, '.env') });
  //or more precisely in js term: need to uncomment or update like: require('dotenv').config()
  await page.goto(process.env.URL);

  //also to note, we can not only provide this data from.env file, it will also accept it as param at run time.
  //this is very useful to run tests in CI (as jenkins params..)
});
