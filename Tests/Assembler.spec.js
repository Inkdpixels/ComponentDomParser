/* @reduct/assembler x.x.x | @license MIT */

var chai = require('@reduct/build-tools').chai;
var assembler = require('./../Dist/Assembler.js');
var DOM = require('./Helpers/DOM');

var expect = chai.expect;

describe('The "Assembler"', function suite () {
    var mock = '' +
        '<html>' +
            '<head></head>' +
            '<body>' +
                '<div data-component="MyComponent"></div>' +
            '</body>' +
        '</html>';

    beforeEach(function before (done) {
        return DOM.create(mock, done);
    });

    it('should be able to create an app', function test (done) {
        var app = assembler();

        expect(app.register).to.be.a('function');
        expect(app.run).to.be.a('function');

        done();
    });

    it('should be able to register component instances', function test (done) {
        var app = assembler();

        function MyComponent () {}

        app.register(MyComponent);

        expect(Object.keys(app.index).length).to.equal(1);
        expect(Object.keys(app.index)[0]).to.equal(MyComponent.name);

        done();
    });

    it('should be able to instantiate components', function test (done) {
        var app = assembler();
        var components;

        function MyComponent () {
            this.id = 'foo';
        }

        app.register(MyComponent);
        app.run();

        components = app.components[MyComponent.name];

        expect(Object.keys(app.components).length).to.equal(1);

        expect(components.length).to.equal(1);
        expect(components[0].id).to.equal('foo');

        done();
    });
});
