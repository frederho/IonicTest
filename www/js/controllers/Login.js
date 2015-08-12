angular.module('starter.controllers')
    .controller('LoginCtrl', [
        '$scope',
        '$log',
        '$state',
        '$ionicLoading', 
        '$localStorage',
        'loginManager',
        'resources',
        function ($scope, $log, $state, $ionicLoading, $localStorage, loginManager, resources) {
            var onLoginSuccess = function (result) {
                $ionicLoading.hide();
                $scope.$emit("logInChange", true);
                $state.go('home.forum');
            };

            var onLoginError = function(result) {
                $ionicLoading.hide();
                $log.error(result);
                $scope.$emit("logInChange", false);
                if (result.status === 403) {
                    $scope.informationText = resources.get('loginError');
                }
            }
            var onLogoutSuccess = function() {
                $scope.$emit("logInChange", false);
                loginManager.options(options);
                $localStorage.$reset();
            };
            var options = function(data) {
                $scope.$emit("logInChange", data.isLoggedIn);
                $scope.options = data;
            };
            loginManager.options(options);

            resources.load().then(function() {
                $scope.title = options.isLoggedIn ?
                    resources.get("logOut") : resources.get("logIn");
            })
            
            $scope.login = function(username, password) {
                $ionicLoading.show({ template: resources.get('loading') });
                loginManager.login(username, password, onLoginSuccess, onLoginError);
            };
            $scope.logout = function() {
                loginManager.logout(onLogoutSuccess);
            };
        }
    ]);
