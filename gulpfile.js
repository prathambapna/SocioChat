// const gulp=require('gulp');

// //follow below syntax for importing gulp
// const sass = require('gulp-sass')(require('node-sass'));
// const cssnano=require('gulp-cssnano');
// const rev=require('gulp-rev');
// const imagemin=require('gulp-imagemin');
// const uglify=require('gulp-uglify-es').default;
// const del=require('del');





// //final code for css is this.
// gulp.task('css', (done) => {
//     console.log('Minifying CSS');
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'));
//     console.log('Minified CSS');
//     gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//     cwd:'public',
//     merge: true
// })).pipe(
// gulp.dest('./public/assets')
// );
// done();
// })


// gulp.task('js', function(done){
//     console.log('minifying js...');
//      gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done()
// });


// gulp.task('images', function(done){
//     console.log('compressing images...');
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// // empty the public/assets directory
// gulp.task('clean:assets', function(done){
//     //Use the below syntax for forcefully deleting the already available files.
//     del.sync(['./public/assets'], { force:true });
//     done();
// });

// gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
//     console.log('Building assets');
//     done();
// });