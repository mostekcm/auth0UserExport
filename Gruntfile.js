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
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['sass','bower','uglify','cssmin']);
}