import { assert } from "console";
import testdata from "../../test-data/tags.json" assert { type: "json" }; //older node versions

//import testdata from "../../test-data/tags.json" with { type: "json" }; //best used with latest node versions

console.log("test data is: " + testdata.tags);
