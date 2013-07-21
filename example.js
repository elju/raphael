$(function() {
    var paper = Raphael(10, 50, 320, 200);
    var circle = paper.circle(150, 140, 100);
    circle.attr("fill", "#f00");
    circle.attr("stroke", "#fff");
    circle.animate({
        cx: 300,
        cy: 100,
        fill: "#0f0"
    }, 1000);
});
