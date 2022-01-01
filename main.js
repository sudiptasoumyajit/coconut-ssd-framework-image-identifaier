img = "";
status = "";
objects = [];
function preload() {
    img = loadImage("dog_cat.jpg");
}
function setup() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status Detecting Object";
    canvas = createCanvas(640, 420);
    canvas.center();
 }
function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "empty") {
        for (i = 0; i < objects.length; i ++) {
            document.getElementById("status").innerHTML="status == object detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    //fill("#FF0000");
    //text("Dog","45, 75");
    //noFill();
    //stroke("#FF0000");
    //rect(30, 60, 450, 350);
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}