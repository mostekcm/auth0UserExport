angular.module( 'auth0UserExport.users.table', [
        'auth0',
        'datatables',
        'ngResource',
        'datatables.buttons',
        'datatables.columnfilter'
    ])
    .controller( 'UsersTableCtrl', function UsersTableController( $scope, auth, $resource, store, DTOptionsBuilder, DTColumnBuilder ) {

        $scope.auth = auth;

        var vm = this;
        setOptionsAndColumns();

        function setOptionsAndColumns() {
            /* Create the base dtOptions instance */
            vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
                    return $scope.getResource(true);
                })//.withDOM('Bfrtip')
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
            vm.dtColumns = addColumns();

            /* TODO: If we want to reload later => Create the ability to reload the data and change the token
            vm.dtInstance = {};
            vm.newPromise = newPromise;
            vm.reloadData = reloadData; */
        }

        /**
         * add the ability to filter each column
         * @param dtOptions
         * @returns {*}
         */
        function addColumnFilter(dtOptions) {
            var filters = [];
            for (var i=0; i<$scope.availableOptions.length; ++i) {
                if ($scope.availableOptions[i].use) {
                    var filter = {type: $scope.availableOptions[i]['type']};
                    if ($scope.availableOptions[i]['type'] == 'text') {
                        filter.bRegex = true;
                        filter.bSmart = true;
                    }
                    filters.push(filter);
                }
            }
            return dtOptions.withColumnFilter({
                //sPlaceHolder: "head:after",
                aoColumns: filters
            });
        }

        /**
         * Add the columns from the available options array
         * @param DTColumnBuilder
         */
        function addColumns() {
            var columns = [];
            var colId = 0;
            for (var i=0; i<$scope.availableOptions.length; ++i)
            {
                if ($scope.availableOptions[i].use)
                {
                    columns.push(DTColumnBuilder.newColumn($scope.availableOptions[i]['field']).withTitle($scope.availableOptions[i]['title']).withOption('defaultContent', ''));
                }
            }
            return columns;
        }
    });
