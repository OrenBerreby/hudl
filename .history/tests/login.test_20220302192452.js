const { expect } = require("@jest/globals");
const { By } = require("selenium-webdriver");
const { until } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
const { titleContains } = require("selenium-webdriver/lib/until");
const {
  checkCurrentUrl,
  fillInputField,
  setMobileScreenSize,
  login,
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

  test.only("Login validation testing", async () => {
    let driver = new webdriver.Builder().forBrowser("chrome").build();
    await driver.get(loginUrl);

    // Login with blank email and password
    await login(driver, "", "");

    // Check Log In button is disabled after entering bad credentials
    until.elementIsDisabled("logIn");

    console.log("button disabled check");

    let element = await driver.findElements(
      By.css("div.login-error.fade-in-expand p")
    );

    const text = element.toString;

    console.log(p);

    // await new Promise((r) => setTimeout(r, 6000));
    // let errorElement = await driver.wait(
    //   until.elementIsVisible(
    //     driver.findElement(By.className("login-error-container")),
    //     15000
    //   )
    // );

    // errorElement.getAttribute("value");

    // console.log(errorMsg);
    // Check need help button

    // // Login with email and no password
    // await login(driver, emailAddress, " ");

    // // Login with password and no email
    // await login(driver, " ", password);

    await driver.close();
  });

  test("Test all buttons on login page to check they all work", async () => {});

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
