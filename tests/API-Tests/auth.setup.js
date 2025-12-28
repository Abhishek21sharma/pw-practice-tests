import { test as setup } from "@playwright/test";

//import the file (with any name) we want to update in API step.
import user from "../../.auth/user.json";
//js file reader/writter lib
import fs from "fs";

//note on above.. we can rename the custom 'test' as anyname we want to call it in our file..
//now instead of saying.. test(..) .. we can say as setup()..
//(Also we need to update playwright config.js in order to handle ehis setup emthod as well..)
//check the projects in playwright.config.json file...

//this is the path of where we want to save the authenticated state..
const authFile = ".auth/user.json"; //name of the file can be anything
//see in the last of file on why we need to create this..

setup("authentication", async ({ page }) => {
  //now write the sign in code here..
  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Sign in").click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("Abhi21sharma@test.com");
  await page.getByRole("textbox", { name: "Password" }).fill("abhi@test");
  await page.getByRole("button").click();

  //add a precaution , wait to make sure the appliaction state is fully achieved..
  await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");

  //save the state.. by this..
  await page.context().storageState({ path: authFile });
});

//ok what's next.. now we need to create a file, where we save the authenticate state to..
//store that file to .auth folder because that will not be pushed to git

setup(
  "authentication with API and updating token ",
  async ({ page, request }) => {
    //now since authenticator mechanism just have, token as key element
    //we don't want to lofin even once with UI..
    //let's just use API call and then collect token
    //and update our '.auth/user.json' file

    const response = await request.post(
      "https://conduit-api.bondaracademy.com/api/users/login",
      {
        data: {
          user: { email: "Abhi21sharma@test.com", password: "abhi@test" },
        },
      }
    );

    const resBody = await response.json();
    const token = await resBody.user.token;

    //now store the '.auth/user.json' file with above token

    //.. only access token is updated... and rest all is same..
    user.origins[0].localStorage[0].value = token;

    //now write/save the file..
    fs.writeFileSync(authFile, JSON.stringify(user));

    //storing token to env variable.. also best practice is to use all upper case to store in process env
    process.env["ACCESS_TOKEN"] = token;
    //now, let use this in congif file.
  }
);
