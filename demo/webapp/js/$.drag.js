/**
 * jquery与zepto插件：屏蔽鼠标事件与触屏事件差异的底层拖拽类
 * bingzitang@tencent.com
 */
$.drag = function (elem) {
    var $elem = $(elem);
    var dragEvent = new $.drag.Event;
    var startType = $.drag.Event.types.start;
    var noop = function () {};

    var api = {
        onstart: noop,
        onover: noop,
        onend: noop,
        off: function () {
            $elem.off(startType, dragEvent.start);
        }
    };

    dragEvent.onstart = function (event) {
        var width = $elem.width();
        var height = $elem.height();

        var offset = $elem.offset();
        var left = this.startLeft = offset.left;
        var top = this.startTop = offset.top;

        if ($elem.css('position') !== 'absolute') {
            $elem
            .css({
                position: 'absolute',
                width: width + 'px',
                height: height + 'px',
                left: left + 'px',
                top: top + 'px'
            });
        }

        this.clientX = event.clientX;
        this.clientY = event.clientY;

        $elem.addClass('drag-start');
        api.onstart.call(elem, event, left, top);
    };
    

    dragEvent.onover = function (event) {
        var left = event.clientX - this.clientX + this.startLeft;
        var top = event.clientY - this.clientY + this.startTop;
        var style = $elem[0].style;
        style.left = left + 'px';
        style.top = top + 'px';
        
        api.onover.call(elem, event, left, top);
    };
    

    dragEvent.onend = function (event) {
        var position = $elem.position();
        var left = position.left;
        var top = position.top;
        $elem.removeClass('drag-start');
        api.onend.call(elem, event, left, top);
    };


    dragEvent.off = function () {
        $elem.off(startType, dragEvent.start);
    };


    $elem.on(startType, dragEvent.start);

    return api;
};

/** 屏蔽鼠标事件与触屏事件差异的底层拖拽类 */
$.drag.Event = (function () {   

    var $window = $(window);
    var $document = $(document);
    var isTouch = 'createTouch' in document;
    var html = document.documentElement;
    var isIE6 = !('minWidth' in html.style);
    var isLosecapture = !isIE6 && 'onlosecapture' in html;
    var isSetCapture = 'setCapture' in html;


    var types = {
        start: isTouch ? 'touchstart' : 'mousedown',
        over: isTouch ? 'touchmove' : 'mousemove',
        end: isTouch ? 'touchend' : 'mouseup'
    };


    var getEvent = isTouch ? function (event) {
        if (!event.touches) {
            event = event.originalEvent.touches.item(0);
        };
        return event;
    } : function (event) {
        return event;
    };


    var DragEvent = function () {
        this.start = $.proxy(this.start, this);
        this.over = $.proxy(this.over, this);
        this.end = $.proxy(this.end, this);
        this.onstart = this.onover = this.onend = $.noop;
    };

    DragEvent.types = types;

    DragEvent.prototype = {

        start: function (event) {
            event = getEvent(event);
            $document
            .on(types.over, this.over)
            .on(types.end, this.end);
            this.startFix(event);
            this.onstart(event);
            return false;
        },

        over: function (event) {
            event = getEvent(event);
            this.overFix(event);
            this.onover(event);
            return false;
        },

        end: function (event) {
            event = getEvent(event);

            $document
            .off(types.over, this.over)
            .off(types.end, this.end);

            this.endFix(event);
            this.onend(event);
            return false;
        },

        startFix: function (event) {
            this.selectstart = function () {
                return false;
            };

            $document
            .on('selectstart', this.selectstart)
            .on('dblclick', this.end);

            if (isLosecapture) {
                this.target = $(event.target);
                this.target.on('losecapture', this.end);
                isSetCapture && event.target.setCapture();  
            } else {
                $window.on('blur', this.end)
            };
        },

        overFix: function () {
            /*window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection.empty();*/
        },

        endFix: function () {
            $document
            .off('selectstart', this.selectstart)
            .off('dblclick', this.end);

            if (isLosecapture) {
                this.target.off('losecapture', this.end);
                isSetCapture && this.target[0].releaseCapture();
            } else {
                $window.off('blur', this.end);
            };
        }
        
    };

    return DragEvent;
})();