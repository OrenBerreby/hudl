import { By, Key, Builder } from "selenium-webdriver";
import "chromedriver";

let Page = new Page();

beforeAll(async () => {
  await driver.navigate().to("https://www.hudl.com/login");
});
