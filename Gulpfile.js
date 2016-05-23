var gulp = require('gulp');

var argv = require('yargs').argv;
var protractor = require("gulp-protractor").protractor;
var shell = require('gulp-shell');
var replace = require('gulp-replace-task');
var time = require("time-require");

// passed parameters
var domain = "https://x3u9.us.xmsymphony.com";
var username = "kyle";
var password = "mytoshiba1234";

if (argv.domain) {
    domain = argv.domain;
}
if (argv.username) {
    username = argv.username;
}
if (argv.password) {
    password = argv.password;
}

console.log("*******************************Passed parameters*******************************");
console.log("domain:" + domain);
console.log("username:" + username);
console.log("password:" + password);
console.log("*******************************************************************************");

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname));
    app.listen(4000, '0.0.0.0');
});

gulp.task('protractor-webdriver', shell.task([
    './node_modules/protractor/bin/webdriver-manager update'
]));

gulp.task('replace', function () {
     gulp.src('tests/e2e/scenario/*.js')
         .pipe(replace({
             patterns: [
                 {
                     match: '<DOMAIN>',
                     replacement: domain
                 },
                 {
                     match: '<USERNAME>',
                     replacement: username
                 },
                 {
                     match: '<PASSWORD>',
                     replacement: password
                 }
             ],
             usePrefix: false
         }))
         .pipe(gulp.dest('tests/e2e/event'));
});

gulp.task('protractor', function () {
    gulp.src(["tests/e2e/event/*.js"])
        .pipe(protractor({
            options: {
                keepAlive: false,
                configFile: "protractor.conf.js"
            },
            auto: {
                keepAlive: false,
                options: {
                    args: {
                        seleniumPort: 4444
                    }
                }
            }
        }))
        .on('error', function(e) { throw e });
});


gulp.task('automation', ['replace','protractor'], function() {

});