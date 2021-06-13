var c = document.getElementById("leftc");
var ctx = c.getContext("2d");
var h = ctx.canvas.height;//document.body.scrollHeight - 5;
var hi = window.innerHeight - 5;
if (hi > h) h= hi;
var w = ctx.canvas.width;//window.innerWidth/10;
//ctx.canvas.height = h;
//ctx.canvas.width = w;
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
//rtx.canvas.width = ctx.canvas.width;
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




var coords1 = new Set();
while(coords1.size<12)    {
    var y1  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
    var x1  = Math.trunc((Math.random()*(5)));
    if (y1 <4) y1 += 2;
    coords1.add({x:x1,y:y1});
}

var coords2 = new Set();
while(coords2.size<12)    {
    var y1  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
    var x1  = Math.trunc((Math.random()*(5)));
    if (y1 <4) y1 += 2;
    coords2.add({x:x1,y:y1});
}

coords1.forEach((value)=>drawInCanvas(ctx,value));
coords2.forEach((value)=>drawInCanvas(rtx,value));
/*
var image = document.getElementById('target');

var y2  = Math.trunc((Math.random()*(h/(10*(w/5)))));
var x2  = Math.trunc((Math.random()*(5)));
if (y2 <4) y2 += 2;
rtx.drawImage(image,(x2*(w/5))+2,(y2*(w/5))+2,(w/5)-4,(w/5)-4);
*/
var score = 0
var sctext = document.getElementById("score");
sctext.innerHTML ="Score: "+score;
var img = ctx.createImageData((w/5)-2, (w/5)-2);
for (var i = img.data.length; --i >= 0; )
    img.data[i] = 0;

var imgr = rtx.createImageData(w/5, w/5);
for (var i = img.data.length; --i >= 0; )
    img.data[i] = 0;

var clicked = false;






r.onclick = function(event) {
    var clickX = event.layerX;
    var clickY = event.layerY;
    coords2.forEach((value)=>isClickInR(clickX,clickY,rtx,value));

    /*//console.log(`X ${clickX}, Y ${clickY}`);
    if (x2*w/5<clickX && (x2+1)*w/5>clickX && y2*w/5<clickY && (y2+1)*w/5>clickY){
    score +=1;
    rtx.putImageData(img, (x2*(w/5))+2, (y2*(w/5))+2);
    y2  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
    x2  = Math.trunc((Math.random()*(5)));
    if (y2<4) y2 += 2;
    rtx.drawImage(image,(x2*(w/5))+2,(y2*(w/5))+2,(w/5)-4,(w/5)-4);
    sctext.innerHTML ="Score: "+score;

    }*/
}

function drawInCanvas(cont,coord){
var which = Math.trunc(Math.random()*4*(1+coords1.size)/12);
if(which == 4) which = which - Math.trunc(Math.random()*3);
//console.log(which);
    //console.log(coord);
    var x = coord.x;
    var y = coord.y;

    //console.log(which == 0);
    //console.log(which == 1);
    //console.log(which == 2);
    //console.log(which == 3);
    switch (which){
        case 0:{

    //console.log("lets draw in left0");
         var image = document.getElementById('target');
    cont.drawImage(image,(x*(w/5))+2,(y*(w/5))+2,(w/5)-4,(w/5)-4);
    break;
        }
        case 1:{
    //console.log("lets draw in left1");
         var image = document.getElementById('targetb');
    cont.drawImage(image,(x*(w/5))+2,(y*(w/5))+2,(w/5)-4,(w/5)-4);
    break;
        }
        case 2:{
    //console.log("lets draw in left2");
         var image = document.getElementById('targety');
    cont.drawImage(image,(x*(w/5))+2,(y*(w/5))+2,(w/5)-4,(w/5)-4);
    break;
        }
        case 3:{
    //console.log("lets draw in left3");
         var image = document.getElementById('targetp');
    cont.drawImage(image,(x*(w/5))+2,(y*(w/5))+2,(w/5)-4,(w/5)-4);
    break;
        }
    }
}


c.onclick = function(event) {
    var clickX = event.layerX;
    var clickY = event.layerY;
    coords1.forEach((value)=>isClickIn(clickX,clickY,ctx,value));
    /*//console.log(`X ${clickX}, Y ${clickY}`);
    if (x1*w/5<clickX && (x1+1)*w/5>clickX && y1*w/5<clickY && (y1+1)*w/5>clickY){
    score +=1;
    ctx.putImageData(img, (x1*(w/5))+2, (y1*(w/5))+2);
    y1  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
    x1  = Math.trunc((Math.random()*(5)));
    if (y1<4) y1 += 2;
    ctx.drawImage(image,(x1*(w/5))+2,(y1*(w/5))+2,(w/5)-4,(w/5)-4);
    sctext.innerHTML ="Score: "+score;

    }*/
}

function isClickIn(clickX, clickY, cont, coords){
     var x1 = coords.x;
     var y1 = coords.y;
     if (x1*w/5<clickX && (x1+1)*w/5>clickX && y1*w/5<clickY && (y1+1)*w/5>clickY){

     //drawInCanvas(cont,)
    score +=1;
    //console.log("ewe");
    ctx.putImageData(img, (x1*(w/5))+2, (y1*(w/5))+2);
    //console.log("awa");
    coords1.delete(coords);
    while(coords1.size<12)    {
    //console.log("owo");
    y1  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
    x1  = Math.trunc((Math.random()*(5)));
    //console.log("uwu");
    if (y1 <4) y1 += 2;
    var sizeor = coords1.size;
    //console.log("iwi");
    var cc = {x:x1,y:y1};
    //console.log("here goes cc");
    //console.log(cc);
    coords1.add(cc);
    if (coords1.size!=sizeor){
    //console.log("call draw from click");
        drawInCanvas(ctx,cc);
    }
}


    sctext.innerHTML ="Score: "+score;
    }

}

function isClickInR(clickX, clickY, cont, coords){
     var x1 = coords.x;
     var y1 = coords.y;
     if (x1*w/5<clickX && (x1+1)*w/5>clickX && y1*w/5<clickY && (y1+1)*w/5>clickY){

     //drawInCanvas(cont,)
    score +=1;
    //console.log("ewe");
    rtx.putImageData(img, (x1*(w/5))+2, (y1*(w/5))+2);
    //console.log("awa");
    coords2.delete(coords);
    while(coords2.size<12)    {
        //console.log("owo");
        y1  = Math.trunc((Math.random()*(10*((h/(w/5))/9))));
        x1  = Math.trunc((Math.random()*(5)));
        //console.log("uwu");
        if (y1 <4) y1 += 2;
        var sizeor = coords2.size;
        //console.log("iwi");
        var cc = {x:x1,y:y1};
        //console.log("here goes cc");
        //console.log(cc);
        coords2.add(cc);
        if (coords2.size!=sizeor){
        //console.log("call draw from click");
            drawInCanvas(cont,cc);
            }
        }
    sctext.innerHTML ="Score: "+score;
    }

}