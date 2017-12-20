(function (angular) {
    'use strict';

    var bindHtmlCompile = angular.module('angular-bind-html-compile', []);

    bindHtmlCompile.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    // In case value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.
                    element.html(value && value.toString());
                    // If scope is provided use it, otherwise use parent scope
                    var compileScope = scope;
                    var obj = scope.$eval(attrs.mnBindHtmlScope)
                    if (obj) {
                        if (obj.$id) {
                            compileScope = obj
                        } else {
                            // if an object, transform it to scope
                            compileScope = scope.$new()
                            for (var p in obj) {
                                compileScope[p] = obj[p]
                            }
                        }
                    }
                    $compile(element.contents())(compileScope);
                });
            }
        };
    }]);

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = bindHtmlCompile.name;
    }
}(window.angular));