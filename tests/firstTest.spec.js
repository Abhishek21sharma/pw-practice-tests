import { test } from "@playwright/test";

test("First Test Case", ({ page }) => {
  page.goto(" ");
});

//to group few tests as part of 1 suite.. we can use test.describe()
//and inside the describe we can use independent tests

//now each of the suite can have different context.. fixture

test.describe("test suite 1", () => {
  test("test case 1", () => {});
  test("test case 2", () => {});
  test("test case 3", () => {});
  test("test case 4", () => {});
});

test.describe("test suite 2", () => {
  test("test case 1", () => {});
  test("test case 2", () => {});
  test("test case 3", () => {});
  test("test case 4", () => {});
});
