module.exports = function (grunt) {

    // configure the tasks
    grunt.initConfig({
        bower: {
            dev: {
                dest: 'public/bower/full',
                options: {
                    keepExpandedHierarchy: false,
                }
            },
        },

        uglify: {
            libs: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/bower/full',
                        src: '**/*.js',
                        dest: 'public/bower/min'
                    }
                ]
            }
        },

        /* Not sure how to get heroku to build this for us, copied manually for now and checked in buttons.css
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/datatables-buttons/css',
                    src: ['buttons.dataTables.scss'],
                    dest: 'public/bower/min',
                    ext: '.css'
                }]
            }
        },
         */

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/bower/full',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/bower/min',
                    ext: '.min.css'
                }]
            }
        },

    });

    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // see above heroku issue: grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['bower','uglify','cssmin']);
}