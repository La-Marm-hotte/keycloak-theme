
module.controller('MembershipDateCtrl', ['$scope', function($scope) {

    let date = new Date();
    if ($scope.$parent.user.attributes.membershipDate) {
      date = fromLdapDate($scope.$parent.user.attributes.membershipDate);
    }
    $scope.temp = {
      membershipDate: date,
    };
    
    function fromLdapDate(rawDate) {
        const parsed = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})Z/.exec(rawDate);
        const month = parseInt(parsed[2], 10) - 1;
        return new Date(Date.UTC(parsed[1], month, parsed[3], parsed[4], parsed[5]));
    }
    
    function toLdapDate(jsDate) {
        const str = jsDate.toISOString()
        const parsed = /(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}.\d+/.exec(str);
        return `${parsed[1]}${parsed[2]}${parsed[3]}1200Z`;
    }
    
    $scope.$watch('temp.membershipDate', function (newValue, oldValue) {
        if (newValue && (newValue !== oldValue)) {
          $scope.$parent.user.attributes.membershipDate = toLdapDate(newValue);
        }
      });
    
}]);
 
