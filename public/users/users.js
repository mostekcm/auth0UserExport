angular.module( 'auth0UserExport.users', [
        'auth0',
        'datatables',
        'ngResource',
        'datatables.buttons'
    ])
    .controller( 'UsersCtrl', function UsersController( $scope, auth, $resource, store, DTOptionsBuilder, DTColumnBuilder ) {

        $scope.auth = auth;
        $scope.token = 'fake_token';

        var vm = this;

        vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            return $resource('/users/test.data.json').query().$promise;
        }).withDOM('frtip')
            .withPaginationType('full_numbers')
            // Active Buttons extension
            .withButtons([
                'colvis',
                'copy',
                'print',
                'csvHtml5',
            ]);
        vm.dtColumns = [
            DTColumnBuilder.newColumn('user_id').withTitle('ID').withOption('defaultContent', ''),
            DTColumnBuilder.newColumn('name').withTitle('Name').withOption('defaultContent', ''),
            DTColumnBuilder.newColumn('given_name').withTitle('First Name').withOption('defaultContent', ''),
            DTColumnBuilder.newColumn('family_name').withTitle('Last Name').withOption('defaultContent', ''),
            DTColumnBuilder.newColumn('email').withTitle('Email').withOption('defaultContent', ''),
            DTColumnBuilder.newColumn('last_login').withTitle('Last Login Datetime').withOption('defaultContent', ''),
            DTColumnBuilder.newColumn('logins_count').withTitle('Number of Logins').withOption('defaultContent', '')
        ];
        vm.newPromise = newPromise;
        vm.reloadData = reloadData;
        vm.dtInstance = {};

        function newPromise() {
            return $resource('https://beautyfullday.auth0.com/api/v2/users', null,
                {
                    query: {
                        isArray: true,
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer "+$scope.token //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDMFJiNDZPOXRPVkcwVlMzeG9QeEo1Z3BET0pGQUxrOCIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NDk1NDM3NDUsImp0aSI6ImM5NDRiNjkyZmYyZjNiOGM5OWE0NDAxYWFiOTlkNGMyIn0.WeXBcl6u7PVs4e6cPXWtkDn83c95PdBoN4lM7zExvp8"
                        }
                    }
                }).query().$promise;
        }

        function reloadData() {
            var resetPaging = true;
            vm.dtInstance.reloadData(callback, resetPaging);
        }

        function callback(json) {
            console.log(json);
        }



    });
