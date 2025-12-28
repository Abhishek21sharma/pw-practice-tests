import { test, expect } from "@playwright/test";

test("all types of assertions", async ({ page }) => {
  //when we use 'expect' from playwright
  //in some methods of 'expect', it returns a 'promise'
  //in those methods we have to use 'await'
  //otherwise we don't have to ..
  // 2 types of assertions --> locator assertions.. and generic cassertions..

  //generic assertions.. generic in nature and work on text etc nand they do not need
  //to do await

  //locator assertions .. they need to ass await as they returns a promise

  const emailField = page.getByRole("textbox", { name: "EmailField" });
  //as the the method 'toHaveValue' is a promise..
  await expect(emailField).toHaveValue("test@test.com");

  //All Generic Assertions --> they doesn't require await as they are not returning a promise..
  //as this doesnt retuns a promise
  expect(emailField).toEqual("test@test.com");

  //another example of generic assertion..
  const value = 5;
  expect(value).toEqual(5);

  //locator assertions has auto waiting time before it fails.. default to 5 seconds
  //also it has more methods

  //SOFT assertion..
  await expect.soft(emailField).toHaveText("Submit");
  await emailField.click();
  //soft assertion -- if above test fails, soft assertion will cont. to run the flow and later throw the error once the program closes
  //soft assertion is not a good practice
});
