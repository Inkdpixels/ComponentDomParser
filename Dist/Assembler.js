/* @reduct/assembler 0.1.2 | @license MIT */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory) {
    var version = {
        major: 0,
        minor: 1,
        patch: 2
    };
    var global;

    if (typeof window !== "undefined") {
        global = window;
    } else if (typeof global !== "undefined") {
        global = global;
    } else if (typeof self !== "undefined") {
        global = self;
    } else {
        global = this;
    }

    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory(global, version);
    } else if (typeof define === "function" && define.amd) {
        define([], function () {
            return factory(global, version);
        });
    } else {
        global.reductAssembler = factory(global, version);
    }
})(function factory(global, version) {

    /**
     * DRAFT
     *
     * import MyComponent from 'MyComponent';
     * import YetAnotherComponent from 'YetAnotherComponent';
     *
     * let app = assembler();
     *
     * app.register(MyComponent);
     * app.register(YetAnotherComponent)
     *
     * app.boot();
     *
     *
     */

    var _Assembler = (function () {
        function _Assembler() {
            _classCallCheck(this, _Assembler);

            this.marker = 'component';
            this.selector = "data-" + this.marker;

            this.index = {};
            this.components = {};
        }

        _createClass(_Assembler, [{
            key: "instantiate",
            value: function instantiate(element) {
                var name = element.getAttribute(this.selector);

                var components = this.components[name] = [].slice.call(this.components[name] || []);
                var Component = this.index[name];

                components.unshift(new Component(element));
            }
        }, {
            key: "register",
            value: function register(ComponentClass) {
                var type = typeof ComponentClass;

                if ('function' !== type) {
                    throw new Error("'" + type + "' is not a valid component class.");
                }

                var name = ComponentClass.name;

                this.index[name] = ComponentClass;
            }
        }, {
            key: "boot",
            value: function boot() {
                var _this = this;

                console.log(this.selector);
                var elements = [].slice.call(document.querySelectorAll("[" + this.selector + "]"));
                var names = Object.keys(this.index);

                //
                // Find all elements which are instantiable.
                // Note: `getAttribute` has to be used due to: https://github.com/tmpvar/jsdom/issues/961
                //
                elements.filter(function (element) {
                    return !! ~names.indexOf(element.getAttribute(_this.selector));
                }).forEach(function (element) {
                    return _this.instantiate(element);
                });
            }
        }]);

        return _Assembler;
    })();

    return {
        Assembler: function Assembler() {
            var assembler = new _Assembler();

            var api = {
                register: function register(ComponentClass) {
                    return assembler.register(ComponentClass);
                },
                boot: function boot() {
                    return assembler.boot();
                }
            };

            //
            // Expose additional attributes for assertions.
            //
            if (process && process.title && process.title.indexOf('node') > -1) {
                api.index = assembler.index;
                api.components = assembler.components;
            }

            return api;
        },
        version: version
    };
});