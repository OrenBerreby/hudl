const { expect } = require("@jest/globals");
const { By } = require("selenium-webdriver");
const { until } = require("selenium-webdriver");
const { WebElement } = require("selenium-webdriver");
const { Key } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
const { checkedLocator } = require("selenium-webdriver/lib/by");
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
  waitForElementAndClick,
  checkErrorLoginContainer,
  checkNeedHelpBtn,
  waitForAndClickText,
  logout,
  loginBadCredentialsValidation,
} = require("./utilities");

const loginUrl = "https://www.hudl.com/login";
const emailAddress = "orenbar34@gmail.com";
const password = "Orenbar1997";

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

  test.only("Successful login with correct credentials, then test logging out is successful", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();
    // Login successfully then logout
    await driver.get(loginUrl);
    await waitForElementAndClick(driver, ".form__label--custom");
    await login(driver, emailAddress, password);
    await logout(driver);

    // Check log in button appears to make sure we are logged out
    await checkElementVisibility(driver, "[data-qa-id=login]", "visible");

    await driver.close();
  });

  test("Login validation testing, testing error message & need help button (different scenarios)", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();

    // Login with blank email and password
    await driver.get(loginUrl);
    await login(driver, "", "");
    await loginBadCredentialsValidation(driver);
    // Check user email input field is empty as email was not entered at beginning
    await checkFieldById(driver, "forgot-email", "");

    // Login with email and no password
    await driver.get(loginUrl);
    await login(driver, emailAddress, "");
    await loginBadCredentialsValidation(driver);
    // Check that email is pre written
    await checkFieldById(driver, "forgot-email", emailAddress);

    // Login with valid email and invalid password
    await driver.get(loginUrl);
    await login(driver, emailAddress, "badPassword");
    await loginBadCredentialsValidation(driver);
    // Check that email is pre written
    await checkFieldById(driver, "forgot-email", emailAddress);

    // Login with password and no email
    await driver.get(loginUrl);
    await login(driver, "", password);
    await loginBadCredentialsValidation(driver);
    // Check that email is pre written
    await checkFieldById(driver, "forgot-email", "");

    await driver.close();
  });

  test("Test all buttons on login page to check they all work", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();

    // Check need help works
    await driver.get(loginUrl);
    await waitForElementAndClick(driver, "#forgot-password-link");
    await checkElementVisibility(driver, "#resetBtn", "visible");
    await driver.get(loginUrl);

    // Check remember me is visible
    await checkElementVisibility(driver, ".form__label--custom", "visible");

    // Check log in with organization button is visible
    await checkElementVisibility(driver, "#logInWithOrganization", "visible");

    // Check sign up is visible
    await checkElementVisibility(driver, ".sign-up-trial a", "visible");

    // Click arrow to go back to home page logged out
    await waitForElementAndClick(driver, ".back-to-hudl");

    await driver.close();
  });

  // ALERT: Remember me seems to remember me regardless of whether it is ticked or unticked
  test.skip("Successful login with correct credentials, checking remember me ticked remembers email address post logout and unticked does not.", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();

    // Login with remember me ticked
    await driver.get(loginUrl);
    await waitForElementAndClick(driver, ".form__label--custom");
    await login(driver, emailAddress, password);
    await logout(driver);

    // Click login to get back to the login screen
    await waitForElementAndClick(driver, "[data-qa-id=login]");

    // Check email address was remembered
    await checkFieldById(driver, "email", emailAddress);

    // Login with remember me unticked
    await driver.get(loginUrl);
    await driver.findElement(By.id("email")).clear();
    await login(driver, emailAddress, password);
    await logout(driver);

    // Click login to get back to the login screen
    await waitForElementAndClick(driver, "[data-qa-id=login]");

    // Check email address was not remembered
    await checkFieldById(driver, "email", "");

    await driver.close();
  });

  // MOBILE TESTS

  test("Test logging into Hudl mobile device", async () => {
    // Open test in new window
    let driver = new webdriver.Builder().forBrowser("chrome").build();
    await setMobileScreenSize(driver);
    await driver.get(loginUrl);

    // Log user in successfully
    await login(driver, emailAddress, password);
    // Check logging in was successful
    await checkCurrentUrl(driver, "https://www.hudl.com/home");

    await driver.close();
  });

  test("Successful login with correct credentials, then test logging out is successful on mobile", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();
    // Login successfully then logout
    await setMobileScreenSize(driver);
    await driver.get(loginUrl);
    await waitForElementAndClick(driver, ".form__label--custom");
    await login(driver, emailAddress, password);
    await logout(driver, "mobile");

    // Check log in button appears to make sure we are logged out
    await checkElementVisibility(driver, "[data-qa-id=login]", "visible");

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
