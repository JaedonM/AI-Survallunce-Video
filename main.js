video = "";
objects = [];
status = "";




function preload(){
video = createVideo("video.mp4")
}

function setup(){
canvas = createCanvas(480,380)
canvas.center()
video.hide()

}


function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Dectecting Object  "
}

function modelLoaded(){
    console.log("Model has been loaded")
    status= true
    video.loop()
    video.speed(1)
    video.volume(0)
}

function draw(){
    image(video,0,0,480,380)

    if (status != "") {
        objectDetector.detect(video, gotResult)

        for(i =0 ; i<objects.length ; i++){

            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;
            fill("red")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + "  "+ percent + "%", objects[i].x, objects[i].y)

            noFill()
            stroke("red")
            rect(objects[i].x -10, objects[i].y -10, objects[i].width, objects[i].height)
        }
    }
    }

    function gotResult(error, results){
        if (error) {
            console.error(error)
        } else{
            console.log(results)
            objects = results
        }
    
    }

