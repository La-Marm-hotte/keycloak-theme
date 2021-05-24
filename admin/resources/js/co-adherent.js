
module.controller('CoAdherentCtrl', ['$scope', '$modal', '$route', 'User', function($scope, $modal, $route, User) {
    
    // store the full co-adhrent user
    $scope.temp = {
        coAdhrent: null,
        name: ''
    };
    
    // open a dialog to select the co-adhrent
    $scope.selectCoAdherent = function() {
        const modal = $modal.open({
            templateUrl: resourceUrl + '/partials/modal/select-co-adh.html',
            controller: 'SelectCoAdherentCtrl',
            resolve: {
                realm: function(RealmLoader) {
                    return RealmLoader();
                }
            }
        });
        modal.result.then(function (res) {
            $scope.$parent.user.attributes.coAdherent = toLdapDN(res);
            retrieveUser();
        });
    };
    
    // Convert the LDAP DN to Keycloak-user's ID
    function getCoAdhrentUsername() {
        const coAdhrentDN = $scope.$parent.user.attributes.coAdherent;
        return coAdhrentDN.match(/uid=([^,]+),/)[1];
    }
    
    // Convert the given Keycloak-user's ID to LDAP DN
    function toLdapDN(id) {
        return `uid=${id},ou=people,dc=la-marmhotte,dc=org`;
    }
        
    // get the co-adhrent from the keycloak API
    function retrieveUser() {
        if ($scope.$parent.user.attributes.coAdherent) {
            User.query({
                first: 0,
                max: 1,
                search: getCoAdhrentUsername(),
                realm: $route.current.params.realm
            }, (users) => {
                $scope.temp.coAdhrent = users[0];
                buildUserName();
            });
        }
    }
    
    // build a user-friendly representation of the co-adherent
    function buildUserName() {
        $scope.temp.name = `${$scope.temp.coAdhrent.firstName} ${$scope.temp.coAdhrent.lastName} (n° ${$scope.temp.coAdhrent.attributes.numeroAdherent})`;
    }
    
    // retrieve the initial co-adhrent, if any
    retrieveUser();
    
}]);
 
