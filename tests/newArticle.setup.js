import { test as setup, expect } from "@playwright/test";

setup("create a new article", async ({ request }) => {
  //let's create article here..

  const articleRes = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "Likes test article",
          description: "test article using post api call",
          body: "Test -api test - test article",
          tagList: ["test"],
        },
      },
      headers: { Authorization: "Token " + token },
    }
  );

  expect(articleRes.status()).toEqual(201);

  const response = await articleRes.json();
  const slugId = response.article.slug;
  process.env["SLUG_ID"] = slugId;
});
