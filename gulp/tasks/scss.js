import dartSass from "sass"; //Основной модуль
import gulpSass from "gulp-sass"; // Плагин для sass
import rename from "gulp-rename"; // Переименовывание файла
import GulpCleanCss from "gulp-clean-css"; // Сжатие CSS файла
import webpCss from "gulp-webpcss"; // Вывод WEBP изображений 
import autoPrefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(
        app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            webpCss({
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            })
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            autoPrefixer({
                grid: true,
                overrideBrowserlist: ["last 3 versions"],
                cascade: true
            })
        )
    )
    // Раскомментировать, если нужен не сжатый дубль файла стилей
     .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
        app.plugins.if(
            app.isBuild,
            GulpCleanCss()
        )
    )
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}