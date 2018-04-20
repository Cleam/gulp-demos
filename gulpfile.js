var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-ruby-sass')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')

/* =================================
  demo1
 ================================= */
// gulp.task('browser-sync', function () {
//   browserSync.init({
//     server: {
//       baseDir: './src/'
//     }
//   })
// })

// gulp.task('default', ['browser-sync'])

/* =================================
  demo2
 ================================= */
// gulp.task('serve', ['sass'], function() {
//   browserSync.init({
//     server: {
//       baseDir: './src/'
//     }
//   })
//   gulp.watch('./src/scss/*.scss', ['sass'])
//   gulp.watch('./src/*.html').on('change', browserSync.reload)
// })

// gulp.task('sass', function(){
//   return gulp.src('./src/scss/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./src/css'))
//     .pipe(browserSync.stream())
// })

// gulp.task('default', ['serve'])

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './src'
  })
  gulp.watch('src/scss/*.scss', ['sass'])
  gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('sass', () => {
  return sass('src/scss/*.scss', {sourcemap: true})
    .on('error', function (err) {
      console.error('Error!', err.message)
    })
    .pipe(sourcemaps.write('./', {
      includeContent: false,
      sourceRoot: 'src/scss'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream({match: '**/*.css'}))
})

gulp.task('default', ['serve'])
