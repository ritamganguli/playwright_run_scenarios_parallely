const { setWorldConstructor, World, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, webkit } = require('playwright');
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];
setDefaultTimeout(120 * 1000);

class CustomWorld extends World {
  async setTestStatus(status, remark) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status, remark } })}`);
  }
}

Before(async (scenario) => {
  const capabilities = {
    'browserName': scenario.pickle.name.includes('Chrome') ? 'Chrome' : 'pw-webkit',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Cucumber-JS Build',
      'name': scenario.pickle.name,
      'user': 'ritamg',
      'accessKey':'acess_key',
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
      'playwrightClientVersion': playwrightClientVersion
    }
  };

  // Create page and browser globals to be used in the scenarios
  if (capabilities.browserName === 'Chrome') {
    global.browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });
  } else if (capabilities.browserName === 'pw-webkit') {
    global.browser = await webkit.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });
  }

  const context = await global.browser.newContext();
  global.page = await context.newPage();
});

After(async () => {
  await global.browser.close();
});

setWorldConstructor(CustomWorld);
