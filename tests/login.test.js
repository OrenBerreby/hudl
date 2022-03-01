const { expect } = require("@jest/globals");
const webdriver = require("selenium-webdriver");
const { fillInput } = require("./utils");

const driver = new webdriver.Builder().forBrowser("chrome").build();

// Go to Hudl login page at beginning of each test
beforeAll(async () => {
  await driver.get("https://www.hudl.com/login");
});

// Close chrome after each test is run
afterAll(async () => {
  await driver.quit();
});

describe("Test logging into Hudl", () => {
  test("Test1", async () => {
    // await getElement("email").sendKeys("orenbar34@gmail.com");

    // Add a wait for element in order to check that the page has correctly loaded

    await driver
      .findElement(webdriver.By.id("email"))
      .sendKeys("orenbar34@gmail.com");

    let emailInput = await driver
      .findElement(webdriver.By.id("email"))
      .getAttribute("value");

    expect(emailInput).toEqual("orenbar34@gmail.com");

    console.log(emailInput);

    await fillInput("o@b.com", "email");

    console.log("function works");
  });
  test("Test2", async () => {});
  test("Test3", async () => {});
  test("Test4", async () => {});
  test("Test5", async () => {});
  test("Test6", async () => {});
  test("Test7", async () => {});
});
