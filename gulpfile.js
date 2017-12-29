'use strict';

var gulp     = require('gulp'),
    manifest = require('./package.json'),
    $$       = require('gulp-load-plugins')(),
    pipe     = require('multipipe');

gulp.task('default', function() {
    return gulp.src('index.js')
        .pipe(
            $$.mirror(
                pipe(
                    $$.rename(manifest.name + '.js'),
                    $$.browserify({ debug: true }).on('error', $$.util.log),
                    $$.replace('exports.preinstall', 'fin.Hypergrid.modules.preinstall')
                ),
                pipe(
                    $$.rename(manifest.name + '.min.js'),
                    $$.browserify(),
                    $$.uglify().on('error', $$.util.log),
                    $$.replace('exports.preinstall', 'fin.Hypergrid.modules.preinstall')
                )
            )
        )
        .pipe(gulp.dest(manifest.version + '/build/'));
});