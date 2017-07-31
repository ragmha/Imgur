const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');
const reactify = require('reactify');
const notifier = require('node-notifier');
const server = require('gulp-server-livereload');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

const notify = error => {
  let message = 'In: ';
  let title = 'Error: ';

  if (error.description) title += error.description;
  else if (error.message) title += error.message;

  if (error.filename) {
    let file = error.filename.split('/');
    message += file[file.length - 1];
  }

  if (error.lineNumber) message += '\nOn Line: ' + error.lineNumber;

  notifier.notify({ title: title, message: message });
};

const bundler = watchify(
  browserify({
    entries: ['./src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
  })
);

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'));
}

bundler.on('update', bundle);

gulp.task('build', () => bundle());

gulp.task('serve', done => {
  gulp.src('').pipe(
    server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if (/main.js/.test(filePath)) {
            cb(true);
          } else if (/style.css/.test(filePath)) {
            cb(true);
          }
        },
      },
      open: true,
    })
  );
});

gulp.task('sass', () => {
  gulp
    .src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'serve', 'sass', 'watch']);

gulp.task('watch', () => gulp.watch('./sass/**/*.scss', ['sass']));
