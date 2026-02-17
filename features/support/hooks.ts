import { AfterStep, Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
  }
  if (result.status.match("FAILED")) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage(); //this used, so it's a world constructor

    await this.page.screenshot({ path: "" });
  }
});
