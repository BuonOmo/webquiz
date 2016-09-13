var gulp        = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './html/'
    }
  });
  gulp.watch('./html/**.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
