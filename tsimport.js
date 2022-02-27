var through = require("through2");
var replacePath = require("./replace-path.js");

module.exports = function (importOptions) {
  return through.obj(function (file, enc, cb) {
    if (!file.contents) {
      return;
    }
    var code = file.contents.toString("utf8");
    code = replacePath(code, file.history.toString(), importOptions);
    file.contents = Buffer.from(code);
    this.push(file);
    cb();
  });
};
