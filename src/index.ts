import env from 'dotenv';
env.config();

import { Builder } from 'selenium-webdriver';
import { runLoginTest } from './tests/loginTest';
import chrome from "selenium-webdriver/chrome";


async function main() {

  const options = new chrome.Options();

  options.addArguments(
    "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "--x-browser-channel=stable"
  );
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await runLoginTest(driver);
    // await runProfileTest(driver);
    // await runSettingsTest(driver);

    console.log('✅ All tests passed. Browser will stay open for 60 seconds...');
    await driver.sleep(600000); // For manual inspection
  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    await driver.quit();
  }
}

main();
