var gulp = require('gulp');
var pug = require('gulp-pug');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var convertEncoding = require('gulp-convert-encoding');
var ftp = require('vinyl-ftp');
var fs = require('fs');
var gutil = require('gulp-util' );
var watch = require('gulp-watch');

/** Configuration **/
// Funktioniert bei hamburg.de leider nicht, da dort nur ACTIVE mode unterstützt wird. Das kann der node-ftp client aber nicht.
var user = '';
var password = ''; 
var host = 'ftp.mein.hamburg.de';  
var port = 21;  
var localFilesGlob = ['./**/*.html', './**/*.css', './**/*.js'];
var remoteFolder = '/public_html/schoenwasserwerk1'


// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: './dest', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});

gulp.task('styles', function(){
  return gulp.src('src/sass/*.scss')
    .pipe(watch('src/sass/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dest'))
});

gulp.task('views', function build() {
    var structure = JSON.parse(fs.readFileSync('src/structure/wizzard-process-structure.json', 'utf8'));
    var options = {
    pretty: true,
    data: structure
  };
  return gulp.src('src/views/**.pug')
    .pipe(watch('src/views/**.pug'))
//    .pipe(convertEncoding({from: 'utf-8', to: 'iso-8859-1'}))
    .pipe(pug(options))
    .pipe(gulp.dest('dest'));
});

gulp.task('copy1', function () {
    return gulp.src('node_modules/bootstrap/dist/**/*')
      .pipe(gulp.dest('dest'));
});

gulp.task('copy2', function () {
    return gulp.src('node_modules/jquery/dist/**/*')
      .pipe(gulp.dest('dest/js'));
});

gulp.task('copy3', function () {
    return gulp.src('src/img/**/*')
      .pipe(gulp.dest('dest/img'));
});

gulp.task('copy4', function () {
    return gulp.src('src/js/**/*')
      .pipe(gulp.dest('dest/js'));
});

gulp.task('default', function(callback) {
  runSequence('copy1', 'copy2', 'copy3', 'copy4', ['views', 'styles'], callback);
});