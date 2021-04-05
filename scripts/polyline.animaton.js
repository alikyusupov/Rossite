ymaps.ready(['AnimatedLine']).then(init);

function init(ymaps) {
    // Создаем карту.
    var myMap = new ymaps.Map("map", {
        center: [59.92891125791937,30.41147549999996],
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    });
    // Создаем ломаные линии.
    var firstAnimatedLine = new ymaps.AnimatedLine([
        [59.92891125791937,30.41147549999996],
        [59.9339691397919,30.43357888758647],
        [59.96046232777529,30.438565898588518],
        [59.962092564139475,30.46431450000001]
        
    ], {}, {
        // Задаем цвет.
        strokeColor: "#ED4543",
        // Задаем ширину линии.
        strokeWidth: 5,
        // Задаем длительность анимации.
        animationTime: 12000
    });
   /* var secondAnimatedLine = new ymaps.AnimatedLine([
        [55.761223661714205, 37.57854299428123],
        [55.76129474190374, 37.57836060406823],
        [55.76149285834102, 37.57855640532632],
        [55.76173267134118, 37.57864573959325],
        [55.761782872763874, 37.578559582240004],
        [55.7622647306412, 37.57857741008619],
        [55.76247342821094, 37.57840038429122],
        [55.762818964832924, 37.57765342764373],
        [55.76292179998886, 37.57748713068481],
        [55.762890042102114, 37.577167947812036],
        [55.76292179998886, 37.576878269238435],
        [55.763076052212064, 37.57669587902541],
        [55.76309672830313, 37.57723949881904]
    ], {}, {
        strokeColor: "#1E98FF",
        strokeWidth: 5,
        animationTime: 4000
    });*/
    // Добавляем линии на карту.
    myMap.geoObjects.add(firstAnimatedLine);
    //myMap.geoObjects.add(secondAnimatedLine);
    // Создаем метки.
    var firstPoint = new ymaps.Placemark([59.92891125791937,30.41147549999996], {}, {//[59.92891125791937,30.41147549999996]
        preset: 'islands#redRapidTransitCircleIcon'
    });
    /*var secondPoint = new ymaps.Placemark([59.962092564139475,30.46431450000001], {}, {//[59.962092564139475,30.46431450000001]
        preset: 'islands#blueMoneyCircleIcon'
    });*/

    // Функция анимации пути.
    function playAnimation() {
        // Убираем вторую линию.
        //secondAnimatedLine.reset();
        // Добавляем первую метку на карту.
        myMap.geoObjects.add(firstPoint);
        // Анимируем первую линию.
        firstAnimatedLine.animate()
            // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
            /*.then(function() {
                myMap.geoObjects.add(secondPoint);
                return secondAnimatedLine.animate();
            })*/

            // После паузы перезапускаем анимацию.
            .then(function() {
                // Удаляем метки с карты.
                myMap.geoObjects.remove(firstPoint);
                //myMap.geoObjects.remove(secondPoint);
                // Убираем вторую линию.
                //secondAnimatedLine.reset();
                // Перезапускаем анимацию.
                playAnimation();
            });
    }
    // Запускаем анимацию пути.
    playAnimation();
}
