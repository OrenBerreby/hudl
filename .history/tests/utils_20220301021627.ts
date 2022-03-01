const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

export const getElement = (selector: string): Promise<void> => {
  await driver.findElement(webdriver.By.id("email"));
};

export const searchByPreExistingConditions = (
  pet: Pet,
  waggelIsAware: boolean,
  shouldMakeWaggelAware: boolean
): boolean => {
  return !!pet.preExistingConditions.find(
    (preExistingCond) =>
      preExistingCond.waggelIsAware === waggelIsAware &&
      preExistingCond.shouldMakeWaggelAware === shouldMakeWaggelAware
  );
};
