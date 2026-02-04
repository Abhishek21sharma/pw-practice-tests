import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";
import dotenv from "dotenv";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 *
 *
 *
 */

import { fileURLToPath } from "url"; //newly added from gemini

// 1. Manually define __dirname
const __filename = fileURLToPath(import.meta.url); //newly added from gemini
const __dirname = path.dirname(__filename); ////newly added from gemini
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 *
 */

//AS updated this with TestOptions..
export default defineConfig<TestOptions>({
  //AS --- timeouts at test level can be set up here.. by default it;s 30 secs
  //timeout: 10000,

  // AS -- also we can add following object which will manage expect timeout to
  //some other value compared to 5..
  // expect: {
  //   timeout:7000
  // },

  //AS ---defining other timeouts.. we can make use of 'use' block.. pls see below
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //can also defined custome browser (As default one::)
    //browserName: "chromium",
    //AS -- use block to configure action level timeoutss liek this::
    //actionTimeout: 10000, --> for action commands like click() , fill()
    //navigationTimeout: 10000, --> like page.goto('/')
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    //baseURL: "http://localhost:4200/",
    //AS: we can also manage baseURL without using the projects.. using the js way:
    //look how we are adding more conditions to this ternary operator..
    //this is ternary operator.. BASICALLY CHAINING OF TERNARY OPERATOR
    baseURL:
      // condition1 ? do this if true : (else do this now this is
      // also another condition
      // ? : do this if true and also last default block :)
      process.env.DEV === "1"
        ? "http://localhost:4200/"
        : process.env.ST === "1" //AS this is for DEV URL
          ? "http://localhost:3000/" // AS -- this is for ST ENV
          : "http://localhost:4200/", //AS -- the default URL

    globalsQaURL: "https://www.facebook.com/", //<-- look at the test-options.ts file, how we declared this variable there..
    //look at the sameple.spec.js file --> how we used the URL OR we can say this variable there...

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-first-failure",

    headless: false,

    //AS - to use the ENV variable
    //now we can remove the header from our code.. and it will be passed at run time to all
    //payloads, this will be passed automatically at run time..
    extraHTTPHeaders: {
      Authorization: `Token ${process.env.ACCESS_TOKEN}`,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    //ENV specific configurations..
    //let's create project for 'dev','st','pre-prod' configs etc, so we can run with different ENVs..
    {
      name: "dev",
      //in js syntax.. an array can also be declared as ...array_name.. we will use the same approch below:
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4200/" },
    },

    {
      name: "SIT",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4200/" },
    },

    //to handle setup() method
    {
      name: "setup",
      testMatch: "auth.setup.js", //so this project will be responsible to run only auth.setup.js file..
    },

    //AS
    //storage state handled here...

    {
      name: "chromium",
      //AS - storageState is handled here.. give the path here..
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      //AS -- this will start the project = setup as before running this..
      dependencies: ["setup"],
    },

    {
      name: "articleSetup",
      testMatch: "newArticle.setup.js",
      dependencies: ["setup"],
    },

    {
      name: "likeCounter",
      testMatch: "likeCounter.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
        //default URL for this project.. baseURL: "",
      },
      //AS -- this will start the project = setup as before running this..
      dependencies: ["articleSetup"],
    },

    {
      name: "firefox",
      //browser name can be given like this::
      use: {
        browserName: "firefox",
      },
      // use: { ...devices["Desktop Firefox"] },
    },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
