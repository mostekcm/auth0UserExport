angular.module( 'auth0UserExport.users.configure', [
        'auth0',
        'ngResource',
    ])
    .controller( 'UsersConfigureCtrl', function UsersConfigureCtrl( $scope, auth, $resource, store ) {

        $scope.auth = auth;
        $scope.newCustomFieldName = '';

        $scope.addNewAvailableOption = function() {
            if (!$scope.newCustomFieldName) {
                alert("Bad custom field name");
                return;
            }
            newOption = {
                field: $scope.newCustomFieldName,
                title: $scope.newCustomFieldName,
                type: "text",
                use: true,
            }
            $scope.availableOptions.unshift(newOption);
        }

        /* Reload the data, setting the new promise first */
        $scope.testData = function () {
            /* Hide the table */
            $scope.userConfigModel.error = '';
            $scope.userConfigModel.showDataTable = false;
            /* Make a small query to test the query info, and check for errors */
            $scope.getResource(false).then(
                function (users) {
                    /* show the table */
                    $scope.userConfigModel.showDataTable = true;
                    $scope.userConfigModel.readyInfo = 'Table is Ready to View'
                },
                function (error) {
                    $scope.userConfigModel.showDataTable = false;
                    $scope.userConfigModel.error = error;
                });
        }
    });
