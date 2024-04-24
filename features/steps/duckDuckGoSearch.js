const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

let chromePage;
let webkitPage;

Given("Open DuckDuckGo Website for Chrome", { timeout: 60 * 1000 }, async function () {
  chromePage = await global.page;
  await chromePage.goto("https://google.com");
  await page.waitForTimeout(10000); // Add a delay of 1000 milliseconds (1 second)
});

Given("Open DuckDuckGo Website for pw-webkit", { timeout: 60 * 1000 }, async function () {
  webkitPage = await global.page;
  await webkitPage.goto("https://google.com");
  await page.waitForTimeout(10000); // Add a delay of 1000 milliseconds (1 second)
});

When("Search for LambdaTest for Chrome", async function () {
  let chromeElement = await chromePage.locator("[name=\"q\"]");

  await chromeElement.click();
  await chromeElement.type("LambdaTest");
  await chromeElement.press("Enter");
  await page.waitForTimeout(10000); // Add a delay of 1000 milliseconds (1 second)
});

When("Search for LambdaTest for pw-webkit", async function () {
  let webkitElement = await webkitPage.locator("[name=\"q\"]");

  await webkitElement.click();
  await webkitElement.type("LambdaTest");
  await webkitElement.press("Enter");
  await page.waitForTimeout(10000); // Add a delay of 1000 milliseconds (1 second)
});

Then("Title should match for Chrome", async function () {
  const chromeTitle = await chromePage.title();

  try {
    assert.equal(chromeTitle, "LambdaTest", "Chrome page title does not match");

    await this.setTestStatus("passed", "Title matched for Chrome");
  } catch (e) {
    await this.setTestStatus("failed", e.message + " for Chrome");
    throw e;
  }
});

Then("Title should match for pw-webkit", async function () {
  const webkitTitle = await webkitPage.title();

  try {
    assert.equal(webkitTitle, "LambdaTest at DuckDuckGo", "pw-webkit page title does not match");

    await this.setTestStatus("passed", "Title matched for pw-webkit");
  } catch (e) {
    await this.setTestStatus("failed", e.message + " for pw-webkit");
    throw e;
  }
});
