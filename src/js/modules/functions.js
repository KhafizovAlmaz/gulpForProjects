export function isWebp() { 
    function testWebP(callback) {
        // Проверка поддержки WEBP 
        let webP = new Image();
        webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    //Добавление классов .webp иди .no-webp для html 
    testWebP(function (support) {

        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
        });
}