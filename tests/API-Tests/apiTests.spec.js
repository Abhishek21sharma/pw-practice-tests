//URL to use
//https://conduit.bondaracademy.com/
//Abhi21sharma/Abhi21sharma@test.com/abhi@test

//https://conduit-api.bondaracademy.com/

import { test, expect, request } from "@playwright/test";
//can give it any name .. as we imported the file.. file is not a named export, so we can assign it as any name
import t from "../../test-data/tags.json";
import { json } from "stream/consumers";

// test.beforeEach(async ({ page }) => {
//   //page.on("request", (req) => console.log("REQ: " + req.url()));
//   //the moking code has to be called 1st before launching the website..
//   //otherwise the code wont work..

//   //so page.goto() .. will come after mocking req completes. as page.goto() only invokes the URL
//   //mocking a custom response from API.. (getting a custom response from the server)
//   //before making a mock .. it has to be declared before making API request..
//   //give the URL which we want to be mocked
//   //second argument is codac function (arrow function)..which have the logic as defined below
//   //here async route.. route is a variable and can be anything..
//   await page.route(
//     //https://conduit-api.bondaracademy.com/api/tags
//     "*/**/api/tags",
//     async (route) => {
//       //tag is the custom tag we see in the UI , right side..
//       //we want to update them with our own tags as designed below
//       //no need to use the following variable as we're getting the
//       //new tags directly frrom the test data file now
//       const newTags = {
//         tags: ["automation", "playwright"],
//       };
//       //now we want to fulfill the routing of above URL
//       //with the response body as defined below
//       //   await route.fulfill({
//       //     contentType: "application/json",
//       //     body: JSON.stringify(newTags),
//       //   });

//       await route.fulfill({
//         contentType: "application/json",
//         body: JSON.stringify(t),
//       });
//     }
//   );

//   await page.route("*/**/api/articles*", async (route) => {
//     const response = await route.fetch();
//     const responseBody = await response.json();
//     //now update the objects to your wish

//     responseBody.articles[0].title = "This is a test title";
//     responseBody.articles[0].description = "This is a description";

//     await route.fulfill({
//       contentType: "application/json",
//       body: JSON.stringify(responseBody),
//     });
//   });

//   //await page.goto("https://conduit.bondaracademy.com/");
//   await page.goto("https://conduit.bondaracademy.com");
// });

test("checking status", async ({ page }) => {
  //sometime the code runs so fast the it doesn't get a chance to update the tags.. as the request is slow
  await page.waitForSelector("automation");
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
});

test("Mocking API", async ({ page }) => {
  // 3. FORCE the browser to wait for your mock
  // This tells Playwright: "Don't close until you see the word 'automation' in the sidebar"
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "This is a test title"
  );
  await expect(page.locator(".sidebar")).toContainText("automation");
  await expect(page.locator(".sidebar")).toContainText("playwright");
});

test("Mocking API response", async ({ page }) => {
  //this is to be mock the response..
  //we deal with article API in this case
  //https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0
  // as before route.. we will make it more generic by adding * instead of hard coding it
  //  */**/api/articles*
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "This is a test title"
  );
});

//request is also a fixture..
test("post api call  & validations", async ({ page, request }) => {
  //making a login call..
  //fetch token..
  //feed in the header of another call..
  //make api call to create a article..
  //finally check the 'delete' artivle test..
  //there is another fixture to make post request etc in playwright

  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: { email: "Abhi21sharma@test.com", password: "abhi@test" },
      },
    }
  );

  const resBody = await response.json();
  //console.log("response is::: " + resBody);
  // console.log("Response body is:\n" + JSON.stringify(resBody, null, 2));

  const token = await resBody.user.token;

  //now make a second API call to create a article.. with headers in it

  const articleRes = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "Test -api test",
          description: "test article using post api call",
          body: "Test -api test - test article",
          tagList: ["test"],
        },
      },
      headers: { Authorization: "Token " + token },
    }
  );

  expect(articleRes.status()).toEqual(201);
  //noe article is created and published..
  //now just go and delete the article to actually 'test the delete article test case'..

  //nav to global feed.. click on the article and click on delete button.. and expect that it is deleted

  await page.goto("https://conduit.bondaracademy.com/");
  //need to do login as well first...
  await page.getByText("Global Feed").click();
  await page.getByText("Test -api test").click();
  await page.getByRole("button", { name: "Delete Article" }).first().click();
  await page.getByText("Global Feed").click();
  //look carefully how we adding 'not' condition here
  await expect(page.locator("app-article-list h1").first()).not.toContainText(
    "Test -api test"
  );
});

test("intercepting API response..", async ({ page }) => {
  //we can perform the UI action
  //the UI action will make API call and based on the result it will do next steps for example yea
  // so in this use case.

  //we're doing some UI clicks to publish articles (remember this is from UI and not through API)

  //after doing all this, we know that it will make call to the API and at that step we will get the response of it
  await page.locator("new article").click();
  await page
    .getByRole("textbox", { name: "Article Tile" })
    .fill("playwright test");
  await page
    .getByRole("textbox", { name: "What's this article is about?" })
    .fill("About the Playwright");
  await page.getByRole("button", { name: "Publish article" }).click();

  //now we are expecting to hit the following URL and this will return the result..
  const articleResponse = await page.waitForResponse("https://api.../articles");

  const articleID = await articleResponse.json().article.slug;

  //now we will pass this articleID (slug) to Delete API request.. as in the UI..
});

//sharing authentication state..
//lets say we need to do login and want each test to use the same session login to do the work
//this can be done as well uinsg the following way..
//we will create another folder and manage the code there..
//.auth folder created and also added in .gitignore..
