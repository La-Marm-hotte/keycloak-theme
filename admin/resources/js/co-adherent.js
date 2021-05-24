
module.controller('CoAdherentCtrl', ['$scope', '$modal', function($scope, $modal) {
    
    $scope.temp = {};
    
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
            $scope.temp.coAdherent = res;
        });
    };
    
}]);
 
