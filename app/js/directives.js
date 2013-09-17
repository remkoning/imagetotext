'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive('ngStopBind', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr) {

            elm.unbind('input').unbind('keydown').unbind('change');
        }
    };
}).directive('ngTest', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr) {

            elm.unbind('input').unbind('keydown').unbind('change');
        }
    };
});