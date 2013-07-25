$(function() {
    var SX = window.innerWidth; //screenX
    var SY = window.innerHeight; //screenY
    var paper = Raphael(0, 0, window.innerWidth, window.innerHeight);
    var circle = paper.circle(50,50,15);
    circle.attr({fill: makeColor(), "stroke-width": 0});
    circle.CHANGEX = Math.floor(Math.random() * 80) + 1;
    circle.CHANGEY = Math.floor(Math.random() * 80) + 1;
    var num;
    var intervals = [];
    var circles = paper.set();
    var num2 = 15;
    circles.push(circle);
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

    // this is the first slider
    var path = paper.path("M50,50L710,50").attr({"stroke-width": 8, stroke: "#000", "stroke-linecap": "round"});
    var path2 = paper.path("M50,50L710,50").attr({"stroke-width": 6, stroke: "#fff", "stroke-linecap": "round"});

    // this dragger controls the number of circles (in the first slider)
    var dragger = paper.circle(70,50,12).attr({stroke:"#000",fill:"#ccc"});
    var texty = paper.text(70,50,"1").attr({unselectable: "on"});

    // this is the second slider
    var path3 = paper.path("M50,100L710,100").attr({"stroke-width": 8, stroke: "#000", "stroke-linecap": "round"});
    var path4 = paper.path("M50,100L710,100").attr({"stroke-width": 6, stroke: "#fff", "stroke-linecap": "round"});

    // this dragger controls the radius of the circles (in the second slider)
    var dragger2 = paper.circle(70,100,12).attr({stroke:"#000",fill:"#ccc"});
    var texty2 = paper.text(70,100,"15").attr({unselectable: "on"});

    // this function handles mouse up after dragging dragger
    function up() {
        this.dx = this.dy = 0;
    }

    // this is the code to move the dragger around
    // and then keep track of the number of circles we should have on the screen
    // This is recorded on the variable "num"
    dragger.update = function (x, y) {
        var temp = this.attr("cx") + x;
        temp = temp > 60 ? temp : 60;
        temp = temp < 700 ? temp : 700;
        var X = temp;
        var tempCircle, diff;
        this.attr({cx: X});
        var tempNum = Math.floor((X - 50)/ 20);
        if (num === undefined)  // doing an ||= annoyingly won't work right here.
            num = 1;
        if (tempNum !== num) {
            if (tempNum > num) {
                diff = tempNum - num;
                for (var i = 0; i < diff; i++) {
                    tempCircle = paper.circle(Math.floor(Math.random() * SX), Math.floor(Math.random() * SY), num2).attr({fill:"#0F0"});
                    tempCircle.CHANGEX = Math.floor(Math.random() * 80) + 1;
                    tempCircle.CHANGEY = Math.floor(Math.random() * 80) + 1;
                    tempCircle.attr({"stroke-width": 0}).toBack();
                    circles.push(tempCircle);
                    intervals.push(window.setInterval(circles.update.bind(tempCircle), 100));
                }
                diff = 0;
            } else {
                diff = num - tempNum;
                console.log('this is diff');
                console.log(diff);
                for (i = 0; i < diff; i++) {
                    circles.pop().remove();
                    window.clearInterval(intervals.pop());
                }
                diff = 0;
            }
            num = tempNum;
            console.log(num);
        }
        texty.attr({x:X,y:50,text:num});
    };

    dragger2.update = function (x, y) {
        var temp = this.attr("cx") + x;
        temp = temp > 60 ? temp : 60;
        temp = temp < 700 ? temp : 700;
        var X = temp;
        var tempCircle, diff;
        this.attr({cx: X});
        var tempNum2 = (Math.floor((X - 50)/ 100) + 1) * 15;
        if (num2 === undefined)  // doing an ||= annoyingly won't work right here.
            num2 = 15;
        if (tempNum2 !== num2) {
            var _len = circles.length
            for (var j = 0; j < _len; j++) {
                circles[j].attr({r: tempNum2});
            }
            num2 = tempNum2;
            console.log(num2);
        }
        texty2.attr({x:X,y:100,text:num2});
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
    dragger2.drag(move, up);
    texty.drag(move.bind(dragger), up.bind(dragger));
    texty2.drag(move.bind(dragger2), up.bind(dragger2));

    // now that we have the rest of the draggers set up, we need to push the original circle to the back and animate it.
    circle.toBack();
    intervals.push(window.setInterval(circles.update.bind(circle), 100)); //<-- this is the animation step


    // Now we add a button to view THIS source code
    var link = paper.text(SX - 100, SY - 50, "see the code!");
    link.attr({fill: "#000", 'font-size': '20pt'});
    loadCode = function(e) {
        window.open("https://github.com/elju/Raphael-Example/blob/gh-pages/example.js", "_self");
    };
    link.click(loadCode);
    link.hover(function(e) {
        this.attr({fill: "#E00", "font-size": "22pt"});
    });
    link.mouseout(function(e) {
        this.attr({fill: "#000", "font-size": "20pt"});
    });


    // Finally, here is a random helper function to return a random hex-valued color
    function makeColor() {
        var thing = "#";
        for(var i = 0; i < 3; i++) {
            thing += Math.floor(Math.random()*16).toString(16);
        }
        return thing;
    }

});
