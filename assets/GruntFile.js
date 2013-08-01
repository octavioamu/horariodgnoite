module.exports = function(grunt) {
     var project_files = [
            'js/main.js'
        ],
        plugins_files = [
            'js/plugins/*.js'
        ],
        uglify_files = plugins_files.concat(project_files);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            site: {
                files: {
                    'css/style.css': 'less/application.less'
                },
                options: {
                    yuicompress: true
                }
            }
        },
        jshint: {
            files: project_files,
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                },
                bitwise: true,
                expr: true
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.projectName %> - v<%= pkg.version %> - by <%= pkg.developer %> - <%= grunt.template.today("dd/mm/yyyy") %> */\n',
                mangle: {
                    except: ['jQuery', 'Backbone']
                }
            },
            js: {
                files: {
                    'js/site.min.js': uglify_files
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    '!js/site.min.js',
                    '!js/lib/*.js',
                    'js/*.js',
                    'js/plugins/*.js'
                ],
                tasks: ['jshint', 'uglify']
            },
            css: {
                files: [
                    'less/**/*.less',
                    'less/*.less'
                ],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['less', 'watch']);
};
