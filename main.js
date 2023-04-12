let synth = window.speechSynthesis;
let classifier;
let Canvas;
let points = 0;
let time = 0;
function setup(){
    Canvas = createCanvas(280, 280);
    Canvas.center();
    background("white");
    Canvas.mouseReleased(classifyCanvas);
}

function clearCanvas(){
    background("white");
    check();
}

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(Canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    let Result = results[0].label;
    document.getElementById("label").innerHTML = "nome: "+Result.replace("_"," ");
    document.getElementById("confidence").innerHTML = "precisão: "+Math.round(results[0].confidence*100)+"%";
    let utterThis = new SpeechSynthesisUtterance(Result.replace("_"," "));
    synth.speak(utterThis);
}

function check(){
    time = time+1;
    document.getElementById("time").innerHTML = "tempo: " + time;
    if(tempo > 10){
        point = point+1;
        document.getElementById("points").innerHTML = "pontuação: " + point;
    }
    if(tempo > 30){
        point = 0;
        time = 0;
    }
}