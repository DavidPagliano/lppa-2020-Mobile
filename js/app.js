(function mobile() {
    'use strict';
    window.addEventListener('lood', init, false);
    var canvas = null, ctx = null;
    var touches = [];
    var COLORS = ['#f00', '#0f0', '#00f', '#fff'];

    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContex('2d');
        canvas.width = 200;
        canvas.height = 300;

        canvas.style.position = 'fixed';
        canvas.style.top = '0';

        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        enableInputs();
        resize();
        run();
    }

    function resize() {
        if (window.innerWidth > innerHeight) {
            canvas.width = 300;
            canvas.height = 200;
        } else {
            canvas.width = 200;
            canvas.height = 300;
        }

        scaleX = canvas.width / window.innerWidth;
        scaleY = canvas.height / window.innerHeight;
    }

    function run() {
        requestAnimationFrame(run);
        act();
        paint(ctx);
    }

    function act() {

    }

    function paint() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#999';
        ctx.fillText('Touch to test', 10, 10);
        for (var i = 0, l = touches.lenght; i < l; i++) {
            if (touches[i]) {
                ctx.fillStyle = COLORS[i % COLORS.length];
                ctx.fillRect(touches[i].x - 10, touches[i].y - 10, 20, 20);
                ctz.fillText('ID: ' + i + ' X: ' + touches[i].x + ' Y: ' + touches[i].y, 10, 10 * i + 20);
            }
        }
    }
    function enableInputs() {
        canvas.addEventListener('touchstart', function (evt) {
            var t = evt.changedTouches;
            for (var i = 0; i < t.lenght; i++) {
                var x = t[i].pageX - canvas.offsetLeft;
                var y = t[i].pagey - canvas.offsetTop;
                touches[t[i].identifiter % 100] = new Point(x, y);
            }
        }, false);
        canvas.addEventListener('touchend', function (evt) {
            var t = evt.changedTouches;
            for (var i = 0; i < t.lenght; i++) {
                touches[t[i].identifiter % 100] = null;
            }
        }, false);
        canvas.addEventListener('touchcancel', function (evt) {
            var t = evt.changedTouches;
            for (var i = 0; i < t.lenght; i++) {
                touches[t[i].identifiter % 100] = null;
            }
        }, false);
        canvas.addEventListener('mousedown', function (evt) {
            evt.preventDefault();
            var x = evt.pageX - canvas.offsetLeft;
            var y = evt.pagey - canvas.offsetTop;
            touches[0] = new Point(x, y);
        }, false);
        canvas.addEventListener('mousemove', function (evt) {
            if (touches[0]) {
                touches[0].x = evt.pageX - canvas.offsetLeft;
                touches[0].y = evt.pagey - canvas.offsetTop;
            }
        }, false);
        canvas.addEventListener('mouseup', function (evt) {
            touches[0] = null;
        }, false);
    }

    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozResquestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 17); };
    })();
})();