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

   also we can use route method to update the requests as well..
   we can tell playwright, okay this URL and hit the request but wait.
   hold on and update the query or path parm and then complete the requests
   method is : route.continue({url: 'updatd url})
   await page.route('url', route => {
   await route.continue({url: ''})
   })
   //check the documentation for playwright route method or even anything else
   they really have a strong documentation and application support.

9. In-tercepting browser requestS --> Getting backend response from UI click call
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
    Sharing whole state: check the auth.setup.ts file
    do the pw login using pw.goto('') then click on locators..
    then refer to a new file where we going to save our changes to:
    const authFile = '.auth/user.json' (make sure this file is added in gitignore as we don't want this to be commited to git)

    note: we need to be able to login before we hit the following line..
    now, save details to this file:
    await page.context().storageState({path:authFile})

now, update your playwright config file to: inside project section, create a new project
'setup'
[
name: 'setup',
testMatch: 'auth.setup.ts'
]
now other projects will be dependent on this project.. and also we can pass the
storage state to this project to
{
name: 'chromium',
use:{ ...devices['Desktop Chrome'], storageState: '.auth/user.json'},
dependency: ['setup']
}

Also, who'ever needed token, now they can use this file to get the token as well.
they need to import this file and start to read the file with Dot notation and get the details
as JSON is essentially Java Script (Object Notation)
so in the file which needs token:
import users from '.auth/user.json'
then
const token = users.origins[0].localStorgae.value ;
and used inhour scipts..

also to note that, in .auth/user.json file ->the unique thing is token
and rest all is static piece of code always, so what we can do is instead of
making a UI login everytime in 'setup project' , we can do is making an API request for the login
and collect the token.
then in the .auth/user..json file -> update the token with the new token and save the file
and now tell your code to use this file further.
//to do this
import fs from 'fs'
import user from '.auth/users.json'

//make api request to get the token
token = response.token;
//now update user.token
user.origins[0].localStrogae[0].value = token

//now write this to the file and save it
fs.writeFileSync(authFile,JSON.stringify(user))

Also since we have a token now and it's getting collected as a very first step
we can share this with other steps as well who needs this,
so above: from auth.setup.js -> once we have token with us and we have written it to a file
we will assign it to process.env variable
and all other tests who needs this, will call this ENV variable to take the data

process.env['ACCESS_TOKEN'] = token

how to use it:
in the other files , we can use it by calling process.env.ACCESS_TOKEN
or else 1 time setting would be:
in playwright config file in the GLOBAL 'use' block:
use: {
extraHTTPHeader: {
'Authorization': `Token ${process.env.ACCESS_TOKENg}`
}
}

<<<<<<---------------UI AUTOMATION-------------->>>>>>

11. UI Automation: Main thing is locator chaining stratergy and best practices for locator finding
    and also the 'waiting' mechanism and in-built locators which playwright provides with best practices

    Also important when selecting overlay contents::
    sometimes the things are present on the DOM just on the fly - they are called overlay containers
    Like: whe we select a box, it shows the list only then.
    Also when we try to get the element by right click OR any other way, it just doesn't work and immediately disappear.
    To Handle this: Go to webApp -> F12 -> go to JS console.
    then use the debugger after lets say 5 secs and it will freeze the wondow and then we can use the locator etc.
    setTimeout(function(){debugger},5000); //wait for 5 secs before starting a debugger in the UI

Also, in playwright, if the broswer is opened (after execution) and we go to some locator
(this is even after the execution is finished), and point to some locator in our script. It will highlight the same in the UI browser.
Same like if we do debbuger using page.pause(), then it will help us to select the elements..
also in trace viewr as well , very special and can be used for this

    we will keep updating this::
    best strategy is to create a re-usable locator for DOM parent block
    staring from there we can navigate down-words and then choose what we want
    The parent locator can be used when finding/searching for another locator..

    one example here: this is an E2E example from Nitro search component::

    const selectEntityDropDown = page.locator('.search-component-wrapper .v-field__field',
    {hasText:'Select an entity}
    );
    //in above locator strategy
    when the locator returns lets say 3 elements, and we want to further shorten this by using
    text strategy : we can use the above..
    //also it's similar to 'filter()', just difference is it's in-built with locator() itself

    const allEntities = page.locator('.v-list .v-list-item') //returns all elements in the list of dropdown
    await allEntities.filter({hasText: 'Service Delivery'}).click()
    sometimes , there could be multi elemtns matching the text then we can use the strict matching like below:
    await allEntities.filter({has: page.getByText('Service Delivery',{exact:true})}).click()

    locator chaining:
    await page.locator('.search-component-wrapper .v-field__field').filter({hasText: 'Enter the identifier'}).locator('input').fill('CID_CASES_17682198)

    getByRole::
    const searchButton  = page.getByRole('button', {name:'SEARCH'})
    //list from getByRole
    if list is part of <li> or <ui> html tags then use this
    page.getByRole('list',{name:''})

//look how we created the locators::
page.locator(nb-radio-group nb-radio) --> we didn't use .(DOT) since it is not the class
it's the tag itslef..
so we can use it this way as well.. just give the tag name and followed by child tag under it

index of the element (very unlikey to use)
page.locator('nb-card').nth(3).click()

//IMPORTANT to find the exact child element
filter() method is very useful AND as well--> also locator('locator', {text:'value'})
so, idea is we will find a parant panel and out of the returning elements, we will use
filter on them or locator (,{text: value}) to select the desired element..

page.locator('nb-card').filter({has: page.getByRole('radio',{name: 'Option1'})});

locator chaining another example::
//locator chaing example..
const form1 = page.locator("nb-card"); //re-useable variable of the type 'locator'
const radionOption1 = form1.filter({
has: page.getByRole("radio", { name: "Option1" }),
});
const radionOption2 = form1.filter({
has: page.getByRole("radio", { name: "Option2" }),
});

await radionOption1.click();
await radionOption2.isChecked();

    locator strategy using css ::
    follow the pkg used for : revisit ui tests

12. auto-waiting:

approach a - await radionOption1.waitFor({ state: "attached" }); //it will wait until default to 30 secs
approach b - await radionOption1.waitFor({ timeout: 15000 }); //wait until 15 secs for this element..
//also we can use page itself to wait for the element rather then element waiting
await page.waitForSelector('.bg-success');

TImeouts::
Global timeout -- total duration of the Test suite (let's say 4-4 hours max) -- default not configured
Test Timeout -- 30 sec default.. (it has 3 sub parts) (Have more priority compared to sub-timeouts like below)
(above are configured at global level in config file)

(below timeouts are declared within 'use' block) --> check the playwright.config file

- Action timeout - like click() etc (30 secs default)
- nsvigstion timeout - like page.goto("/") (no default)
- expect timeout - like expect() (default is 5 secs)

so if action timeout is set to 30 and test timeout is set to 40. then action command will follow
action timeout only which is 30 secs, as test timeout defines the max time is allowed for
a specific timeout..
but if action timeout is 50 secs and test timeout is default to 30 then action timeout will wait till 30 secs only as it is the sub-set of test timeout so it has to be within this limit

also another interesting fact: we can always override the action timeouts within the method as well
and that will take the precedence compared to config file...
await page.locator('').click({timeout: 50000}) //--> look here we aresaying here wait until 50 secs for this click event

test.slow() --> we can define this in any test and it will wait default/defined in config file X 3 times.. used when a test is slow

also we can define a test to be slow at a test level from something like:
testInfo param from the test() method, then testInfo.setTimeout()..
see the ui-revisit file.. testInfo.setTimeout(testInfo.timeout + 2000);

expect can also be increased in the config file.. in the global section
check the pw config file..

13: UI components -
to fill in the UI using fill() method
but simulate keyboard typing using:
locator('').pressSequentially('xyz..')
to give delay between typing::
locator('').pressSequentially('xyz..', {delay: 500}) //half a sec delay

//to get the input value we typed..
const inputVal = locator('').inputValue();

//IMPORTANT--->
all of these locator methods like .check() (to check radio checkbox) or click() etc
these method doesn't work if the class is marked as visiblity:hidden
so in order to deal with such use case, pw came with ::
check({force:true})
//forcefully doing something even if UI doesn't allow us that
isChecked() will return the status...

checkboxes-->
check() -> check the status of the checkbox, if it's not checked it will simply checked it
this is better than smiply clicking the element and making it check and un-check..

uncheck().. opposite of check()

also by default, try to use 'getByRole('checkbox',{name:''})

//checking all checkboxes.. look at the file for details (spec file ui-revist)
await allBoxes.all();
where allBoxes --> it's a locator
to convert it to a array of locators , we need to use all method on it ..
note: everything will be wrapped up in await block since .all() method returns a promise..

IMPORTANT
for(const box of await allBoxes.all()){
//box.METHOD do soemthing..
await box.check(force:true)
}

Mpw methods..
we can call a method either OR way like below::
page.locator('item').click() --> Approach A
page.click('item') --> Approach B

both are correct, look at the method signatures to undertand more of it..

hover() ->
await page.locator("main-menu").hover();
await page.locator(".sub-menu").waitFor({ state: "visible", timeout: 10000 });
await page.locator('.sub-menu').click();

chianing::
//we can also chained all this expressions like below as this returns promise<>
await page
.locator("menu")
.hover()
.then(() => page.locator("sub-menu").hover())
.then(() => page.locator("sub-menu").click);

we can also do mouse simulation..
using:
page.mouse.move(menu.x + menu.width/2, menu.y + menu.height/2)
page.mouse.move(sub-menu.x + sub-menu.width/2 , sub-menu.y + sub-menu.height/2)
page.mosue.click(sub-menuItem.x + sub-menuItem.wid)
