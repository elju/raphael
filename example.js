$(function() {
    var SX = window.innerWidth; //screenX
    var SY = window.innerHeight; //screenY
    var paper = Raphael(0, 0, window.innerWidth, window.innerHeight);
    var circle = paper.circle(50,50,30);
    circle.attr({fill: makeColor(), "stroke-width": 0});
    circle.CHANGEX = Math.floor(Math.random() * 80) + 1;
    circle.CHANGEY = Math.floor(Math.random() * 80) + 1;
    var num;
    var intervals = [];
    var circles = paper.set(circle);
    circles.update = function () {
        var dx = this.CHANGEX;
        var dy = this.CHANGEY;
        var x = this.attr("cx");
        var y = this.attr("cy");
        var X, Y;
        if (x + dx > SX) {
            X = SX - (dx - (SX - x)); // bounce off the wall in the x direction;
            this.CHANGEX = -this.CHANGEX;
            this.animate({fill: makeColor()}, 200);
        } else if (x + dx < 0) {
            X = -dx - x;
            this.CHANGEX = -this.CHANGEX; // change to moving opposite x direction
            this.animate({fill: makeColor()}, 200);
        } else {
            X = x + dx;
        }
        if (y + dy > SY) {
            Y = SY - (dy - (SY - y)); // bounce off the wall in the x direction;
            this.CHANGEY = -this.CHANGEY;
            this.animate({fill: makeColor()}, 200);
        } else if (y + dy < 0) {
            Y = -dy - y;
            this.CHANGEY = -this.CHANGEY; // change to moving opposite y direction;
            this.animate({fill: makeColor()}, 200);
        } else {
            Y = y + dy;
        }
        this.animate({cx: X, cy: Y}, 100);
    };
    var path = paper.path("M50,50L710,50").attr({"stroke-width": 8, stroke: "#000", "stroke-linecap": "round"});
    var path2 = paper.path("M50,50L710,50").attr({"stroke-width": 6, stroke: "#fff", "stroke-linecap": "round"});
    var dragger = paper.circle(70,50,12).attr({stroke:"#000",fill:"#ccc"});
    var texty = paper.text(70,50,"1").attr({unselectable: "on"});

    function up() {
        this.dx = this.dy = 0;
    }

    // this is the code to move the dragger around
    // and then keep track of the number of circles we should have on the screen
    // This is recorded on the variable "num"
    dragger.update = function (x, y) {
        temp = this.attr("cx") + x;
        temp = temp > 60 ? temp : 60;
        temp = temp < 700 ? temp : 700;
        var X = temp;
        var tempCircle;
        this.attr({cx: X});
        var tempNum = Math.floor((X - 50)/ 20);
        num = num || 1;
        if (tempNum !== num) {
            if (tempNum > num) {
                tempCircle = paper.circle(Math.floor(Math.random() * SX), Math.floor(Math.random() * SY), 30).attr({fill:"#0F0"});
                tempCircle.CHANGEX = Math.floor(Math.random() * 80) + 1;
                tempCircle.CHANGEY = Math.floor(Math.random() * 80) + 1;
                tempCircle.attr({"stroke-width": 0});
                circles.push(tempCircle);
                intervals.push(window.setInterval(circles.update.bind(tempCircle), 100));
            } else {
                circles.pop().remove();
                window.clearInterval(intervals.pop());
            }
        }
        num = tempNum;
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
    texty.drag(move.bind(dragger), up.bind(dragger));

    intervals.push(window.setInterval(circles.update.bind(circle), 100));

    function makeColor() {
        var thing = "#";
        for(var i = 0; i < 3; i++) {
            thing += Math.floor(Math.random()*16).toString(16);
        }
        return thing;
    }

    // add a button to click on
    var link = paper.text(SX - 100, 50, "see the code!");
    link.attr({fill: "#000", 'font-size': '20pt'});
    loadCode = function(e) {
        window.open("https://github.com/elju/Raphael-Example/blob/gh-pages/example.js", "_self");
    };
    link.click(loadCode);
    link.hover(function(e) {
        this.attr({fill: "#999"});
    });
    link.mouseout(function(e) {
        this.attr({fill: "#000"});
    });

});
