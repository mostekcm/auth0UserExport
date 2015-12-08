angular.module( 'auth0UserExport.users', [
        'auth0',
        'datatables',
        'ngResource',
        'datatables.buttons'
    ])
    .controller( 'UsersCtrl', function UsersController( $scope, auth, $resource, store, DTOptionsBuilder, DTColumnBuilder ) {

        $scope.auth = auth;
        $scope.subdomain = 'myauth0';
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
            return $resource('https://'+$scope.subdomain+'.auth0.com/api/v2/users', null,
                {
                    query: {
                        isArray: true,
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer "+$scope.token
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
