import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavPage extends HelperBase {
  //readonly page: Page; --> we don't need this since it will be coming from HelperBase class
  readonly formLayoutMenuItem: Locator;

  constructor(page: Page) {
    //this.page = page; --> this will be conflict
    super(page);
    this.formLayoutMenuItem = this.page.getByText("Form Layout");
  }

  async formLayoutPage() {
    this.waitForNumberOfSeconds(2);
    await this.selectGroupMenuItem("forms");
    await this.formLayoutMenuItem.click();
    //await this.page.getByText("Form Layout").click();
    // await this.page.getByText("forms").click();
  }

  //GENERIC method to --> click on the item only when it's not already expanded...
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false") {
      await groupMenuItem.click();
    }
  }
}
