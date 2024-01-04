const path = require("path");

module.exports = {
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
};
