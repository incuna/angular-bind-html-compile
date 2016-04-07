(function (angular) {
    'use strict';

    var module = angular.module('angular-bind-html-compile', []);

    module.directive('bindHtmlCompile', ['$compile', function ($compile) {
      return {
          restrict: 'A',
          scope: {
            beforeCompile:'&bindHtmlBeforeCompile',
            afterCompile: '&bindHtmlAfterCompile'
          },
          link: function (scope, element, attrs) {
              scope.$parent.$watch(function () {
                  return scope.$parent.$eval(attrs.bindHtmlCompile);
              }, function (value) {
                  // In case value is a TrustedValueHolderType, sometimes it
                  // needs to be explicitly called into a string in order to
                  // get the HTML string.
                  element.html(value && value.toString());

                  // beforeCompile hook
                  var beforeCompile = scope.beforeCompile();
                  beforeCompile && beforeCompile(element)

                  // If scope is provided use it, otherwise use parent scope
                  var compileScope = scope.$parent;
                  if (attrs.bindHtmlScope) {
                      compileScope = scope.$parent.$eval(attrs.bindHtmlScope);
                  }

                  //console.log("compiling...")
                  $compile(element.contents())(compileScope);

                  // After compile hook
                  var afterCompile = scope.afterCompile();
                  afterCompile && afterCompile(element)
              });
          }
      };
    }]);
}(window.angular));
