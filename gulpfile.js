const gulp = require('gulp')
const del = require('delete')

gulp.task('build', function (cb) {
  del('lib')

  gulp.src('src/styleJson/*')
    .pipe(gulp.dest('lib/styleJson/'))

  gulp.src('src/ts/**/*')
    .pipe(gulp.dest('lib/ts/'))

  gulp.src('src/index.ts')
    .pipe(gulp.dest('lib/'))

  gulp.src('src/assets/**/*')
    .pipe(gulp.dest('lib/assets/'))
  cb()
})
