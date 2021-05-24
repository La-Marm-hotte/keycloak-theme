
module.controller('SelectCoAdherentCtrl', ['$scope', 'realm', 'Group', 'GroupMembership', '$modalInstance', function($scope, realm, Group, GroupMembership, $modalInstance) {
    // pagination of members
    $scope.first = 0;
    $scope.max = 10;
    $scope.hasMore = false;
    
    // fetch the ID of the group co-adherent
    Group.query({realm: realm.id}, (groups) => {
        const coAdhGroup = groups.find(g => g.name === 'co-adherent');
        $scope.groupId = coAdhGroup.id;
        $scope.nextPage();
    });
    
    // callback when a user is selected
    $scope.select = function(user) {
        $modalInstance.close(user.username);
    }
    
    // close the dialog
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    }
    
    $scope.nextPage = function() {
        GroupMembership.query({realm: realm.id, groupId: $scope.groupId, first: $scope.first, max: $scope.max}, (members) => {
            $scope.members = members;
            if (members.length == $scope.max) {
                $scope.hasMore = true;
                $scope.first += $scope.max;
            } else {
                $scope.hasMore = false;
                $scope.first += members.length;
            }
        });
    }
    
}]);
 
 
