import { Page, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutPage: FormLayoutsPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutPage = new FormLayoutsPage(this.page);
  }

  ///create a method which will return the instances of them

  navigatoTo() {
    return this.navigationPage;
  }

  onFormLayoutPage() {
    return this.formLayoutPage;
  }
}
