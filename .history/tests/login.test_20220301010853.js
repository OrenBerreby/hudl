import webdriver from "selenium-webdriver";
webdriver = require("node-html-webdriver");

import script from "jest";

// Go to Hudl login page at beginning of each test
beforeAll(async () => {
  await driver.navigate().to("https://www.hudl.com/login");
});

// Close chrome after each test is run
afterAll(async () => {
  await driver.quit();
});

describe("Test logging into Hudl", () => {
  let driver;

  driver = new webdriver().build();

  test("Test1", async () => {});
  test("Test2", async () => {});
  test("Test3", async () => {});
  test("Test4", async () => {});
  test("Test5", async () => {});
  test("Test6", async () => {});
  test("Test7", async () => {});
});
