const algoliasearch = require("algoliasearch");
const algoliaClient = algoliasearch(
  "3VD6ADKUBH",
  "16e3e0658f5b619ec3e67cc293c6a027"
);
const index = algoliaClient.initIndex("dev_igb");

module.exports = { index };
