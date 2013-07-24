$(function() {
    var paper = Raphael(0, 0, window.innerWidth, window.innerHeight);
    var circle = paper.circle(50,50,20);
    circle.attr({fill:"#000"});
    var CHANGEX = 30;
    var CHANGEY = 20;
    var SX = window.innerWidth; //screenX
    var SY = window.innerHeight; //screenY
    circle.update = function () {
        console.log("yo");
        var dx = CHANGEX;
        var dy = CHANGEY;
        var x = this.attr("cx");
        var y = this.attr("cy");
        var X, Y;
        if (x + dx > SX) {
            X = SX - (dx - (SX - x)); // bounce off the wall in the x direction;
            CHANGEX = -CHANGEX;
        } else if (x + dx < 0) {
            X = -dx - x;
            CHANGEX = -CHANGEX;
        } else {
            X = x + dx;
        }
        if (y + dy > SY) {
            Y = SY - (dy - (SY - y)); // bounce off the wall in the x direction;
            CHANGEY = -CHANGEY;
        } else if (y + dy < 0) {
            Y = -dy - y;
            CHANGEY = -CHANGEY;
        } else {
            Y = y + dy;
        }
        this.animate({cx: X, cy: Y}, 100);
        console.log(this);
    };
    window.setInterval(circle.update.bind(circle), 100);
});
