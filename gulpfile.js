(function(global, undefined){

    var _packageJson    = require('./package.json'),
        _browserSync    = require('browser-sync'),
        _gulp           = require('gulp'),
        _jshint         = require('gulp-jshint');

    var _settings = {

        version:        (_packageJson.version || ''),
        date:           new Date().toDateString(),

        servePath:      './src',
        serveIndex:     'demo.html',

        genericMatch:   ['./src/**/*.md'],
        graphicMatch:   ['./src/**/*.png','./src/**/*.jpg','./src/**/*.gif'],
        jsMatch:        ['./src/**/*.js', '!src/**/*.dev.js', '!src/**/*_spec.js'],
        cssMatch:       ['./src/**/*.css']
    };


    /**
     * JSHint JS files
     */
    _gulp.task('js-hint', function () {

        _gulp.src(_settings.jsMatch)
            .pipe(_jshint())
            .pipe(_jshint.reporter('default'))
            .pipe(_browserSync.reload({ stream: true }));
    });


    /**
     * Serve up app directory and watch for file updates
     */
    _gulp.task('browser-sync', function () {

        _browserSync({
            server: {
                baseDir: _settings.servePath,
                index: _settings.serveIndex
                //directory:true
            }
        });


        _gulp.watch(_settings.jsMatch, ['js-hint']);

        _gulp
            .watch(_settings.jsMatch.concat(_settings.cssMatch))
            .on('change', _browserSync.reload);
    });


    _gulp.task('serve', ['browser-sync']);

})(global);