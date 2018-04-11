// see: https://github.com/angular/angular-cli/issues/7824

const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const angularJONS = require("../angular.json");
const appName = process.argv[2];
const indexFilePath = path.resolve(__dirname, `../www/index.html`);

console.log("About to rewrite file: ", indexFilePath);

if (!appName) {
  throw "Argument [application name] is required";
}

fs.readFile(indexFilePath, "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // append csp metadata
  const $ = cheerio.load(data, { decodeEntities: false });
  const findCSP = $("head").find("meta[http-equiv=Content-Security-Policy]");

  if (!findCSP.length) {
    $('head > meta[name="viewport"]').after(
      `\n  <meta http-equiv=Content-Security-Policy content="default-src * data:; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'">`
    );
  }

  // now write that file back
  fs.writeFile(indexFilePath, $.html({ decodeEntities: false }), function(err) {
    if (err) return console.log(err);
    console.log("Successfully rewrote index html");
  });
});
