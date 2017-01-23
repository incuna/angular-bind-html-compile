(function (angular) {
    'use strict';

    var module = angular.module('angular-bind-html-compile', []);

    module.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                // Here we will store wich is the previous compiled scope
                var _previousCompiledScope = null;
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    // In case value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.
                    element.html(value && value.toString());

                    // If we have a previousCompiled scope, just destroy it
                    if (_previousCompiledScope !== null) {
                        _previousCompiledScope.$destroy();
                    }

                    // If scope is provided use it, otherwise use parent scope
                    var compileScope = null;

                    if (attrs.bindHtmlScope) {
                        compileScope = scope.$eval(attrs.bindHtmlScope);
                    } else {
                        // Create new scope (We can delete it)
                        compileScope = scope.$new(false);
                    }

                    _previousCompiledScope = compileScope;

                    $compile(element.contents())(compileScope);
                });
            }
        };
    }]);
}(window.angular));
