import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  //await page.goto("http://localhost:4200/");
  //above line can be replaced by below since we have baseURL enabled in config file:
  await page.goto("/");

  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("inout fields", async ({ page }) => {
  //creating a reusable locator and by directly looking into the
  //application and not looking into the CSS Or DOM of it..

  //there could be many forms (nb-card), so we need to filter what we need
  const rootPanel = page
    .locator("nb-card")
    .filter({ hasText: "Using the Grid" }); //so here we just need the root element which is nb-card.. later we didn't care how they deined the elements etc
  // we directly used the in-built method.. as see we look and see the application
  //we can see it's a text with 'Using the Grid'

  //..now in the form OR grid , we need a element - textbox (As we see it's a textbox) and having
  //visible name = 'Email'.. so we don't know the locators etc.
  //we are going as we see it..

  const ele = rootPanel.getByRole("textbox", { name: "Email" });

  const usingTheGridEmailInput = page.locator("#inputEmail1");
  await usingTheGridEmailInput.fill("test@test.com"); //to enter the data

  await usingTheGridEmailInput.clear(); //to clear the data

  //if we want to simulate the keyboard events rather then directly filling it with fill method
  await usingTheGridEmailInput.pressSequentially("test2@test.com", {
    delay: 500, //half a sec
  }); //this can delay the type speed..

  //to fetch the data.. what we type not the text here.. use inputValue() method

  const inputValue = await usingTheGridEmailInput.inputValue();
  expect(inputValue).toEqual("test2@test.com");

  //if some of element class contains .. hidden or not visible, then playwright
  //can't interact with those elements

  //to make them work , we need to pass, object in the method call with force:true parma.. as below:
  //this is true for all but majorly for 'radiobuttons'
  const radioStatus = await page
    .getByRole("radio", { name: "Option 1" })
    .check({ force: true });

  //above will click on radio button and make it check..

  //expect condition to verify boolen condition
  expect(
    await page.getByRole("radio", { name: "Option 1" }).isChecked()
  ).toBeFalsy();
});

test("List/Dropdown", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header nb-select");
  await dropDownMenu.click(); // this will expand the menu..

  //recomemnded way in playwright to  interact with the list are following:::

  // page.getByRole("list"); //when a list has UL tag
  // page.getByRole("listitem"); // when a list ha LI tag

  // const optionList = page.getByRole("list").locator("nb-option");

  //more compact way would be this::
  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

  //to select a particular value from the list..
  //it's a locator based on the loctorlist.. so we can basically use a filter method
  await optionList.filter({ hasText: "Cosmic" }).click();

  //verify colour is changing of the page ..
  //to do this we need to get the colour of the page, which is part of the css proprty background
  //first get the header..

  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

  //to verify all colours and all list items..
  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  await dropDownMenu.click();
  for (const color in colors) {
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
    if (color != "Corporate") await dropDownMenu.click();
  }
});

test("tooltip test cases", async ({ page }) => {
  //since the tooltip are overlays ..

  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  //hover on the element..

  const getFrame = page
    .locator("nb-card")
    .filter({ hasText: "Tooltip Placements" }); // this will return the particular frame element (nb-card) which has a child element value : tooltipplacements

  //to see what HTML it selected
  const html = await getFrame.evaluate((el) => el.outerHTML);
  console.log("sample node: " + html);
  const tooltipIconTop = getFrame.getByText("Top");
  await tooltipIconTop.hover();
  console.log(
    "tooltip msg is: " + (await page.locator("nb-tooltip").textContent())
  );
  //await page.hover(tooltipIconTop);

  // const toolTipText = page.locator(
  //   ".cdk-overlay-container nb-tooltip div span"
  // );

  //console.log("Tool tip msg is: " + (await toolTipText.textContent()));
});

test("dialog boxes", async ({ page }) => {
  //some dialog boxes stict to browser and not DOM
  //so we can't use CSS or inspect element for them

  // we can handle them by using :
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //we need to create a listner.. which will let playwright to do something
  //at the end of this listner..
  //it is here using core JS concepts..
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });

  //click on trash icon
  //from first row of the table..

  await page
    .getByRole("table")
    .locator("tr")
    .filter({ hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();

  //now we want to accept this dialog box which is JS internal.. ( we used above listner..)

  //now verify if the locator doesn't exisit..
});

test("web-tsbles tests", async ({ page }) => {
  //tricks to handle tables using playwright

  //for example: find the row based on the email (as it's unique)

  //update the age for that row

  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //get any row based of any test in this,,
  //we don't want to loop through this, since it's playwright and we already have
  //filter() method in this..

  //or get by role using the below .. note that we're using the unique value in the name condition here
  //here name is the actual text msg

  //also Role method, name property is updated in below.. pls check that..
  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await targetRow.locator(".nb-edit").click();

  //once the edit is clicked, it just updated the above locator to 'input' tag
  //and hence it's not a text and can not be used by name:value property
  //we will use another locator now to update the value

  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("35");

  //confirm and save
  await page.locator(".nb-checkmark").click();

  //clicking row based on the ID column...
  //now if we want playwright to find something using Role(), using name in this..
  //and to name should look for some specific column (a unique value col) to find a value

  //for example.. let's go to 2nd page and then select row with id '11'
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();

  //now select the row
  //since the row,{name:'11} -> it returns multi value.. we need to filter what we want
  //const targetRowByID = page.getByRole("row", { name: "11" }).filter({has:page.locator('td').nth(1)});
  //above choosing as nth(1) --> as ID is at col 1 for this td..

  //test filter of the table..
  //using loop feature..

  //to fetch all the elements.. not just 1 .. similar to 'findElements()
  //use locator.all() methods..
  //also if we want to use kind of hardcode wait in playwright .. we can use...
  page.waitForTimeout(500);
});
