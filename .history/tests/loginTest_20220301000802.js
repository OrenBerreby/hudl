import { By, Key, Builder } from "selenium-webdriver";
import "chromedriver";

let Page = new Page();

// Go to Hudl login page at beginning of each test
beforeAll(async () => {
  await driver.navigate().to("https://www.hudl.com/login");
});

// Close chrome after each test is run
afterAll(async () => {
  await driver.quit();
});

describe("Test logging into Hudl", () => {
  test("should be opened as successfully", async () => {
    await homePage.wikiSearch("Selenium (software)");
    await homePage.searchButton();
    expect(await seleniumPage.getHeadingText()).toEqual("Selenium (software)");
  });
  test("contains the correct repository URL", async () => {
    expect(await seleniumPage.getRepositoryUrlText()).toEqual(
      "github.com/SeleniumHQ/"
    );
  });
});
