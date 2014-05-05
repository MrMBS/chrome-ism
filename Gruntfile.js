module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "styles/app.css": "styles/app.less"
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'ism.templates',
          processName: function (filePath) {
            return filePath.replace(/(templates\/)(\w+)(\.hbs)/, '$2');
          }
        },
        files: {
          'templates/templates.js' : ['templates/*.hbs']
        }
      }
    },
    jshint: {
      options:{
        maxlen: 80,
        camelcase: true,
        forin: true,
        immed: true,
        indent: 2,
        '-W030': true,
        '-W018': true
      },
      all: ['Gruntfile.js', 'js/*.js', 'js/app/*.js', 'test/*.js']
    },
    watch: {
      styles: {
        files: ['styles/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: ['Gruntfile.js','js/*.js','js/app/*.js', 'test/*.js'],
        tasks: ['jshint'],
        options: {
          nospawn: true
        }
      },
      handlebars: {
        files: ['templates/*.hbs'],
        tasks: ['handlebars'],
        options: {
          nospawn: true
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'less',
    'handlebars',
    'jshint',
    'watch'
  ]);
};