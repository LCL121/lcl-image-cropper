const gulp = require('gulp')
const del = require('delete')
const exec = require('child_process').exec

gulp.task('buildcss', function (cb) {
  del('lib/css/lcl-image-cropper.css.js')

  gulp.src('dist/lcl-image-cropper.css.js')
    .pipe(gulp.dest('lib/css/'))
  cb()
})

gulp.task('buildts', function (cb) {
  exec('tsc', function (err) {
    if (err) {
      console.log(err)
    }
    del('lib/js/')
    del('lib/styleJson')
    del('lib/index.js')

    gulp.src('ts2js/styleJson/*')
      .pipe(gulp.dest('lib/styleJson/'))

    gulp.src('ts2js/ts/**/*')
      .pipe(gulp.dest('lib/js/'))

    gulp.src('ts2js/index.js')
      .pipe(gulp.dest('lib/'))
    cb()
  })
})

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
