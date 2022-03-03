const { expect } = require("@jest/globals");
const { By } = require("selenium-webdriver");
const { until } = require("selenium-webdriver");
const { WebElement } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
const { Action } = require("selenium-webdriver/lib/input");
const {
  titleContains,
  elementIsVisible,
  elementTextIs,
} = require("selenium-webdriver/lib/until");
const {
  checkCurrentUrl,
  fillInputField,
  setMobileScreenSize,
  login,
  checkElementIsVisible,
  checkElementIsDisabled,
  checkElementState,
  checkElementVisibility,
  getElementText,
  waitForAndCheckElementText,
  checkFieldById,
  waitForAndClick,
  checkErrorLoginContainer,
  checkNeedHelpBtn,
  waitForAndClickText,
} = require("./utilities");

const loginUrl = "https://www.hudl.com/login";
const emailAddress = "orenbar34@gmail.com";
const password = "Orenbar1997";

// // sleep timer to see results
// await new Promise((r) => setTimeout(r, 6000));

describe("Test logging into Hudl", () => {
  // Set tests time to 30 seconds
  jest.setTimeout(300000);

  test("Successful login with correct credentials", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();
    await driver.get(loginUrl);

    // Log user in successfully
    await login(driver, emailAddress, password);
    // Check logging in was successful
    await checkCurrentUrl(driver, "https://www.hudl.com/home");

    // Close current window
    await driver.close();
  });

  test("Successful login with correct credentials, checking remember me ticked and unticked", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();

    await driver.get(loginUrl);
    await login(driver, emailAddress, password);

    await waitForAndClick(driver, "div.hui-globalusermenu");
    await waitForAndClickText(driver, "Log Out");
  });

  test.only("Login validation testing, testing error message & need help button (different scenarios)", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();

    // Login with blank email and password
    await driver.get(loginUrl);
    await login(driver, "", "");

    // Check Log In button is disabled after entering bad credentials
    await checkElementState(driver, "#logIn", "disabled");
    await checkErrorLoginContainer(driver);
    await checkNeedHelpBtn(driver);

    // Check user email input field is empty as email was not entered at beginning
    await checkFieldById(driver, "forgot-email", "");

    // Login with email and no password
    await waitForAndClickText(driver, "Back");
    await login(driver, emailAddress, "");

    // Check Log In button is disabled after entering bad credentials
    await checkElementState(driver, "#logIn", "disabled");
    await checkErrorLoginContainer(driver);
    await checkNeedHelpBtn(driver);
    // Check that email is pre written
    await checkFieldById(driver, "forgot-email", emailAddress);

    // Login with password and no email
    await driver.get(loginUrl);
    await login(driver, "", password);

    // Check Log In button is disabled after entering bad credentials
    await checkElementState(driver, "#logIn", "disabled");
    await checkErrorLoginContainer(driver);
    await checkNeedHelpBtn(driver);
    // Check that email is pre written
    await checkFieldById(driver, "forgot-email", "");

    await driver.close();
  });

  test("Test all buttons on login page to check they all work", async () => {
    // at end
    await waitForAndClick(driver, "div.back-to-hudl");
  });

  test("Successful login with correct credentials, then test logging out is successful", async () => {});

  // MOBILE TESTS

  test("Test logging into Hudl mobile device", async () => {
    // Open test in new window
    let driver = new webdriver.Builder().forBrowser("chrome").build();
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
