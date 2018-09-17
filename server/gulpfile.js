var gulp = require("gulp");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task("lint:ts", function() {
  return gulp.src("src/**/*.ts")
    .pipe(tslint({
      formatter: "verbose",
      configuration: "tslint.json"
    }))
    .pipe(tslint.report())
});
