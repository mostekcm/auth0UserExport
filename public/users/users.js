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
        $scope.showDataTable = false;

        /* Setup the default set of columns available in human readable format for easy editing if desired */
        $scope.availableOptions = [
            { 'field' : 'user_id',                 'title' : 'ID',                  'type': 'text',  'use': true},
            { 'field' : 'name',                    'title' : 'Name',                'type': 'text',  'use': true},
            { 'field' : 'given_name',              'title' : 'First Name',          'type': 'text',  'use': true},
            { 'field' : 'family_name',             'title' : 'Last Name',           'type': 'text',  'use': true},
            { 'field' : 'email',                   'title' : 'Email',               'type': 'text',  'use': true},
            { 'field' : 'last_login',              'title' : 'Last Login Datetime', 'type': 'text',  'use': true},
            { 'field' : 'logins_count',            'title' : 'ID',                  'type': 'number','use': true},
            { 'field' : 'identities[,].connection','title' : 'ID',                  'type': 'text',  'use': true},
        ];

        var vm = this;

        /* Create the base dtOptions instance */
        vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            return $resource('/users/test.data.json').query().$promise;
        }).withDOM('frtip')
            .withPaginationType('full_numbers')
            // Add some buttons for turning on and off column visibility, copying, printing, and csv export
            .withButtons([
                'colvis',
                'copy',
                'print',
                'csvHtml5',
            ]);

        /* Add the ability to filter by column to enhance search capability */
        vm.dtOptions = addColumnFilter(vm.dtOptions);

        /* Create the columns based on the requested list of columns */
        vm.dtColumns = addColumns(DTColumnBuilder);

        /* Create the ability to reload the data and change the token */
        vm.newPromise = newPromise;
        vm.reloadData = reloadData;
        vm.dtInstance = {};

        /* Reload the data using the token and subdomain */
        function newPromise() {
            $scope.showDataTable = true;
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

        /**
         * add the ability to filter each column
         * @param dtOptions
         * @returns {*}
         */
        function addColumnFilter(dtOptions) {
            return dtOptions;
        }

        /**
         * Add the columns from the available options array
         * @param DTColumnBuilder
         */
        function addColumns(DTColumnBuilder) {
            var columns = [];
            for (var i=0; i<$scope.availableOptions.length; ++i)
            {
                if ($scope.availableOptions[i].use == true)
                {
                    columns.push(DTColumnBuilder.newColumn($scope.availableOptions[i]['field']).withTitle($scope.availableOptions[i]['title']).withOption('defaultContent', ''));
                }
            }
            return columns;
        }
    });
