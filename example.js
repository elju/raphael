$(function() {
    var paper = Raphael(10, 50, 800, 1000);
    var circle = paper.circle(150, 140, 100);
    circle.attr("fill", "#f00");
    circle.attr("stroke", "#fff");
    function makeColor() {
        var thing = "#";
        for(var i = 0; i < 3; i++) {
            thing += Math.floor(Math.random()*16).toString(16);
        }
        return thing;
    }
    function loop(e) {
        circle.animate({
            cx: e.pageX,
            cy: e.pageY,
            fill: makeColor()
        }, 300);
    }
    $(document.body).on('mousemove', loop)
});
