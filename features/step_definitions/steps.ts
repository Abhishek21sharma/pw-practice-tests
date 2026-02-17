import { Given, When, Then } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
//console.log(">>>> DEBUG: Step definition file has been loaded by Cucumber!");

Given("Launch browser and verify the contents of HOME page", async function () {
  // Write code here that turns the phrase above into concrete actions
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("/");

  console.log("launch browser and verify the content ");
});

When("I click to {string} page", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  console.log("step 2");
});

Then("I should see {string} page", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  console.log("step 3");
});
