(function () {
    'use strict';

    var module = angular.module('angular-bind-html-compile', []);

    module.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                bindHtmlCompile: '=',
                bindHtmlScope: '=?'
            },
            link: function (scope, element, attrs) {
                scope.$watch('bindHtmlCompile', function (value) {
                    // Incase value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.
                    element.html(value && value.toString());
                    if (scope.bindHtmlScope) {
                        // If a scope was provided, use it
                        $compile(element.contents())(scope.bindHtmlScope);
                    } else {
                        // Otherwise use parent scope
                        $compile(element.contents())(scope.$parent);
                    }
                });
            }
        };
    }]);
}());
