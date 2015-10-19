var dest = "./public";
var src = './app';

module.exports = {
  // javascript: {
  //   src: src + '/js/**/*.js',
  //   dest: dest + '/js/',
  //   entryPoint: src + '/app/entry.js',
  //   packedFile: 'packed.js'
  // },
  sass: {
    src: src + "/styles/**/*.{sass,scss}",
    dest: dest + '/styles/css/',
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
    }
  },
  fonts: {
      src: src + '/styles/fonts/*',
      dest: dest + "/styles/fonts/",
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },
  index: {
    src: src + "/index.html",
    dest: dest
  },
  html: {
    src: src + "/app/**/*.html",
    dest: dest
  },
  server: {
    src: dest,
    livereload: false,
    directoryListing: false,
    open: false,
    port: 9000
  },
  // ngConfig: {
  //   dest: dest + '/js',
  // },
  production: {
    cssSrc: dest + '/styles/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
