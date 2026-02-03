import { test } from "@playwright/test";

test("@smoke locator stratergy", async ({ page }) => {
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
});
