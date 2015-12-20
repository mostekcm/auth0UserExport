angular.module( 'auth0UserExport.users', [
        'auth0',
        'ngResource',
    ])
    .controller( 'UsersParentCtrl', function UsersParentController( $scope, auth, $resource, store ) {

        $scope.auth = auth;
        $scope.userConfigModel = {
            subdomain: 'beautyfullday',
            token: 'fake_token',
            error: '',
            filter: '',
            readyInfo: 'not tested yet on configuration page',
            showDataTable: false,
        };

        /* Setup the default set of columns available in human readable format for easy editing if desired */
        $scope.availableOptions = [
            { 'field' : 'user_id',                 'title' : 'ID',                  'type': 'text',  'use': true},
            { 'field' : 'name',                    'title' : 'Name',                'type': 'text',  'use': true},
            { 'field' : 'given_name',              'title' : 'First Name',          'type': 'text',  'use': true},
            { 'field' : 'family_name',             'title' : 'Last Name',           'type': 'text',  'use': true},
            { 'field' : 'email',                   'title' : 'Email',               'type': 'text',  'use': true},
            { 'field' : 'email_verified',          'title' : 'Email Verified',      'type': 'text',  'use': true},
            { 'field' : 'last_login',              'title' : 'Last Login',          'type': 'text',  'use': true},
            { 'field' : 'logins_count',            'title' : 'Number of Logins',    'type': 'number','use': true},
            { 'field' : 'app_metadata.roles[,]',   'title' : 'Roles',               'type': 'text',  'use': true},
            { 'field' : 'identities[,].connection','title' : 'Connection',          'type': 'text',  'use': true},
            { 'field' : 'identities[,].user_id',   'title' : 'Connection ID',       'type': 'text',  'use': false},
            { 'field' : 'identities[,].provider',  'title' : 'Connection Provider', 'type': 'text',  'use': false},
            { 'field' : 'identities[,].isSocial',  'title' : 'Connection Is Social','type': 'text',  'use': false},
            { 'field' : 'nickname',                'title' : 'Nickname',            'type': 'text',  'use': false},
            { 'field' : 'gender',                  'title' : 'Gender',              'type': 'text',  'use': false},
            { 'field' : 'locale',                  'title' : 'Locale',              'type': 'text',  'use': false},
            { 'field' : 'updated_at',              'title' : 'Updated At',          'type': 'text',  'use': false},
            { 'field' : 'created_at',              'title' : 'Created At',          'type': 'text',  'use': false},
        ];

        /**
         * Reusable function.  Allows you to get a promise back for a query against the upstream service.
         * @param allUsers True if you want all users returned, otherwise, just returns one
         * @returns {*}
         */
        $scope.getResource = function (allUsers) {
            var data = {};
            if ($scope.userConfigModel.filter) {
                data.q = $scope.userConfigModel.filter;
                data.search_engine = 'v2';
            }
            if (!allUsers) {
                data.per_page = 1;
                data.page = 1;
            }
            return $resource('https://' + $scope.userConfigModel.subdomain + '.auth0.com/api/v2/users', data,
                {
                    query: {
                        isArray: true,
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + $scope.userConfigModel.token
                        }
                    }
                }).query().$promise;
        }

    });
