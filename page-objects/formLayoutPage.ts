import { Page } from "@playwright/test";
export class FormLayoutsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * This method is to submit 
   * @param email
   * @param password 
   * @param optionText
   */
  async submitUsingTheGridFormWihCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "USing the Grid",
    });

    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });

    await usingTheGridForm.getByRole("button").click();
  }
}
