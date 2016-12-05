(function (angular) {
    'use strict';

    var module = angular.module('angular-bind-html-compile', []);

    module.directive('bindHtmlCompile', ['$templateRequest', '$compile', function ($templateRequest, $compile) {
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
                    if (attrs.bindHtmlScope) {
                        compileScope = scope.$eval(attrs.bindHtmlScope);
                    }
                    $compile(element.contents())(compileScope);
                });
                scope.$watch(function () {
                        return scope.$eval(attrs.templateUrl);
                    }, function (src) {
                        if (src) {
                            // set the 2nd param to true to ignore the template request error so that the inner
                            // contents and scope can be cleaned up.
                            $templateRequest(src, true).then(function (html) {
                                var tpl = angular.element(html);
                                element.append(tpl);
                                var compileScope = scope;
                                if (attrs.templateUrl) {
                                    compileScope = scope.$eval(attrs.templateUrl);
                                }
                                $compile(tpl)(compileScope);
                            }, function () {
                                if (scope.$$destroyed) {return;}
                            });
                        }
                 });
            }
        };
    }]);
}(window.angular));
