import { test } from "@playwright/test";

test("Like counter increase test", async ({ page }) => {
  //..
  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Global Feed").click();
  const firstLikeButton = page
    .locator("app-article-preview")
    .first()
    .locator("button");
  await firstLikeButton.click();
});

//now create a pre-condition, we want to create a helper which will create an article for us before
//we start above tests
//idea is there is a fresh test in the begining where firstLikeButton = 0
//then w erun our tests which will like the counter and increase the count to 1
//then we delete the articular

//as e know there are different appoaches to do so:
//1. beforeeach()
//2. fixture
//3. project setup and team down approach
