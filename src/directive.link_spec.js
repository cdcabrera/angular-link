
describe('Directive, LinkStyle', function () {

    var sampleDirective = '<css-link data-stylesheets="cssfiles" data-complete="iscssloaded"></css-link>';


    var sampleScopeData = {

        cssfiles: null,
        iscssloaded: false
    };


    var injected = {

        element:        undefined,
        $compile:       undefined,
        $rootScope:     undefined,
        $document:      undefined
    };


    /**
     * load the modules
     */
    beforeEach( module('directives.csslink') );


    /**
     * parse angular directive with sample scope data
     */
    beforeEach(compileDirective.call(injected, sampleDirective, sampleScopeData));


    /**
     * check the HTML render
     */
    it('should render', function () {

        scopeDirective.call(injected, {
            cssfiles: ['test.css']
        });

        expect(document.head.innerHTML).toContain('<link rel="stylesheet" href="test.css">');
    });


    /**
     * check basic scope properties
     */
    it('should pass back a boolean "true"', function () {

        expect(injected.$rootScope.iscssloaded).toEqual(true);
    });


    /**
     * Generic compile and append for Angular Directive. Returns the injected properties and methods within an Object.
     * @param testHtml {String} The directive's HTML, not the template.
     * @param testData {Object} To be applied to the rootScope.
     * @returns {*}
     */
    function compileDirective (testHtml, testData) {

        var injected = this;

        return inject(applyInjection);

        function applyInjection($injector) {

            var rootScope   = $injector.get('$rootScope'),
                compile     = $injector.get('$compile'),
                document    = $injector.get('$document'),
                timeout     = $injector.get('$timeout'),
                element;

            rootScope = rootScope.$new();

            element = compile(testHtml)(rootScope);

            injected.$rootScope = rootScope;
            injected.$compile   = compile;
            injected.$document  = document;
            injected.$timeout   = timeout;
            injected.element    = element;

            scopeDirective.call(injected, testData);

            document.find('body').append(injected.element);
        }
    }


    /**
     * Apply scope.
     * @param testData {Object}
     */
    function scopeDirective(testData) {

        var injected = this;

        angular.extend(injected.$rootScope, testData);

        injected.$rootScope.$digest();

        try {

            injected.$timeout.flush();

        } catch(e){}
    }
});