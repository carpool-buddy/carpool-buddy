// leanModal v1.1 by Ray Stone - http://finelysliced.com.au
// Dual licensed under the MIT and GPL

// HEAVILY modified for Mently by NJM 20150929

(function($){
    var $overlay = null,
        $window = null;

    function initPlugin() {
        if (!$overlay)
        {
            $overlay = $("<div id='lean_overlay'></div>");
            $("body").append($overlay);
        }

        if (!$window)
        {
            $window = $(window);
        }
    }

    $.fn.extend({
        leanModal: function(options) {
            initPlugin();

            var defaults = {
                    overlay: 0.5,
                    closeButton: null,
                    minTop: 0,
                    minLeft: 0
                };

            options = $.extend(defaults, options);

            return this.each(function() {

                var o = options;

                $(this).click(function(e) {

                    var modal_id = $(this).attr("href"),
                        $modal = $(modal_id),
                        resizeDebouncer = debounce(_resize, 10);

                    $overlay.on('click', close_modal);
                    $(o.closeButton).on('click', close_modal);
                    $window.on('resize', resizeDebouncer);

                    var modal_width  = $modal.outerWidth();

                    $overlay.css({ 'display' : 'block', opacity : 0 })
                            .fadeTo(200,o.overlay);

                    _resize();
                    $modal.css({
                        'display' : 'block',
                        'position' : 'fixed',
                        'opacity' : 0,
                        'z-index': 11000,
                        'left' : 50 + '%',
                        'top': 50 + '%'
                    }).fadeTo(200,1);

                    e.preventDefault();


                        // note that this will NOT work for multiple
                        // levels of modals, but that's okay for our purposes.
                        // --NJM 20150929
                    function close_modal() {
                        $overlay.fadeOut(200);
                        $modal.css({ 'display' : 'none' });

                        $overlay.off('click', close_modal);
                        $(o.closeButton).off('click', close_modal);
                        $window.off('resize', resizeDebouncer);

                    }

                    function _resize() {
                        var modal_height = $modal.outerHeight(),
                            modal_width  = $modal.outerWidth(),
                            win_height   = $window.height(),
                            win_width    = $window.width();

                        if (((win_height - modal_height) / 2) < o.minTop)
                            $modal.css('margin-top', -(win_height / 2) + o.minTop);
                        else
                            $modal.css('margin-top', -(modal_height) /2);

                        if (((win_width - modal_width) / 2) < o.minLeft)
                            $modal.css('margin-left', -(win_width / 2) + o.minLeft);
                        else
                            $modal.css('margin-left', -(modal_width) / 2);
                    }
                });

            });
        }
    });
})(jQuery);
