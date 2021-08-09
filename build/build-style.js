const { parallel, src, dest } = require("gulp");
const cssmin = require("gulp-cssmin");
const cssimport = require("gulp-cssimport");

const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");

const cssimportOpt = {};

// compile theme default
function compileThemeDefault() {
    return (
        src("./../packages/theme-default/*.less")
            .pipe(
                less({
                    plugins: [autoprefixer],
                }),
            )
            /*.pipe(cssmin())*/
            .pipe(dest("./../libs/theme-default"))
    );
}

// compile theme dark
function compileThemeDark() {
    return (
        src("./../packages/theme-dark/*.less")
            .pipe(
                less({
                    plugins: [autoprefixer],
                }),
            )
            /* .pipe(cssmin()) */
            .pipe(dest("./../libs/theme-dark"))
    );
}

// copy font
function copyfont() {
    return (
        src("./../packages/font/**")
            /* .pipe(cssmin()) */
            .pipe(dest("./../libs/font"))
    );
}

exports.build = parallel(compileThemeDefault, compileThemeDark, copyfont);
