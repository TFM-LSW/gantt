/* global moment, Snap */
const maxWidth = 32767;
let ganttWidth = 100;
let canvases = [];
let ctxArr = [];
const colours = [
	'red',
	'blue',
	'green',
	'yellow',
	'purple'
];
function createCanvas(id, width = ganttWidth, height = 60) {
	const cnvs = document.createElement('canvas');
	cnvs.id = id;
	cnvs.width = ganttWidth >= maxWidth ? maxWidth : ganttWidth;
	cnvs.height = height;
	cnvs.style.backgroundColor = colours[id - 1] || 'red';
	/* cnvs.style.position = 'absolute';
	cnvs.style.display = 'block';
	cnvs.style.left = ((id - 1) * cnvs.width);
	cnvs.style.top = 0; */
	return cnvs;
}
function removeCanvas() {
	const lastEntry = canvases.pop();
	lastEntry.parentElement.removeChild(lastEntry);
}
export default function drawCanvasTime(dataDates) {
	while (canvases.length) {
		removeCanvas();
	}
	const gantt = document.getElementById('gantt');
	const header = document.getElementById('timeheader');
	ganttWidth = gantt.clientWidth;
	header.style.width = ganttWidth + 'px';

	// figure out widths of subsequent canvases...
	const requiredCanvases = Math.ceil(ganttWidth / maxWidth);
	let count = 1;
	while (canvases.length < requiredCanvases) {
		const c = createCanvas(count);
		canvases.push(c);
		header.appendChild(c);
		count++;
	}

	ctxArr = canvases.map(cv => cv.getContext('2d'));

	let i, ctx, canvasWidth, textWidth, textOffset, xOffset = 0, ctxID = 0;
	for (i in ctxArr) {
		ctx = ctxArr[i];
		ctx.font = '11px Arial';
	}
	for (let date of dataDates) {
		ctx = ctxArr[ctxID];
		canvasWidth = ctx.canvas.width;
		textWidth = ctx.measureText(date.lower_text).width;

		if ((xOffset + canvasWidth) > (date.lower_x + textWidth)) {
			textOffset = canvasWidth - textWidth;
			ctx.fillText(date.lower_text, date.lower_x - xOffset, date.lower_y);
		} else {
			ctx.fillText('|', date.lower_x - xOffset, date.lower_y - 20);
			ctx.fillText(date.lower_text, date.lower_x - xOffset, date.lower_y);
			xOffset += canvasWidth;
			ctxID++;
			if (ctxArr[ctxID]) {
				ctxArr[ctxID].fillText(date.lower_text, date.lower_x - xOffset, date.lower_y);
			}
		}
	}
}
// https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element
/* 	header.width = ganttWidth > 32767 ? 32767 : gantt.clientWidth;
	let ctx = header.getContext('2d');
	// maximum canvas width and height: Chrome = 32767, IE = 8192
	ctx.clearRect(0, 0, header.clientWidth, 60);
	ctx.font = '11px Arial';
	for (let date of dataDates) {
		// console.log(date.lower_x);
		ctx.fillText(date.lower_text, date.lower_x, date.lower_y);
	}
	console.log('----- done rendering canvas text -----------'); */
