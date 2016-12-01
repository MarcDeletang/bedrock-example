var gulp = require('gulp'),
	watch = require('gulp-watch'),
	inject = require('gulp-inject'),
	batch = require('gulp-batch'),
	minify = require('gulp-minify'),
	concatJS = require('gulp-concat'),
	concatCSS = require('gulp-concat-css'),
	series = require('stream-series'),
	clone = require('gulp-clone')


var pathsToCompile = {
	css: ['./assets/css/**'],
	fonts: ['./assets/fonts/**'],
	libs: ['./assets/js/dependencies/**'],
	javascript: ['./assets/js/**', '!./assets/js/dependencies/**'],
	templates: ['./assets/templates/**'],
	images: ['./assets/images/**'],
	assets: ['./assets/**']
}

var distFolders = {
	assets: 'www/assets',
	fonts: 'www/assets/fonts',
	css: 'www/assets/css',
	javascript: 'www/assets/js',
	javascriptLibs: 'www/assets/js/dependencies',
	views: 'www',
	templates: 'www/templates',
	images: 'www/assets/images'
}

//Watch assets & views folder
//Rebuild on change


var exportWatch = function () {
	watch(pathsToCompile.assets, batch(function (events, done) {
		gulp.start('compileALL', done)
	}))
}

gulp.task('watch', exportWatch)
var exportCompileAll = function () {
	var cloneCss = clone.sink()
	var cloneLib = clone.sink()
	var cloneJs = clone.sink()
		//Get css and clone them
	var cssStream = gulp.src(pathsToCompile.css).pipe(cloneCss)
		//Get js and clone them
	var jsStream = gulp.src(pathsToCompile.javascript).pipe(cloneJs)
	var jsLibStream = gulp.src(pathsToCompile.libs).pipe(cloneLib)

	//Merge streams to the index and inject
	//Use series to keep files in order (ex: split js files)
	gulp.src('./views/index.ejs')
		.pipe(inject(series(cssStream, jsLibStream, jsStream), {
			relative: false
		}))
		.pipe(gulp.dest('./views')) //.pipe(gulp.dest(distFolders.views))

	//Move views to www
	gulp.src(pathsToCompile.templates).pipe(gulp.dest(distFolders.templates))

	//Get clones and move assets to www
	cloneCss.tap().pipe(gulp.dest(distFolders.css))
	cloneLib.tap().pipe(gulp.dest(distFolders.javascriptLibs))
	cloneJs.tap().pipe(gulp.dest(distFolders.javascript))
		//Move images
	gulp.src(pathsToCompile.images).pipe(gulp.dest(distFolders.images))
		//Move fonts
	gulp.src(pathsToCompile.fonts).pipe(gulp.dest(distFolders.fonts))
}
gulp.task('compileALL', exportCompileAll)

//Prod env, add minify & uglify, no need for watcher
//Add bump version in future

var exportProd = function () {
	var cloneCss = clone.sink()
	var cloneLib = clone.sink()
	var cloneJs = clone.sink()

	//Minify css and clone
	var streamCss = gulp.src(pathsToCompile.css)
		.pipe(concatCSS('bundle.css')).pipe(cloneCss)


	var streamJsLib = gulp.src(pathsToCompile.libs)
		.pipe(minify({
			ext: {
				src: '',
				min: '.js'
			},
			exclude: [],
			ignoreFiles: []
		}))
		.pipe(concatJS('libs.js'))
		.pipe(cloneLib)


	//Minify js and clone
	var streamJs = gulp.src(pathsToCompile.javascript)
		.pipe(minify({
			ext: {
				src: '',
				min: '.js'
			},
			exclude: [],
			ignoreFiles: []
		}))
		.pipe(concatJS('all.js'))
		.pipe(cloneJs)

	//Merge streams to the index and inject
	gulp.src('./views/index.ejs')
		.pipe(inject(series(streamCss, streamJsLib, streamJs), {
			relative: false
		}))
		.pipe(gulp.dest('./views')) //.pipe(gulp.dest(distFolders.views))
	cloneCss.tap().pipe(gulp.dest(distFolders.css))
	cloneJs.tap().pipe(gulp.dest(distFolders.javascript))
	gulp.src(pathsToCompile.images).pipe(gulp.dest(distFolders.images))
	cloneLib.tap().pipe(gulp.dest(distFolders.javascript))
}

gulp.task('prod', exportProd)

gulp.task('default', ['watch'])



//Ex: runGlupSync(['prod', 'test'])
function runGulpSync(arr) {
	var next = function () {
		var item = arr.shift()
		if (item) {
			gulp.start(item, next)
		}
	}
	next()
}
module.exports.prod = exportProd
module.exports.watch = exportWatch
module.exports.compileAll = exportCompileAll