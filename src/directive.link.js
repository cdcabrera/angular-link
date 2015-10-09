(function(window, angular, undefined) {

    'use strict';


    /**
     * Stylesheet loader.
     * @module directives.csslink
     */
    angular
        .module('directives.csslink', [])
        .directive('cssLink', [
            '$timeout',
            function($timeout) {


                /**
                 * Create a CSS stylesheet link within a document header.
                 * @param stylesheet {String}
                 */
                function generateLink (stylesheet) {

                    $timeout(function() {

                        if (window.document.querySelector('link[href="'+stylesheet+'"]')) {

                            return;
                        }

                        var head    = (window.document.head || window.document.getElementsByTagName('head')[0] || window.document.documentElement),
                            element = window.document.createElement('link');

                        element.rel = 'stylesheet';
                        element.href = stylesheet;

                        head.appendChild(element);
                    });
                }


                return {

                    restrict: 'AE',

                    replace: true,

                    scope: {
                        stylesheets:    '&',
                        complete:       '='
                    },

                    link: function (scope, element, attrs, ctrl, $transcludeFn) {


                        scope.$watch('stylesheets()', function (stylesheets) {

                            if (angular.isArray(stylesheets)) {

                                for (var i=0; i<stylesheets.length; i++) {

                                    generateLink (stylesheets[i]);
                                }
                            }

                            scope.complete = true;
                        });
                    }
                };
            }
        ]);

})(this, window.angular);