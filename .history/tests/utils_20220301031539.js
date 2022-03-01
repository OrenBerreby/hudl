const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

// exports.getElement = getElement;

function fillInput(email, selector) {
  driver.findElement(webdriver.By.id(selector)).sendKeys(email);
}

exports.fillInput = fillInput;
