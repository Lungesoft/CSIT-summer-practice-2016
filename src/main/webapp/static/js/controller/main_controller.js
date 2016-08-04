
angular.module('app').controller("home", function($http, $location, $scope ) {

    var self = this;

    $scope.location = $location;

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



    ///////////////////////////////////////////////////////////////////////////
    $http.get("/api/getFamousStory").success(function(data) {
        self.famousStory = data;
        self.famousStoryFragments = [data.rootFragment];
        console.log("get")

    }).error(function() {
        self.famousStors = "{\"error\":\"400\"}";

    });

    $http.get("/api/getAllStory").success(function(data) {
        self.stories=data;
    }).error(function() {
        self.stories = [];
    });

    self.addFragment = function (data, index) {
        this.famousStoryFragments.splice(index + 1, Number.MAX_VALUE ,data);
    };



    $scope.btnsStyle = [ 'btn-danger', 'btn-primary', 'btn-warning', ''];
    self.randomBtnStyle = function () {
        return $scope.btnsStyle[Math.floor(Math.random() * ($scope.btnsStyle.length-1))];
    };



    $scope.saveFragment = function (index) {
        // use $.param jQuery function to serialize data from JSON
        var data = {
            title: self.title,
            text: self.text
        };



        $http.post('/api/addChildFragment', data)
            .success(function (data) {
                self.response = data;
                self.addFragment(data, index);
                console.log("post")
                $location.path("/");

            })
            .error(function (data) {
                self.response = "{\"error\":\"400\"}";
            });



    };
    //////////////////////////////////////////////////////////////////////////////////
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