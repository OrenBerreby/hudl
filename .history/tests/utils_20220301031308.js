const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

// exports.getElement = getElement;

function fillInput(selector) {
  driver.findElement(webdriver.By.id(selector));
}

exports.fillInput = fillInput;
