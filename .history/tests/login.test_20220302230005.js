const { expect } = require("@jest/globals");
const { By } = require("selenium-webdriver");
const { until } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
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

  test("Successful login with correct credentials, checking remember me ticked and unticked", async () => {});

  test.only("Login validation testing, testing error message & need help button (different scenarios)", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();
    await driver.get(loginUrl);

    // Login with blank email and password
    await login(driver, "", "");

    // // Check Log In button is disabled after entering bad credentials
    await checkElementState(driver, "#logIn", "disabled");

    // Check error container was triggered
    await checkElementVisibility(
      driver,
      "div.login-error.fade-in-expand",
      "visible"
    );
    await checkElementVisibility(
      driver,
      "div.login-error.fade-in-expand a",
      "visible"
    );
    await waitForAndCheckElementText(
      driver,
      "div.login-error.fade-in-expand p",
      "We didn't recognize that email and/or password. Need help?"
    );

    console.log("b");

    // await new Promise((r) => setTimeout(r, 2000));

    // Check need help button
    await waitForAndClick(driver, "div.login-error.fade-in-expand a");
    await checkElementVisibility(driver, "#forgot-email", "visible");
    // Check user email input field is empty as email was not entered at beginning
    await checkFieldById(driver, "forgot-email", "");

    console.log("c");

    // console.log(errorMsg);
    // Check need help button

    // // Login with email and no password
    // await login(driver, emailAddress, " ");

    // // Login with password and no email
    // await login(driver, " ", password);

    // await new Promise((r) => setTimeout(r, 6000));

    await driver.close();
  });

  test("Test all buttons on login page to check they all work", async () => {});

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
