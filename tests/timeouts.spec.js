import { test, expect } from "@playwright/test";

test("timeouts...", async ({ page }) => {
  //layer approch.. test timeout high pref.. then action timeout.. then navigation timeout.. then expect timeout
  //test timeout.. default to 30000 ms = 30 secs.. we can update it in 'config.js
  //by adding a another variable timeout:xxxx value

  //action timeout.. default to timeout.. eg: click(), fill(), textContent()... (it will b)
  //navigation timeout.. default no timeout.. eg: page.goto()..
  //expect timeout.. default to 5000 ms (5 secs)

  await page.goto("http://uitestingplayground.com/ajax");

  //also pls see config.js file..
  //all timeouts can be setup in config.js.. and also in the 'use' block of config.js

  //other than this.. we can specify timeout within the method itself.. something like below:
  const successButton = page.locator(".bg-sucess");
  await successButton.click({ timeout: 18000 }); // assuming click event take place 15 secs so giving it 3 more secs
  //above method level timeouts take more preference compared to global timeouts

  //also on top of this, if we know some 'test' will be slow to run in general and may need more
  //time to complete execution
  //there is a 'test' level timeouts can be defined and it will be 3 times more wait compared to general timeout

  test.slow(); //this will wait 3X time before failing the tests
});
