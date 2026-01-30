This file just explain some concepts again..
as part of revising the concepts, have created this file..

1. 'testInfo' param in playwright test() method.. it is used with ({page},testInfo)..
   if we use testInfo. it will show all methods avaibale, basically , it comaints info
   about the tes and it's VERY VERY USEFUL , let's say for a certain project (dev ENV), we have
   to do additional steps in our scripts , so we can do if (testInfo.project === 'dev'){..//do work}
   also lets say if we want to clear or delelte something before running tests again using 'retry'
   if(testInfo.retry == true){//.. clear logic here} //this will just run if the tests are getting retried..

2. Project Setup and TearDown --> dependency between projects..
   let's say before running a prject named 'regression', we can add a dependency that it should
   project 'authsetup' before running anything.. and simialr way a treadown blck can also be added
   which will be responsible for teardown once all tests completed. this way we can make a chain of projects. example project block::
   {
   name: "articleSetup",
   testMatch: "newArticle.setup.js",
   dependencies: ["setup"],
   },

3. Global setup and teadDown --> similar to above but it will be done outside of 'project' block
   add in the 'use' block..
   globalSetup: require.resolve('./global-setup.ts') //path of file here
   globalTearDown: require.resolve('./global-teardown.ts')

4. Test tags:: in a test() method, we can add a tag alonwith description..
   test('get artivle test @smoke)
   to run them: npm playwright run test command but add --grep @smoke in the end (for linux and mac)
   to run multi : --grep '@smokeAPI|@smokeUI' --> it will run with OR condition

5. ENV variables..
   env variables can be handled by multiple ways in JS/TS with playwright..
   URL: don't hard code the base URL. provide it in playwright config.ts and update 'use' block
   with baseURL: '', and in your tests we jsut do: page.goto('/')...
   How to change this URL for different ENVs.. (how do we handle that bit): Different for dev, Different for ST etc::
   Goto : Projects : create a 'use' block for that project and create a baseURL: '' there.
   To make more ENV variables in 'config' file and in order to make them available in other test spec files.. we need to create 'TestOptions.ts' and need to declare and assig the variable there
   (check the test-options.ts file)..
   once we have a ENV variable defined there, this can be imported to 'playwright.config.ts' file
   and defineCOnfig has to use it : defineConfig<TestOptions>({})
   now this new variable, is aviable and can used within 'global' or 'project level' 'use' block..
   note: before using it: we need to import the {test } from 'test-options' andnot from 'playwrightTests'... after that ew can use this newly created ENV var inside our scripts directly
   test('', async ({page, new_var}))
   Another way is ofcourse 'process ENV variable' -> this is best approach in many cases..
   Also another way is using plain JS/TS ternary operator::
   in baseURL : value in global use block, use ternary operator and based on the condition supplied use it.

6. NOte about fixtures: if some of fixtures are not meant to be used inside the 'test' method but
   they do something in advance for us, and easy our work.
   to use them we still need to call them inside our test('',async({page, formLayoutPage}))  
   but hey why would be even need that if we don't need it. so this is so that code related to that fixture will trigger.. There is another way, we can ask fixture to auto-trigger as soon as test() is called from this file.. for that we need to bind our fixture in an array and second arg is {auto: true}
   can also create dependency between 2 fixtures..by adding the another fixture withinthe params
   also whatever we use after 'use' block of fixture. will be run after the test is finished.

7. mocking API request:::
   main point id add the endpoints before 'pw' actually lands on the page.
   also in order to have this working, make sure we add ecpected condition
   or given enugh wait using await page.timeout(xx)
   //route is the main method to intercept the requests..
   //also fetch --> will ask the api to go ahead and complete the request
   //also fulfill --> this will ask them to fulfil or update the response now
   //with the updated response etc..

   await page.route('\*/\*\*/api/tags', async route => {
   //now the main part --> it will complete the request but with our dummy response..
   await route.fulfill({
   body: JSON.stringify(tags)
   })
   })
   tags are the updated tags provied by us in seperate file.
   in-order to call/import the seperate file:
   import tags (can be any name) from '../tes-data/tags.json'

   also// if we want to update lets say only the first entry of the response
   and wanted to keep the rest as it is:

   await page.route('_/\*\*/api/articles_',async route => {
   const response = await route.fetch();
   const responseBody = await response.json();
   //update the irst article..
   responseBody.articles[0].title = 'this is test tile'
   responseBody.articles[0].description = 'this is general discription'

   .//now see we don't have to save back to responseBody.. it's already saved

   await route.fulfil({
   body: JSON.stringify(responseBody)
   })
   })

8. API request : fixture for that: request
   //post req
   const response = await request.post('/api/users/login',{

   data: {
   //this is request payload
   }

   });

   const resBody = await response.json();
   const token = resBody.user.token;

   //create article post call
   //pass the token in header..

   await request.post('end point URL', {
   data: {
   //payload here
   },
   headers: {
   Authorization: 'Token ' + token;
   }
   })

9. In tercepting browser requestS --> Getting backend response from UI click call
   AFter the UI button is clicked, it sends a request to backend..
   we will wait until the request is completed and store the response in a variable
   now we use that to get the response
   METHOD:: after clicking the page it triggers the backend call and we will wait for the
   response of that call
   const res = await page.waitForResponse('URL')
   const resJSON = await res.json();
   const slugId = resJSON.article.slug;
   //now we have slug ID , we can form the URL and make a next request..

10. sharing API token to all scripts.. all approaches to the best -->
    there are multiple ways:
    first one is setting up the token directly to JS windows..
    let's take the token from the login api call -->
    now, add a function/script directly to the JS using playwright method :
    await page.addInitScript( value => {
    //add a key value pair.. we can check this from our local storage setting -> network req -> Application --> storage -> local storage --> endpoint
    window.localStorage.setItem('token',value)
    }, token); //this token is assigned to 'value' ...
