// index.js
const net = require("net");
const two = require("./two");

console.log(two.inc());
console.log(two.inc());
console.log(two.inc());
console.log(two.inc());

/*
let config;

const getDb = () => {
  if (config == null) {
    config = fs.readFileSync("./.env");
  }

  const connectino = db.connect(config);
  // 🐉
};

module.exports = getDb;
*/