const { By, Key } = require("selenium-webdriver");
const { until } = require("selenium-webdriver");

const checkCurrentUrl = async (driver, expectedUrl) => {
  // Get current url and check it is the url we expect (timeout after 10 seconds if not found)
  await driver.wait(until.urlIs(expectedUrl), 10000);
  let url = await driver.getCurrentUrl();
  expect(url).toEqual(expectedUrl);
  console.log(url);
};

const fillInputField = async (driver, CssSelector, selectorType, input) => {
  // Fill and check input field by using an id as the selector
  await driver.findElement(By.css(CssSelector)).sendKeys(input);
  let inputFieldResult = await driver
    .findElement(By.css(CssSelector))
    .getAttribute("value");
  expect(inputFieldResult).toEqual(input);
};

const login = async (driver, emailAddress, password) => {
  // Check page has loaded by checking current url
  await checkCurrentUrl(driver, "https://www.hudl.com/login");

  // Enter email address and check input field was successfully filled
  await fillInputField(driver, "#email", emailAddress);

  // Enter password and check it has been entered correctly
  await fillInputField(driver, "#password", password);

  // Click the login button
  await driver.findElement(By.id("#logIn")).sendKeys(Key.RETURN);
};

const setMobileScreenSize = async (driver) => {
  // Set screensize to mobile size
  const { width, height } = await driver.manage().window().getRect();
  await driver.manage().window().setRect({ width: 360, height: 670 });
};

const checkElementIsVisible = async (driver, cssSelector) => {
  // Checking that an element is visible and has loaded on the screen
  let element = By.css(cssSelector);
  await driver.wait(until.elementLocated(element, 10000));
  await driver.wait(until.elementIsVisible(driver.findElement(element)), 10000);
};

exports.checkCurrentUrl = checkCurrentUrl;
exports.fillInputField = fillInputField;
exports.login = login;
exports.setMobileScreenSize = setMobileScreenSize;
exports.checkElementIsVisible = checkElementIsVisible;

//exports.fillInput = fillInput;
