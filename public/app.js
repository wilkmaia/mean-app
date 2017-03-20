// Defines the "app" AngularJS module
var app = angular.module('app', ['ngRoute']);

// Sets app's controller for home page
app.controller('HomeController', function($http) {
    var vm = this;
    vm.users = [];

    // Details on specific user
    vm.showDetails = function(user) {
        if (user) {
            vm.detailedUser = user;
            vm.detailed = true;
        }
    }

    // Gets complete users list from database
    vm.getUsers = function() {
        $http.get('/api/users').then(function(response) {
            vm.users = response.data;
        });
    }

    // Add new user to database
    vm.addUser = function(user) {
        if (user && user.name && user.age) {
            $http.post('/api/users', user).then(function(response){
                vm.getUsers();
                vm.user = {};
                vm.addUserFlag = false;
            });
        }
        else {
            console.error('addUser failed - Not enough information on user.');
        }
    }

    // Deletes user from database
    vm.deleteUser = function(user) {
        if (user) {
            $http.delete('/api/users/' + user._id).then(function(response){
                vm.getUsers();
            });
        }
    }

    // Updates info on user
    vm.updateUser = function(user) {
        if (user) {
            $http.put('/api/users/', user).then(function(response){
                vm.getUsers();
            });
        }
    }

    // Gets list of users for main page displaying
    vm.getUsers();
})

// Router configuration
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: './home.html'
    }).otherwise('/');
});