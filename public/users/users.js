angular.module( 'auth0UserExport.users', [
        'auth0',
        'datatables',
        'datatables.buttons'
    ])
    .controller( 'UsersCtrl', function UsersController( $scope, auth, $http, $location, store ) {

        $scope.auth = auth;

        /*
        var vm = this;
        vm.dtOptions = DTOptionBuilder.newOptions()
            .withOptions('autoWidth', fnThatReturnsAPromise);

        function fnThatReturnsAPromise() {
            var defer = $q.defer();
            defer.resolve(false);
            return defer.promise;
        }
         */

        $scope.callApi = function() {
            // Just call the API as you'd do using $http
            $http({
                url: 'https://beautyfullday.auth0.com/api/v2/users',
                method: 'GET'
            }).then(function() {
                alert("We got the secured data successfully");
            }, function(response) {
                if (response.status == 0) {
                    alert("Please download the API seed so that you can call it.");
                }
                else {
                    alert(response.data);
                }
            });
        }

    }).controller('WithButtonsCtrl',

    function WithButtonsCtrl(DTOptionsBuilder, DTColumnBuilder) {
        var vm = this;
        vm.dtOptions = DTOptionsBuilder.fromSource('/users/test.data.json')
            .withDOM('frtip')
            .withPaginationType('full_numbers')
            // Active Buttons extension
            .withButtons([
                'colvis',
                'copy',
                'print',
                'csvHtml5',
            ]);
        vm.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('firstName').withTitle('First name'),
            DTColumnBuilder.newColumn('lastName').withTitle('Last name')
        ];
    });
