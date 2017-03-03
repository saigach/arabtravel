(function($){

    $.fn.extend({
        stickyAffix: function(options) {
            var defaultOptions = {
                offsetTop: 0,
                offsetBottom: 0,
                stopOnBottom: true
            };

            options = $.extend({}, defaultOptions, options);

            return $(this).each(function() {
                var obj = $( this ),
                    closestRow = obj.closest('.row');
                var fromTop = obj.offset().top;
                if(options.stopOnBottom) {
                    stopOn = function() { return $( document ).height() - (closestRow.offset().top + closestRow.height() ) + options.offsetBottom; };
                }
                else stopOn = false;

                obj.affix({
                  offset: {
                    top: fromTop + options.offsetTop,
                    bottom: stopOn
                  }
                }).css('width', obj.parent().width());

                $('.collapse', obj).on('shown.bs.collapse', function (e) {
                    obj.affix('checkPosition');
                });

                $(window).resize(function() {
                    obj.css('width', obj.parent().width()).affix('checkPosition');
                });
            });
        }
    });

})(jQuery);

$(window).on('load', function() {

    $(".owl-carousel").owlCarousel({
      items:1,
      nav: true,
      loop: true,
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
    });
	


});

$(document).ready(function() {

    //var s = skrollr.init();

	var slideshow = UIkit.slideshow($('#main-page-carousel')[0], {autoplay:true, kenburns: true, autoplayInterval: 5000, pauseOnHover: false });


    if($('#hww-graphics').length > 0) {
        (function() {
            var $container = $('#hww-graphics');
            var $bar = $('#hww-graphics_progress');
            var $items = $('.hww-graphics_item');
            var w = 0;
            var offsetTop = 0.2 * $(window).height();
            var offsetBottom = 0.2 * $(window).height();
            var itemsCounter = 0;

            var scrollMe = function() {

                if (($(window).scrollTop()+$(window).height()) >= ($container.offset().top + offsetTop) &&
                    ($(window).scrollTop() <= ($container.offset().top - offsetBottom))) {
                    startPoint = $container.offset().top + offsetTop;
                    endPoint = $container.offset().top - offsetBottom + $(window).height();
                    delta = $(window).height() - offsetTop - offsetBottom;
                    curPos = $(window).scrollTop()+$(window).height() - startPoint;

                    w = Math.ceil(100 * curPos / delta);

                    $bar.css('width', w + '%');
                    console.log(w);
                    $items.eq(itemsCounter).addClass('active');
                    if (Math.floor(w / 33) != itemsCounter) {
                        itemsCounter = Math.floor(w / 33);
                        $items.eq(itemsCounter).addClass('active');
                        if(itemsCounter < 3) $items.slice(itemsCounter).removeClass('active');
                    }
                }

            }

            scrollMe();

            $(window).on('scroll', scrollMe);


        })();
    }

    orderFormInitUi();
});

function orderFormInitUi() {
    $('#card-number').mask('0000-0000-0000-0000');
    $('#cvv').mask('000');
}
