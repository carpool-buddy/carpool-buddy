var dest = "./public";
var src = './app';

module.exports = {
  javascript: {
    src: src + '/js/client.js',
    dest: dest + '/',
    packedFile: 'bundle.js'
  },
  sass: {
    src: src + "/styles/**/*.{sass,scss}",
    dest: dest + '/styles/',
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
    }
  },
  fonts: {
      src: src + '/styles/fonts/*',
      dest: dest + "/styles/fonts/",
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },
  // index: {
  //   src: src + "/index.html",
  //   dest: dest
  // },
  images: {
      src: src + '/imgs/*',
      dest: dest + '/imgs',
      extensions: ['jpg', 'png', 'svg', 'gif']
   },
  html: {
    src: src + "/**/*.html",
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
