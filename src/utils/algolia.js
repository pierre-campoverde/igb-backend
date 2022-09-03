const algoliasearch = require("algoliasearch");
const algoliaClient = algoliasearch(
  "FESD5CF6G8",
  "ae1eef93abaceb5bd551b416e2fef296"
);
const index = algoliaClient.initIndex("igb_marcas_dev");

module.exports = { index };
