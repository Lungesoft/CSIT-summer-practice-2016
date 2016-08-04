/**
 * Created by Aleksandr on 7/27/2016.
 */
angular.module("app", ['ngRoute'])
    .config(
        function($httpProvider, $routeProvider) {
            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            $routeProvider.when('/', {
                templateUrl : '/views/home.jsp'
            }).when('/collection', {
                templateUrl : '/views/collection.jsp'
            }).when('/profile', {
                templateUrl : '/views/profile.jsp'
            }).when('/editor', {
                templateUrl : '/views/editor.jsp'
            }).

            otherwise({
                redirectTo: '/'
            });
            
        }).controller("home", function($http, $location) {

    var self = this;
    $http.get("/user").success(function(data) {
        if (data.name) {
            self.user = data.name;
            self.authenticated = true;
        } else {
            self.user = "N/A";
            self.authenticated = false;
        }
    }).error(function() {
        self.user = "N/A";
        self.authenticated = false;
    });


    $http.get("/api/getFamousStory").success(function(data) {
        self.famousStory = data;
        self.famousStoryFragments = [data.rootFragment];
    }).error(function() {
        self.famousStors = "{\"error\":\"400\"}";

    });

    self.addFragment = function (data, index) {
        this.famousStoryFragments.splice(index + 1, Number.MAX_VALUE ,data);
    };


    self.safeFragment = function (data) {
        this.famousStoryFragments.push(data);
    };

    this.btnsStyle = [ 'btn-danger', 'btn-primary', 'btn-warning'];
    self.randomBtnStyle = function () {
        return this.btnsStyle[Math.floor(Math.random() * this.btnsStyle.length)];
    };
    self.logout = function() {
        $http.post('logout', {}).success(function() {
            self.authenticated = false;
            $location.path("/");
        }).error(function(data) {
            console.log("Logout failed")
            self.authenticated = false;
        });
    };






});