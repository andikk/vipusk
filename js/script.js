// Touch for ios devices
document.addEventListener("touchstart", function () {}, false);

$(document).ready(function () {

    // Таймер
    var date = new Date();
    date = new Date(2020, 05, 27, 14, 00);

    $('.countdown').countdown({
        until: date,
        format: 'dHM',
        layout: '<div class="timer-item">' +
            '<div class="timer-count"><span>{d10}</span><span>{d1}</span></div>' +
            // '<div class="timer-text">дни</div>' +
            '</div>' +
            '<span class="dots"></span>' +
            '<div class="timer-item">' +
            '<div class="timer-count"><span>{h10}</span><span>{h1}</span></div>' +
            // '<div class="timer-text">часы</div>' +
            '</div>' +
            '<span class="dots"></span>' +
            '<div class="timer-item">' +
            '<div class="timer-count"><span>{m10}</span><span>{m1}</span></div>' +
            // '<div class="timer-text">минуты</div>' +
            '</div>',
            alwaysExpire: true,
            onExpiry: function() {
                $(this).closest('.timer-wrap').hide();
                $('.countdown-finished').show();
            },
    });

    $('#modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var name = button.data('name');
        var desc = button.data('desc');
        var img = button.data('img');
        var modal = $(this);
        console.log(img);
        modal.find('.modal-title').text(name);
        modal.find('.modal-body .modal-img').attr('src', img);
        modal.find('.modal-body .modal-desc').text(desc);
    })

});

// Карта
var myMap;

ymaps.ready(init);

function init() {
    myMap = new ymaps.Map('map', {
        center: [64.80,95.50],
        zoom: 3
    }, {
        searchControlProvider: 'yandex#search'
    },

    objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 100,
        clusterDisableClickZoom: false
    })
    );

    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set({'preset': 'islands#greenClusterIcons'});
    myMap.geoObjects.add(objectManager);

    $.ajax({
        url: "http://vypusknoy2020.test/package.json"
    }).done(function(data) {
        objectManager.add(data);
    });

    if ($(window).width() < 1200) {
        myMap.behaviors.disable(['scrollZoom', 'drag']);
    } else {
        myMap.behaviors.disable(['scrollZoom']);
    }

}
