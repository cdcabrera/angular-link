// Karma config
module.exports = function(config) {

    config.set({


        basePath: './',


        frameworks: ['jasmine'],


        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'src/**/*.htm',
            'src/**/*.html',
            'src/**/*.json'
        ],


        exclude: [
            'src/config.js'
        ],


        preprocessors: {
            'src/**/*.htm': ['ng-html2js'],
            'src/**/*.html': ['ng-html2js'],
            'src/**/*.json': ['ng-json2js']
        },


        reporters: ['progress'],


        port: 9876,


        colors: true,


        logLevel: config.LOG_INFO,


        autoWatch: true,


        //browsers: ['Chrome'],
        browsers: ['PhantomJS'],


        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-ng-json2js-preprocessor',
            'karma-ng-html2js-preprocessor'
        ],


        singleRun: false,


        ngHtml2JsPreprocessor: {
            moduleName: 'htmlTemplates',
            stripPrefix: 'src/'
        },


        ngJson2JsPreprocessor: {
            stripPrefix: 'src/'
        }
    });
};
