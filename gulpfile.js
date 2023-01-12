import  gulp from "gulp";
// Импорт путей 
import { path } from "./gulp/config/path.js"; 

// Импорт задач 
import { copy } from "./gulp/tasks/copy.js"; 
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svg.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Импорт плагинов
import { plugins } from "./gulp/config/plugins.js"; 



global.app = { //Передаем значения в глобальную переменную
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

function watcher() { //Наблюдатель за изменениями в файлах
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html); //gulp.series(html, ftp)
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive } 

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle); // Последовательная обработка шрифтов

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images)); // Основыне задачи

//Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp); 

//Экспорт сценариев
export { dev }
export { build } 
export { deployZIP } 
export { deployFTP } 

gulp.task('default', dev); // Выполнение сценария по умолчанию