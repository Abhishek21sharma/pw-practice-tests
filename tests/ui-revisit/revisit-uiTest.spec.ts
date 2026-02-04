import { test } from "@playwright/test";

test("@smoke locator stratergy", async ({ page }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 2000); //this means that increase the default timeout
  //to +2 secs just for this tests as this maybe a slow test
  //by tag + attribute
  //page.locator('input[placeholder="Email"]'); //find such a input tag where placeholder = Email
  //css --> using .(DOT) then the class name.
  //if there is <space> between the class name (means that element belongs to multiple types of classes)
  //we can choose it with any one class name (prefixed with DOT)
  //id with #

  //BEST STRATERGY:::: LOCATOR CHAINING (useful for any automation tool)
  //if we have to choose for element from a sub-section of a whole page..
  //then it's best to first find a locator of the section and store it in a different variable
  //now for choosing an ele from within this section, best is to use this locator. next locator
  //stratergy..
  //instead of searching within the whole page and our element may find something else..
  //this approach will give us best results.. (parent locator.child locator)

  //locator and child locator  --> VERY IMPORTANT
  page.locator(".col-md-6 .ng-untouched"); //it will search for a class under the class (col-md-6)

  //again locator child locator
  page.locator("col-md-6 ng-untouched"); // difference between this and above is that
  //it will look for any locator which matches this value but above one just check for class name

  //approach 1 more better

  page.locator(".col-md-6 > .ng-untouched"); //it will look for immediate child and not under anywhere
  //in the DOM hirerchy as in 1st case

  //again approach 1 is more good

  //BEST use case:::
  //apply approach 1 with locator chainging in real world codebases/projects

  //user facing locators..
  page.getByRole("button", { name: "Sign In" });

  page.getByLabel("Email").first().click();

  //Child elements....
  //look how we created the locator
  //it's  like tag1 and under that tag(DOM) findthe next locator/html tag that is: nb-radio..
  page.locator("nb-radio-group nb-radio");

  //both are similar
  page.locator("nb-radio-group").locator("nb-radio").first().click();

  page
    .locator("nb-radio-group")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  //more powerful way to find locators..
  page.locator("nb-card", { hasText: "Using the Grid" });
  //how it works is, it will check the returning locators for nb-card and lets say 3 locators returned
  //now pw will check that which one will have this text 'Using the Grid' and return that only element

  //another way is:
  //using the any other locator stretgy inside the locator to select the unique ele
  page.locator("nb-card", { has: page.locator("value") }); //so here we are giving the locator sysntax only
  //above can be combined with filter method too

  page.locator("nb-card").filter({ hasText: "Using the Grid" }); //very useful

  //look how decently we have handled this
  page
    .locator("nb-card")
    .filter({ has: page.getByRole("radio", { name: "Option1" }) });

  //locator chaing example..
  const form1 = page.locator("nb-card"); //re-usable variable named form1 of the type 'locator'
  const radionOption1 = form1.filter({
    has: page.getByRole("radio", { name: "Option1" }),
  });
  const radionOption2 = form1.filter({
    has: page.getByRole("radio", { name: "Option2" }),
  });

  await radionOption1.click();
  await radionOption2.isChecked();

  //AUTO_WAITING:
  //mostly pw do auto-waiting for most methods like click, textContent..
  //we can check the  list from docs
  //but if it's not the case for our element
  //we can do wait until the element is attached to the UI
  await radionOption1.waitFor({ state: "attached" }); //it will wait until default to 30 secs

  //or also can explictly mention the timeout
  await radionOption1.waitFor({ timeout: 15000 }); //wait until 15 secs for this element..

  //also we can use page itself to wait for the element rather then element waiting
  await page.waitForSelector(".bg-success");
});
