import { By, WebDriver, until } from 'selenium-webdriver';
import {USERNAME, PASSWORD, DOMAIN} from '../constants';

export async function runLoginTest(driver: WebDriver) {
  await driver.get(DOMAIN);

  const username = await driver.findElement(By.name('username'));
  const password = await driver.findElement(By.name('password'));
  const submit = await driver.findElement(By.css('button[type="submit"]'));

  await username.sendKeys(USERNAME);
  await password.sendKeys(PASSWORD);
  await submit.click();

  const mainElement = await driver.wait(
    until.elementLocated(By.css("span[role=\"link\"]")),
    10000 // wait up to 10 seconds
  );
  mainElement.takeScreenshot();

  await driver.wait(
    until.elementIsVisible(mainElement),
    5000 // wait up to 5 seconds for visibility
  );

  console.log('✅ Login test passed');
}
