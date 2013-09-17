'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function($scope, angularFire, angularFireCollection, $route, $location) {

    var blocktype = $location.path() + '/';
    var purl = "https://remkoning.firebaseio.com/tocode" + blocktype;

    $scope.done = "";
    $scope.pages = [];
    var ref = new Firebase(purl).limit(1);
    $scope.promise = angularFire(ref, $scope, "pages");

    $scope.promise.then ( function(){

        if (Object.keys($scope.pages).length  == 0) {
            $scope.done = "Congrats! You have finished the coding the" + blocktype + "section.";
        }

        var key  = Object.keys($scope.pages)[0];
        var page = $scope.pages[key];

        var burl = "https://remkoning.firebaseio.com" + blocktype + page;
        var bref = new Firebase(burl);
        $scope.blocks = angularFireCollection(bref);

        $scope.submit = function() {
            // There is some bug see: http://stackoverflow.com/questions/17680131/firebase-push-failed-first-argument-contains-an-invalid-key-hashkey
            var blocks = angular.fromJson(angular.toJson($scope.blocks));
            bref.update(blocks);

            // Dissociate and then delete the value
            $scope.promise.disassociate;
            var rref = new Firebase(purl + key);
            rref.remove();
            $route.reload();
        };
    });


  })
  .controller('MyCtrl2', function() {

  });