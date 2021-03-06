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
          "chrome-ism/styles/app.css": "chrome-ism/styles/app.less"
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'ism.templates',
          processName: function (filePath) {
            return filePath
              .replace(/(chrome-ism\/templates\/)(\w+)(\.hbs)/, '$2');
          }
        },
        files: {
          'chrome-ism/templates/templates.js' : ['chrome-ism/templates/*.hbs']
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
      all: [
        'Gruntfile.js', 
        'chrome-ism/js/*.js', 
        'chrome-ism/js/app/*.js', 
        'test/*.js'
      ]
    },
    cafemocha: {
      tests: {
        src: 'test/*.js',
        options: {
          ui: 'bdd',
          reporter: 'spec'     
        },
      }
    },
    watch: {
      styles: {
        files: ['chrome-ism/styles/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: ['Gruntfile.js','chrome-ism/js/*.js',
        'chrome-ism/js/app/*.js', 'test/*.js'],
        tasks: ['jshint'],
        options: {
          nospawn: true
        }
      },
      handlebars: {
        files: ['chrome-ism/templates/*.hbs'],
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
  grunt.loadNpmTasks('grunt-cafe-mocha');

  grunt.registerTask('default', [
    'less',
    'handlebars',
    'jshint',
    'cafemocha',
    'watch'
  ]);
};