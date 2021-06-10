var c = document.getElementById("leftc");
var ctx = c.getContext("2d");
var h = document.body.scrollHeight;
var hi = window.innerHeight;
if (hi > h) h= hi;
var w = window.innerWidth/10;
ctx.canvas.height = h;
ctx.canvas.width = w;
for (i = 0; i<=w;i+=w/5){
    ctx.beginPath();
    var off = 0;
    ctx.moveTo(i-off, 0);
    ctx.lineTo(i+off, h);
    ctx.stroke();
}
for (i = 0; i<h;i+=w/5){
    ctx.beginPath();
    ctx.moveTo(0, i+off);
    ctx.lineTo(300, i-off);
    ctx.stroke();
}

var r = document.getElementById("rightc");
var rtx = r.getContext("2d");
rtx.canvas.height = h;
rtx.canvas.width = ctx.canvas.width;
for (i = 0; i<=w;i+=w/5){
    rtx.beginPath();
    rtx.moveTo(i-off, 0);
    rtx.lineTo(i+off, h);
    rtx.stroke();
}
for (i = 0; i<h;i+=w/5){
    rtx.beginPath();
    rtx.moveTo(0, i+off);
    rtx.lineTo(300, i-off);
    rtx.stroke();
}
var image = document.getElementById('target');
var y1  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
var x1  = Math.trunc((Math.random()*(5)));
if (y1 <4) y1 += 2;
ctx.drawImage(image,(x1*(w/5))+2,(y1*(w/5))+2,(w/5)-4,(w/5)-4);
var y2  = Math.trunc((Math.random()*(h/(10*(w/5)))));
var x2  = Math.trunc((Math.random()*(5)));
if (y2 <4) y2 += 2;
rtx.drawImage(image,(x2*(w/5))+2,(y2*(w/5))+2,(w/5)-4,(w/5)-4);

var score = 0
var sctext = document.getElementById("score");
sctext.innerHTML ="Score: "+score;
var img = ctx.createImageData((w/5)-2, (w/5)-2);
for (var i = img.data.length; --i >= 0; )
    img.data[i] = 0;

var imgr = rtx.createImageData(w/5, w/5);
for (var i = img.data.length; --i >= 0; )
    img.data[i] = 0;

c.onclick = function(event) {
    var clickX = event.layerX;
    var clickY = event.layerY;

    console.log(`X ${clickX}, Y ${clickY}`);
    if (x1*w/5<clickX && (x1+1)*w/5>clickX && y1*w/5<clickY && (y1+1)*w/5>clickY){
    score +=1;
    ctx.putImageData(img, (x1*(w/5))+2, (y1*(w/5))+2);
    y1  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
    x1  = Math.trunc((Math.random()*(5)));
    if (y1<4) y1 += 2;
    ctx.drawImage(image,(x1*(w/5))+2,(y1*(w/5))+2,(w/5)-4,(w/5)-4);
    sctext.innerHTML ="Score: "+score;

    }
}



r.onclick = function(event) {
    var clickX = event.layerX;
    var clickY = event.layerY;

    console.log(`X ${clickX}, Y ${clickY}`);
    if (x2*w/5<clickX && (x2+1)*w/5>clickX && y2*w/5<clickY && (y2+1)*w/5>clickY){
    score +=1;
    rtx.putImageData(img, (x2*(w/5))+2, (y2*(w/5))+2);
    y2  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
    x2  = Math.trunc((Math.random()*(5)));
    if (y2<4) y2 += 2;
    rtx.drawImage(image,(x2*(w/5))+2,(y2*(w/5))+2,(w/5)-4,(w/5)-4);
    sctext.innerHTML ="Score: "+score;

    }
}