export function ScrollWheelInit () {
    require('mouse-wheel')(
        document.getElementById('gc'),
        function (dx, dy, dz, ev) {
            // const display = document.getElementById('wheeldata');
            // display.innerHTML = '<p>Scroll:' + [dx, dy, dz, ev] + '</p>';
            if (dy > 0) {
                console.log('zoom in');
            } else if (dy < 0) {
                console.log('zoom out');
            }
            // console.dir(ev)
            // console.log(`x: ${ev.x} y: ${ev.y}`);
            console.log(`Gantt mouse, x: ${ ev.offsetX } y: ${ ev.offsetY }`);

        }/* ,
            'noScroll' */
    );
}


/* 
// clicked(evt)

export function clicked(evt) {
    console.log(evt)
    var e = evt.target;
    var dim = e.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;
    console.log("x: " + x + " y:" + y);
} */