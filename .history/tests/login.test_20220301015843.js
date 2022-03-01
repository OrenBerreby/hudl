const webdriver = require("selenium-webdriver");

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
    // SELECTORS
    await driver
      .findElement(webdriver.By.id("email"))
      .sendKeys("orenbar34@gmail.com");

    // await emailInput.sendKeys("orenbar34@gmail.com");
  });
  test("Test2", async () => {});
  test("Test3", async () => {});
  test("Test4", async () => {});
  test("Test5", async () => {});
  test("Test6", async () => {});
  test("Test7", async () => {});
});
