import { test as base } from "@playwright/test";

//also import pageManager local dir
//import {PageManager} from '';

export type TestOptions = {
  //a URL used for drag and drop feature..
  globalsQaURL: string;
  formLayoutPage: string;
  //declaring pageManager of type PageManager
  //pageManager : PageManager;
};

export const test = base.extend<TestOptions>({
  //can also setup a default value here..
  globalsQaURL: ["", { option: true }],
  //declaring this fixture above
  //defining this fixture (named as formLayout here)
  //we need 2 mthods for this fixture method.. use and first for page fixture
  formLayoutPage: [
    async ({ page }, use) => {
      await page.goto("/");
      await page.getByText("Forms").click();
      await page.getByText("Form Layouts").click();
      //need to make 'use' now
      await use("");
    },
    { auto: true },
  ],

  //pageManager: async({page},use) => {
  //const pm = new PageManager(page);
  //await use(pm)
  //}
});
