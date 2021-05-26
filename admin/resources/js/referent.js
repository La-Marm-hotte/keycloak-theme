module.controller('ReferentCtrl', ['$scope', '$modal', '$route', 'User', function($scope, $modal, $route, User) {
    
    // store the full co-adhrent user
    $scope.temp = {
        referent: null,
        name: ''
    };
    
    // open a dialog to select the referent
    $scope.selectReferent = function() {
        const modal = $modal.open({
            templateUrl: resourceUrl + '/partials/modal/select-referent.html',
            controller: 'SelectReferentCtrl',
            resolve: {
                realm: function(RealmLoader) {
                    return RealmLoader();
                },
                groupId: function() { return $scope.$parent.group.id; }
            }
        });
        modal.result.then(function (res) {
            $scope.$parent.group.attributes.referent = toLdapDN(res);
            retrieveUser();
        });
    };
    
    // Convert the LDAP DN to Keycloak-user's ID
    function getReferentUsername() {
        const referentDN = $scope.$parent.group.attributes.referent;
        return referentDN.match(/uid=([^,]+),/)[1];
    }
    
    // Convert the given Keycloak-user's ID to LDAP DN
    function toLdapDN(id) {
        return `uid=${id},ou=people,dc=la-marmhotte,dc=org`;
    }
        
    // get the referent from the keycloak API
    function retrieveUser() {
        if ($scope.$parent.group.attributes.referent) {
            User.query({
                first: 0,
                max: 1,
                search: getReferentUsername(),
                realm: $route.current.params.realm
            }, (users) => {
                $scope.temp.referent = users[0];
                buildUserDisplayName();
            });
        }
    }
    
    // build a user-friendly representation of the co-adherent
    function buildUserDisplayName() {
        $scope.temp.name = `${$scope.temp.referent.firstName} ${$scope.temp.referent.lastName} (n° ${$scope.temp.referent.attributes.numeroAdherent})`;
    }
    
    // retrieve the initial referent, if any
    retrieveUser();
    
}]);
 
