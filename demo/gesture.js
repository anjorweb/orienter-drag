var gesture = Bone.extend({}, Bone.Events, {
    START: 'start',
    END: 'end',
    MOVE: 'move',

    //----------------------------------------------------------------init Gesture
    stage: null,
    originTouchPos: {x: 0, y: 0},
    oldTouchPos: {x: 0, y: 0},
    newTouchPos: {x: 0, y: 0},
    firstDir: '',

    originTime: 0,
    oldTime: 0,
    newTime: 0,

    dx: 0,
    dy: 0,
    ax: 0,
    ay: 0,
    time: 0,

    init: function (stage) {
        this.stage = stage;
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.stage.on('touchstart', this.onTouchStart);
    },

    clear: function () {
        this.stage.off('touchstart', this.onTouchStart);
        this.stage.off('touchmove', this.onTouchMove);
        this.stage.off('touchend', this.onTouchEnd);
    },

    onTouchStart: function (evt) {
        this.firstDir = '';
        evt = evt.changedTouches[0];
        this.originTouchPos.x = this.oldTouchPos.x = this.newTouchPos.x = evt.clientX;
        this.originTouchPos.y = this.oldTouchPos.y = this.newTouchPos.y = evt.clientY;
        this.originTime = this.oldTime = this.newTime = Date.now();
        this.dx = this.dy = this.ax = this.ay = 0;

        this.stage.on('touchmove', this.onTouchMove);
        this.stage.on('touchend', this.onTouchEnd);
        this.trigger(this.START);
    },

    onTouchMove: function (evt) {
        evt = evt.changedTouches[0];
        this.newTouchPos.x = evt.clientX;
        this.newTouchPos.y = evt.clientY;
        this.newTime = Date.now();
        this.checkGesture();
        this.oldTouchPos.x = this.newTouchPos.x;
        this.oldTouchPos.y = this.newTouchPos.y;
        this.oldTime = this.newTime;
        return false;
    },

    onTouchEnd: function () {
        this.newTime = Date.now();
        var _time = (this.newTime - this.oldTime) / 1000;
        this.trigger(this.END, {
            dx: this.dx,
            dy: this.dy,
            ax: this.time * 2 > _time ? this.ax : 0,
            ay: this.time * 2 > _time ? this.ay : 0,
            dir: this.firstDir
        });
        this.stage.off('touchmove', this.onTouchMove);
        this.stage.off('touchend', this.onTouchEnd);
        return false;
    },

    checkGesture: function () {
        this.dx = this.fixed2(this.newTouchPos.x - this.originTouchPos.x);
        this.dy = this.fixed2(this.newTouchPos.y - this.originTouchPos.y);
        this.ax = this.fixed2(this.newTouchPos.x - this.oldTouchPos.x);
        this.ay = this.fixed2(this.newTouchPos.y - this.oldTouchPos.y);
        this.time = (this.newTime - this.oldTime) / 1000;

        if (this.firstDir == '') {
            if (Math.abs(this.ax) > Math.abs(this.ay)) {
                this.firstDir = 'x';
            } else if (Math.abs(this.ax) < Math.abs(this.ay)) {
                this.firstDir = 'y';
            }
        }

        this.trigger(this.MOVE, {
            dx: this.dx,
            dy: this.dy,
            ax: this.ax,
            ay: this.ay,
            dir: this.firstDir
        });
    },

    fixed2: function (num) {
        return Math.floor(num * 100) / 100;
    }

});

// module.exports = gesture;
