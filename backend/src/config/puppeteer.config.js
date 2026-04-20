const puppeteer = require("puppeteer");

const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};

module.exports = { launchBrowser };