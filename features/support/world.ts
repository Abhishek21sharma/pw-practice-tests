import { IWorldOptions, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

// Tell Cucumber to use our custom class for 'this'
//setWorldConstructor(CustomWorld);
