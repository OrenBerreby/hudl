const { expect } = require("@jest/globals");
const { By } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const { titleContains } = require("selenium-webdriver/lib/until");
const {
  checkCurrentUrl,
  fillInputField,
  setMobileScreenSize,
  login,
} = require("./utilities");

// Hudl URL used to login
const loginUrl = "https://www.hudl.com/login";
const loggedInUrl = "https://www.hudl.com/home";

const emailAddress = "orenbar34@gmail.com";
const password = "Orenbar1997";

// // sleep timer to see results
// await new Promise((r) => setTimeout(r, 6000));

// Setup driver
let driver = new webdriver.Builder().forBrowser("chrome").build();

describe("Test logging into Hudl", () => {
  // Set tests time to 30 seconds
  jest.setTimeout(300000);

  test("Successful login with correct credentials", async () => {
    await driver.get(loginUrl);

    // Log user in successfully
    await login(driver, emailAddress, password);
    // Check logging in was successful
    await checkCurrentUrl(driver, "https://www.hudl.com/home");

    // Close current window
    await driver.close();
  });
  test("Test logging into Hudl mobile device", async () => {
    // Open test in new window
    // driver = new webdriver.Builder().forBrowser("chrome").build();
    await driver.switchTo().newWindow("window");
    await driver.get(loginUrl);
    await setMobileScreenSize(driver);

    // Log user in successfully
    await login(driver, emailAddress, password);
    // Check logging in was successful
    await checkCurrentUrl(driver, "https://www.hudl.com/home");

    await new Promise((r) => setTimeout(r, 6000));

    await driver.close();
  });
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
