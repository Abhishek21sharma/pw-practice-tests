//Now, in your step definitions,
// you don't need to instantiate anything.
// You simply use this.page.
//  Note that you must use regular functions (function() {})
//  instead of arrow functions (() => {})
//  because arrow functions do not have their own this context.

import { Given, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given("I navigate to the login page", async function (this: CustomWorld) {
  // 'this' refers to our CustomWorld instance
  await this.page?.goto("https://example.com/login");
});

When("I enter my credentials", async function (this: CustomWorld) {
  await this.page?.fill("#username", "myUser");
  await this.page?.fill("#password", "myPass");
});
