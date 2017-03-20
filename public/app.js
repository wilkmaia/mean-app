var app = angular.module('app', ['ngRoute']);

app.controller('HomeController', function($http) {
    var vm = this;
    vm.title = "Home Controller";
    vm.users = [];

    vm.showDetails = function(user) {
        if (user) {
            vm.detailedUser = user;
            vm.detailed = true;
        }
    }

    vm.getUsers = function() {
        $http.get('/api/users').then(function(response) {
            vm.users = response.data;
        });
    }
    vm.getUsers();

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

    vm.deleteUser = function(user) {
        if (user) {
            $http.delete('/api/users/' + user._id).then(function(response){
                vm.getUsers();
            });
        }
    }

    vm.updateUser = function(user) {
        if (user) {
            $http.put('/api/users/', user).then(function(response){
                vm.getUsers();
            });
        }
    }

    return true;
})

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: './home.html'
    }).when('/a', {
        templateUrl: './a.html'
    });
    $routeProvider.otherwise('/');
});