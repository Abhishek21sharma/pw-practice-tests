import { expect, test } from "@playwright/test";

test("auto wait", async ({ page }) => {
  //as we see in the docs , there are very few methods which will do auto-waiting for all of the methods
  //some methods doesn't wait auto
  // a detailed list is here
  //https://playwright.dev/docs/actionability
  //let's try to some of them

  await page.goto("http://uitestingplayground.com/ajax");

  //auto wait is handled .. pageload is handled
  await page.getByText("Button Triggering AJAX Request").click();

  //auto wait .. default to 30 seconds...
  //this can be updated in playwright config file.. add tiemout: 10000 (this is in ms so it will be 10 secs)

  /*..
  ..
  ..
  */

  //if for certain methods we don't have any condition defined (auto defined)
  // we can add it in there
  await uiMsg.waitFor({ state: "attached" });

  //also for hardcoading blocking the page like thread.sleep(), it's not recommended here but if we want to use it:
  await page.waitForTimeout(10000); //10 secs

  //or simply
  uiMsg.waitFor();
  const msgLocator = page.locator(".b-success");
  const uiMsg = await page.locator(".bg-success").allTextContents();
  const actualSuccessMsg = "Data loaded with AJAX get request.";
  expect(uiMsg).toEqual(actualSuccessMsg);

  //also expect condition have default timeout to 5 seconds
  //but we can update this in the method call itself as these methods allows that

  await expect(msgLocator).toHaveText(actualSuccessMsg, { timeout: 20000 });

  //more wait command/states
  await page.waitForSelector(uiMsg); //default 30 secs

  //wait for particualr response
  await page.waitForResponse("http://uitestingplayground.com"); //provide the URL after click we want to fetch etc

  //wait for network calls to be completed -->  not recommended
});
