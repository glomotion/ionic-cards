/*
 * Stacker - [description needed]
 *
 * Copyright (c) 2013 Jude Osborn
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  1.0.0
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.stacker = function(options) {
        
        var elements = this.children();
        var gutter = parseInt($(elements[0]).css('margin-right'));
        var $container = this.closest('#scroller');
        var settings = {
            threshold: 0,
            container: $container,
            throttle: 300
        };

        function update() {
            var left = 0;
            var top = 0;
            var columns = 1;

            elements.each(function(index) {
                
                var total = elements.length;
                var $this = $(this);

                if (!$this.is(":visible")) {
                    return;
                }

                var height = $this.outerHeight(true);
                var width = $this.outerWidth(true);

                if (top + height > $container.height()) {
                    left += width;
                    top = 0;
                    columns ++;
                }

                $this.css({
                    "transform" : "translate3d(" + left + "px, " + top + "px,0)"
                });
                
                top += height;

                if (index === total - 1) {
                    // this is the last block to be stacked
                    containerWidth = (columns * width) - gutter; // minus the gutter width from the last column
                    $container.width(containerWidth);
                }

            });
        }

        if (options) {
            $.extend(settings, options);
        }

        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        this.each(function() {
            var self = this;
            var $self = $(self);
        });


        $window.resize($.throttle(50, function(event) {
            update();
        }));

        update();

        return this;
    };

})(jQuery, window, document);