var gulp = require('gulp');
var browserify = require('gulp-browserify');
var license = require('gulp-license');
var rename = require('gulp-rename');
var surround = require('./surround');
var tvuiPrefix = '//@depend ../Rx.netflix.js\n' +
    '//@depend netflix/falcor/Falcor.js\n' +
    '(function(exports) {';
var tvuiPostfix = 'exports.Model = Model;\n' +
    '}(netflix.falcor));';
var licenseInfo = {
    organization: 'Netflix, Inc',
    year: '2014'
};
gulp.task('build.all', ['build.sentinel', 'build.node']);

gulp.task('build.node', ['clean.dev'], function() {
    return build(['index.js']);
});
gulp.task('dist.node', ['clean.dev'], function() {
    return build(['index.js'], false, false, 'dist');
});

gulp.task('build.sentinel', ['clean.dev'], function() {
    return build(['sentinel.js']);
});

function build(file, standAloneName, outName, dest) {
    return gulp.
        src(file).
        pipe(browserify({
            standalone: standAloneName || 'falcor'
        })).
        pipe(license('Apache', licenseInfo)).
        pipe(rename(outName || 'Falcor.js')).
        pipe(gulp.dest(dest || 'bin'));
}

module.exports = build;
