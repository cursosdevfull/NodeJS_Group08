const uglify = require("gulp-uglify-es").default;
const { src, dest } = require("gulp");

const typescript = require("gulp-typescript");
// const sourcemaps = require("gulp-sourcemaps");
const alias = require("gulp-ts-alias-plus");

const project = typescript.createProject("tsconfig.json");

const minify = () => {
  return src("./src/**/*.ts")
    .pipe(alias({ configuration: project.config }))
    .pipe(project())
    .pipe(uglify())
    .pipe(dest("dist"));
};

exports.minify = minify;
