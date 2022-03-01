const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

// Get element
export const getElement = async (
  selector: string,
  test: string
): Promise<void> => {
  driver.findElement(webdriver.By.id(selector));
};
