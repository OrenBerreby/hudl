const webdriver = require("selenium-webdriver");

const driver = new webdriver.Builder().forBrowser("chrome").build();

function getElement(selector) {
  driver.findElement(webdriver.By.id(selector));
}
