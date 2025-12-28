import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  //defining all locators here
  readonly formLayoutMenuItem: Locator;
  readonly datePickerMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly toastMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formLayoutMenuItem = page.getByText("Form Layout");
    this.datePickerMenuItem = page.getByText("Datepicker");
    this.smartTableMenuItem = page.getByText("Smart Table");
    this.toastMenuItem = page.getByText("Toastr");
    this.tooltipMenuItem = page.getByText("Tooltip");
  }

  async formLayoutPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutMenuItem.click();
  }

  async datepickerPage() {
    //after refining this metho
    //...
    //...

    //await this.page.getByText("Forms").click();
    await this.selectGroupMenuItem("Forms");
    //await this.page.getByText("Datepicker").click();
    await this.datePickerMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.smartTableMenuItem.click();
  }

  async toasterPage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.toastMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }

  private async selectGroupMenuItem(groupMenuTitle: string) {
    //check if the 'Forms' is already expanded or not
    //click on it
    //get the attributr
    //read the value
    //check value , true or not

    const groupMenuItem: Locator = this.page.getByTitle(groupMenuTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded"); //for locators, it's optional
    //to use 'type' here..

    if (expandedState == "false") {
      await groupMenuItem.click();
    }
  }
}
