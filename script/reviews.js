$(document).ready(function() {
    // slideshow automatisch wisselen
    var autoSwap = setInterval(swap, 3500);

    // pauzeer slideshow bij hover en hervat bij mouseout
    $('#reviews-carousel ul.carousel, #reviews-carousel span').hover(
        function () { clearInterval(autoSwap); },
        function () { autoSwap = setInterval(swap, 3500); }
    );

    // globale variabelen
    var items = [];
    var startItem = 1;
    var position = 0;
    var itemCount = $('#reviews-carousel .carousel li.items').length;
    var resetCount = itemCount;

    // optioneel: teksten verzamelen indien nodig
    $('#reviews-carousel li.items').each(function(index) {
        items[index] = $(this).text();
    });

    // wissel functie
    function swap(direction) {
    var next, left, right, back;

    if (direction === 'counter-clockwise') {
        next = startItem - 1;
        if (next < 1) next = itemCount;
    } else {
        next = startItem + 1;
        if (next > itemCount) next = 1;
    }

    left = next - 1 < 1 ? itemCount : next - 1;
    right = next + 1 > itemCount ? 1 : next + 1;

    // Reset alle posities
    $('#reviews-carousel .carousel li').removeClass('main-pos left-pos right-pos back-pos');

    // Stel nieuwe posities in
    $('#' + next).addClass('main-pos');
    $('#' + left).addClass('left-pos');
    $('#' + right).addClass('right-pos');

    // Zet alle overige op back-pos
    for (var i = 1; i <= itemCount; i++) {
        if (i !== next && i !== left && i !== right) {
            $('#' + i).addClass('back-pos');
        }
    }

    startItem = next;
}
    // klik functionaliteit om handmatig te wisselen
    $('#reviews-carousel .carousel li').click(function() {
        if ($(this).hasClass('left-pos')) {
            swap('counter-clockwise');
        } else if ($(this).hasClass('right-pos')) {
            swap('clockwise');
        }
    });
});
