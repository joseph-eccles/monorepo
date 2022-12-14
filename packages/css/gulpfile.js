const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssvariables = require("postcss-css-variables");
const cssImport = require("postcss-import");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");

/* compile css into one file with hard coded values, 
runs autoprefixer to add browser specific prefixes */
gulp.task("css", async function () {
  return gulp
    .src("src/styles.css")
    .pipe(postcss([cssImport, cssvariables, autoprefixer]))
    .pipe(rename("made.css"))
    .pipe(gulp.dest("dist/"));
});


/* compile css into one file with CSS variables values */
gulp.task("css-vars", async function () {
  return gulp
    .src("src/styles.css")
    .pipe(postcss([cssImport, autoprefixer]))
    .pipe(rename("made-css-variables.css"))
    .pipe(gulp.dest("dist/"));
});

/* compile css into one minified file with hard coded values */
gulp.task("css-min", async function () {
  return gulp
    .src("src/styles.css")
    .pipe(postcss([cssImport, cssvariables, autoprefixer]))
    .pipe(cleanCSS({ compatibility: "ie11" }))
    .pipe(rename("made.min.css"))
    .pipe(gulp.dest("dist/"));
});

/* compile css into one minified file with CSS variables values */
gulp.task("css-vars-min", async function () {
  return gulp
    .src("src/styles.css")
    .pipe(postcss([cssImport, autoprefixer]))
    .pipe(cleanCSS({ compatibility: "ie11" }))
    .pipe(rename("made-css-variables.min.css"))
    .pipe(gulp.dest("dist/"));
});

/* copy css from src file to dist folder */
/*gulp.task("copy-src", function () {
  return gulp
    .src(["src/**"], { base: "./" })
    .pipe(gulp.dest("./dist/"));
});*/

/* run all of the tasks */
gulp.task("default", gulp.parallel("css", "css-min", "css-vars", "css-vars-min"/*, "copy-src"*/));
