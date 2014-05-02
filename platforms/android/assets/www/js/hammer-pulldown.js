/**
 * Vertical pull-to-refresh
 * @param ev: the full event instance
 */
function PullDown(element, pullDownElement) {
    
    var self = this;

    // some misc global vars that can update (switches mostly)
    var pullDownMode, translateAmount, lockedIn;
    var offset = 0;

    // establish some fixed variables (basic settings)
    var TIMEOUT_VAL = 220;
    var BREAKPOINT = 75;
    var LOCK_OFFSET = 165;
    var TRANSLATE_RATIO = .4;
    var THROTTLE = 50;

    // create the JQ dom objects that we'll be operating on
    var $element = element;
    var $pulldown = pullDownElement;
    var $container = element.closest('body');
    
    /**
     * initialise
     */
    this.init = function() {
    };

    this.vertPullHandler = function(ev) {

        // stop browser scrolling
        // fixes much flakyness on Clank...
        ev.gesture.preventDefault();
        
        switch(ev.type) {

            // on release we check how far we dragged + reset if no mode change is present
            case 'release':
                rAF(function(){
                    // 'animate' class is used for css animation smoothness
                    $container.addClass('animate');
                    // reset all translation values first up...
                    $element.css({
                        "transform" : "translate3d(0,0,0)"
                    });
                    // if pullDownMode has been triggered, change into 'pull-down' mode
                    if (pullDownMode) {
                        $pulldown.attr('data-percent','100');
                        $container.addClass('pulldown-mode');
                        $element.css({
                            "transform" : "translate3d(0," + LOCK_OFFSET + "px,0)"
                        });
                        lockedIn = true;
                    } else {
                        // otherwise, reset the mode
                        self.resetMode();
                    }
                    // once css transitions are complete, remove the class that enables them.
                    setTimeout(function() {
                        $container.removeClass('animate');
                    }, TIMEOUT_VAL);
                });
                break;


            // when we dragdown
            case 'dragdown':           
                rAF(function(){
                    // capture the basic gesture movement, and refine it for use in the UI
                    translateAmount = ev.gesture.deltaY * TRANSLATE_RATIO;
                    // have we dragged enough already to trigger 'pull-down' mode?
                    if (translateAmount >= BREAKPOINT) {
                        // trigger 'pull-down' mode
                        pullDownMode = true;
                    }
                    // are we already in 'pull-down' mode?
                    // if so, we need to alter the 'translateAmount' a little...
                    if (lockedIn) {
                        // temporarily disable pulldown mode and allow dragging
                        $container.removeClass('pulldown-mode');
                        // global offset value ensures that we start translating from where we are supposed to
                        if (offset === 0) {
                            offset = LOCK_OFFSET;
                        }
                        translateAmount = ev.gesture.deltaY * TRANSLATE_RATIO + offset;
                        if (translateAmount >= BREAKPOINT) {
                            pullDownMode = true;
                        }
                    } else {
                        // we're not in 'pull-down' mode, so animate the distance left until the 'breakpoint'
                        var percentComplete = (100 / BREAKPOINT) * translateAmount - 4;
                        if (percentComplete <= 101 && percentComplete > 0) {
                            // animate thru the percentage levels, in increments of 10
                            $pulldown.attr('data-percent',Math.round(percentComplete / 10) * 10);
                        }
                    }
                    // finally, apply calculated 'translationAmount', as a 3d transform (butter smooth)...
                    $element.css({
                        "transform" : "translate3d(0," + translateAmount + "px,0)"
                    });
                });
                break;


            // when we dragup
            case 'dragup':
                rAF(function(){
                    translateAmount = ev.gesture.deltaY * TRANSLATE_RATIO;
                    if (translateAmount <= BREAKPOINT) {
                        pullDownMode = false;
                    }
                    if (lockedIn) {
                        // temporarily disable pulldown mode and allow dragging
                        $container.removeClass('pulldown-mode');
                        translateAmount = ev.gesture.deltaY * TRANSLATE_RATIO + LOCK_OFFSET;
                    } else {
                        // calculate current drag progress as a percentage
                        var percentComplete = (101 / BREAKPOINT) * translateAmount;
                        if (percentComplete <= 100 && percentComplete > 0) {
                            // animate thru the animation
                            $pulldown.attr('data-percent',Math.round(percentComplete / 10) * 10);
                        }
                    }
                    // final check to see if we have dragged up enough to cancel 'pull-down' mode
                    if (translateAmount <= BREAKPOINT) {
                        pullDownMode = false;
                    }
                    // finally, apply calculated 'translationAmount', as a 3d transform (butter smooth)...
                    $element.css({
                        "transform" : "translate3d(0," + translateAmount + "px,0)"
                    });
                });
                break;
        }

    };

    // generic reset function, clears 'pull-down' mode, and restores the app to normal
    this.resetMode = function() {
        $element.css({
            "transform" : "translate3d(0,0,0)"
        });
        $container.removeClass('pulldown-mode').addClass('animate');
        pullDownMode = false;
        lockedIn = false;
        offset = 0;
        $pulldown.attr('data-percent','0');
        setTimeout(function() {
            $container.removeClass('animate');
        }, TIMEOUT_VAL);
    };

    var pulldownListener = new Hammer($element[0], { dragLockToAxis: true }).on("touch dragdown dragup release", self.vertPullHandler);
    // a simple cancel button
    var cancelButton = new Hammer($pulldown.find('.cancel')[0]).on("tap", function() {
        self.resetMode();
    });
}


/**
* super simple carousel
* animation between panes happens with css transitions
*/
function Carousel(element) {
    
    var self = this;

    var $element = $(element);
    var $container = $(">ul", $element);
    var $panes = $(">ul>li", $element);

    var pane_width = 0;
    var pane_count = $panes.length;

    var current_pane = 0;

    /**
     * initial
     */
    this.init = function() {
        
        this.setPaneDimensions();

        // $element.hammer().on('release dragleft dragright swipeleft swiperight', function(ev) {
        //     self.horizPullHandler(ev);  
        // });

        $(window).on("load resize orientationchange", function() {
            self.setPaneDimensions();
        });
    };

    /**
     * set the pane dimensions and scale the container
     */
    this.setPaneDimensions = function() {
        pane_width = $element.width();
        $panes.each(function() {
            $(this).width(pane_width);
        });
        $container.width(pane_width*pane_count);
    };


    /**
     * show pane by index
     */
    this.showPane = function(index, animate) {
        // between the bounds
        index = Math.max(0, Math.min(index, pane_count-1));
        current_pane = index;

        var offset = -((100/pane_count)*current_pane);
        this.setContainerOffset(offset, animate);
    };


    this.setContainerOffset = function(percent, animate) {
        $container.removeClass("animate");

        if(animate) {
            $container.addClass("animate");
        }

        $container.css({
            "transform" : "translate3d("+ percent +"%,0,0)"
        });
    }

    this.next = function() { return this.showPane(current_pane+1, true); };
    this.prev = function() { return this.showPane(current_pane-1, true); };

    this.horizPullHandler = function(ev) {

        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                var pane_offset = -(100/pane_count)*current_pane;
                var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if((current_pane == 0 && ev.gesture.direction == "right") ||
                    (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                    drag_offset *= .4;
                }

                self.setContainerOffset(drag_offset + pane_offset);
                break;

            case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                // more then 50% moved, navigate
                if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
                    if(ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                }
                else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }
}

