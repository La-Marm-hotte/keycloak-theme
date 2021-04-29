
module.controller('UsernameCtrl', ['$scope', function($scope) {

    if ($scope.$parent.editUsername) {
        $scope.$watch('$parent.user.firstName', function (newValue, oldValue) {
            if (newValue && (newValue !== oldValue)) {
            const lastName = $scope.$parent.user.lastName || '';
            $scope.$parent.user.username = toUserName(newValue, lastName);
            }
        });
        $scope.$watch('$parent.user.lastName', function (newValue, oldValue) {
            if (newValue && (newValue !== oldValue)) {
            const firstName = $scope.$parent.user.firstName || '';
            $scope.$parent.user.username = toUserName(firstName, newValue);
            }
        });
    }
    
    function normalize(str) {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]|_/g, '').replace(/[^\w\s-]/g, '').replace(/[-\s]/g, '-');
    }
    
    function toUserName(firstName, lastName) {
        return `${normalize(firstName)}.${normalize(lastName)}`;
    }
    
}]);
 
