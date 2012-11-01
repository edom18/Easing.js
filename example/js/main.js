(function (win, doc, exports) {

    'use strict';

    function main() {

        var begin    = 100,
            finish   = 220,
            change   = finish - begin,
            duration = 30,
            time     = 0,

            //create easing.
            easing = new Easing('easeInCubic', time, begin, change, duration);

        (function loop() {

            var val = easing.getValue();

            if (val === null) {
                return false;
            }

            console.log(val);

            setTimeout(loop, 1000 / 60);
        }());
    }

    //export
    exports.main = main;

}(window, document, window));
