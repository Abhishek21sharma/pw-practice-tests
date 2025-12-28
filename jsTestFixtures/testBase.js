//const base = require("@playwright/test");

//fixture is a key to setup the project
//it will work as pre-req before we kick start the test..
//here we will try to load data to point to the test-data before running the test

// exports.customtest = base.test.extend({
//   //all customized properties will come here..
//   testDataForOrder: {
//     userName: "name1",
//     password: "pwd124",
//   },
// });

//now in all classes where we imprt test from playwright
//insteadof importingfrom there, we can import test from this file.

//const {customtest} from ('./jsTestFixtures/testBase')

//now use this 'test' to write your tests
//also after the page fixture, we can pass our own custom fixture.. {page,testDataForOrder}
