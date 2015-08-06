'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        // Configurable paths
        config: {
            lintFiles: [
                '**/*.js'
            ]
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= config.lintFiles %>'
            ]
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: '<%= config.lintFiles %>'
        }
    });

    grunt.registerTask('lint', [
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('test', [
        'lint'
    ]);
};
