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
    var path = paper.path("M50,50L450,50").attr({"stroke-width": 8, stroke: "#000", "stroke-linecap": "round"});
    var path2 = paper.path("M50,50L450,50").attr({"stroke-width": 6, stroke: "#fff", "stroke-linecap": "round"});
    var dragger = paper.circle(200,50,12).attr({stroke:"#000",fill:"#ccc"});
    var texty = paper.text(200,50,"4");

    function up() {
        this.dx = this.dy = 0;
    }

    // this is the code to move the dragger around
    // and then keep track of the number of circles we should have on the screen
    // This is recorded on the variable "num"
    dragger.update = function (x, y) {
        temp = this.attr("cx") + x;
        temp = temp > 70 ? temp : 70;
        temp = temp < 430 ? temp : 430;
        var X = temp;
        this.attr({cx: X});
        var num = Math.floor(X / 50);
        texty.attr({x:X,y:50,text:num});
    };

    // this code is borrowed from a Raphael example, and appears to behave how you'd expect
    // but with a slightly more sophisticated way of keeping track of change.
    // Since the dx and dy are passed as total change since the mousedown, we have to keep track
    // of how much specifically has changed since the last call of update.
    function move(dx, dy) {
        this.update(dx - (this.dx || 0), dy - (this.dy || 0));
        this.dx = dx;
        this.dy = dy;
    }
    dragger.drag(move, up);

    window.setInterval(circle.update.bind(circle), 100);
});
