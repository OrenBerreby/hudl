const { By, Key } = require("selenium-webdriver");
const { until } = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");

const checkCurrentUrl = async (driver, expectedUrl) => {
  // Get current url and check it is the url we expect (timeout after 10 seconds if not found)
  await driver.wait(until.urlIs(expectedUrl), 10000);
  let url = await driver.getCurrentUrl();
  expect(url).toEqual(expectedUrl);
  console.log(url);
};

const fillInputField = async (driver, selector, selectorType, input) => {
  // Fill and check input field by using an id as the selector
  if (selectorType == "id") {
    await driver.findElement(By.id(selector)).sendKeys(input);
    let inputFieldResult = await driver
      .findElement(By.id(selector))
      .getAttribute("value");
    expect(inputFieldResult).toEqual(input);

    // Fill and check input field by using a class as the selector
  } else if (selectorType == "class") {
    await driver.findElement(By.className(selector)).sendKeys(input);
    let inputFieldResult = await driver
      .findElement(By.className(selector))
      .getAttribute("value");
    expect(inputFieldResult).toEqual(input);

    // Fill and check input field by using an xpath as the selector
  } else if (selectorType == "xpath") {
    await driver.findElement(By.xpath(selector)).sendKeys(input);
    let inputFieldResult = await driver
      .findElement(By.xpath(selector))
      .getAttribute("value");
    expect(inputFieldResult).toEqual(input);

    // Fill and check input field by using a name as the selector
  } else if (selectorType == "name") {
    await driver.findElement(By.name(selector)).sendKeys(input);
    let inputFieldResult = await driver
      .findElement(By.name(selector))
      .getAttribute("value");
    expect(inputFieldResult).toEqual(input);

    // Fill and check input field by using a cssSelector as the selector
  } else if (selectorType == "cssSelector") {
    await driver.findElement(By.css(selector)).sendKeys(input);
    let inputFieldResult = await driver
      .findElement(By.css(selector))
      .getAttribute("value");
    expect(inputFieldResult).toEqual(input);

    // If no standard method is picked throw an error as code would break
  } else {
    throw new Error("selector must be of type id, class, xpath or name");
  }
};

const checkFieldById = async (driver, selector, desiredText) => {
  let inputFieldResult = await driver
    .findElement(By.id(selector))
    .getAttribute("value");
  expect(inputFieldResult).toEqual(desiredText);
};

const login = async (driver, emailAddress, password) => {
  // Check page has loaded by checking current url
  await checkCurrentUrl(driver, "https://www.hudl.com/login");

  // Enter email address and check input field was successfully filled
  await fillInputField(driver, "email", "id", emailAddress);

  // Enter password and check it has been entered correctly
  await fillInputField(driver, "password", "id", password);

  // Click the login button
  await driver.findElement(By.id("logIn")).sendKeys(Key.RETURN);
};

const setMobileScreenSize = async (driver) => {
  // Set screensize to mobile size
  const { width, height } = await driver.manage().window().getRect();
  await driver.manage().window().setRect({ width: 360, height: 670 });
};

const checkElementVisibility = async (driver, cssSelector, state) => {
  // Checking that an element is visible and has loaded on the screen or is not visible
  if (state == "visible") {
    let element = By.css(cssSelector);
    await driver.wait(until.elementLocated(element, 10000));
    await driver.wait(
      until.elementIsVisible(driver.findElement(element)),
      10000
    );
  } else if (state == "notVisible") {
    let element = By.css(cssSelector);
    await driver.wait(until.elementLocated(element, 10000));
    await driver.wait(
      until.elementIsNotVisible(driver.findElement(element)),
      10000
    );
  } else {
    throw new Error("Element must be either 'visible' or 'notVisible");
  }
};

const checkElementState = async (driver, cssSelector, state) => {
  // Checking that an elements state, checking either enabled or disabled
  if (state == "enabled") {
    let element = By.css(cssSelector);
    await driver.wait(until.elementLocated(element, 10000));
    await driver.wait(
      until.elementIsEnabled(driver.findElement(element)),
      10000
    );
  } else if ((state = "disabled")) {
    let element = By.css(cssSelector);
    await driver.wait(until.elementLocated(element, 10000));
    await driver.wait(
      until.elementIsDisabled(driver.findElement(element)),
      10000
    );
  } else {
    throw new Error("Element must be either 'enabled' or 'disabled'");
  }
};
const waitForAndCheckElementText = async (driver, cssSelector, desiredText) => {
  let element = By.css(cssSelector);
  await driver.wait(until.elementLocated(element, 10000));
  const textFound = await driver.findElement(By.css(cssSelector)).getText();
  expect(textFound).toEqual(desiredText);
};

const waitForAndClick = async (driver, cssSelector) => {
  let element = By.css(cssSelector);
  await driver.wait(until.elementLocated(element, 10000));
  await driver.findElement(By.css(cssSelector)).click();
};

const checkErrorLoginContainer = async (driver) => {
  // Check error container was triggered, displays correct text and has need help button
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
};

const checkNeedHelpBtn = async (driver) => {
  await checkElementState(driver, "#logIn", "disabled");
  await checkErrorLoginContainer(driver);
  await waitForAndClick(driver, "div.login-error.fade-in-expand a");
};

exports.checkCurrentUrl = checkCurrentUrl;
exports.fillInputField = fillInputField;
exports.checkFieldById = checkFieldById;
exports.login = login;
exports.setMobileScreenSize = setMobileScreenSize;
exports.checkElementVisibility = checkElementVisibility;
exports.checkElementState = checkElementState;
exports.waitForAndCheckElementText = waitForAndCheckElementText;
exports.waitForAndClick = waitForAndClick;
exports.checkErrorLoginContainer = checkErrorLoginContainer;
exports.checkNeedHelpBtn = checkNeedHelpBtn;
