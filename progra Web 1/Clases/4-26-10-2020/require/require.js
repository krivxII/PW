const fs = require("fs");

const _require = (path) => {
  const file = fs.readFileSync(path, {
    encoding: "utf8",
    flag: "r",
  });

  const exports = eval(`
    const module = {
      exports: {}
    }

    ${file}

    module.exports;
  `);

  return exports;
};

console.log(_require("./two.js"));
