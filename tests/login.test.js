const { expect } = require("@jest/globals");
const { By } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const { waitForServer } = require("selenium-webdriver/http/util");
const by = require("selenium-webdriver/lib/by");
const { getEffectiveConstraintOfTypeParameter } = require("typescript");
const { fillInput } = require("./utils");

describe("Test logging into Hudl", () => {
  // Set tests time to 30 seconds
  jest.setTimeout(300000);
  const driver = new webdriver.Builder().forBrowser("chrome").build();

  // Go to Hudl login page at beginning of each test
  beforeAll(async () => {
    await driver.get("https://www.hudl.com/login");
  });
  test("Test1", async () => {
    // // Sleep timer
    // await new Promise((r) => setTimeout(r, 3000));

    // Add a wait for element in order to check that the page has correctly

    // Enter email address
    await driver.findElement(By.id("email")).sendKeys("orenbar34@gmail.com");

    // Check input field was correctly filled
    let emailInput = await driver
      .findElement(webdriver.By.id("email"))
      .getAttribute("value");
    expect(emailInput).toEqual("orenbar34@gmail.com");

    console.log(emailInput);

    // Click the login button
    await driver.findElement(By.id("logIn")).sendKeys(webdriver.Key.RETURN);

    // sleep timer to see results
    await new Promise((r) => setTimeout(r, 6000));

    driver.close;
    await driver.quit();
  });
  // test("Test2", async () => {});
  // test("Test3", async () => {});
  // test("Test4", async () => {});
  // test("Test5", async () => {});
  // test("Test6", async () => {});
  // test("Test7", async () => {});

  // // Close chrome after each test is run
  // afterAll(async () => {
  //   await driver.quit();
  // });
});
