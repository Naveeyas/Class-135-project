Status = "";
video = "";
objects = [];
Name = "";

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(580, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 580, 380);
    if(Status != "")
    {
        objectDetector.detect(video, gotResults);
    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : Object Detected";

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke("FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        Name = document.getElementById("BLA2").value;

        if(objects.label == Name)
        {
            document.getElementById("object_name").innerHTML = "Object Found";
        }
        else
        {
            document.getElementById("object_name").innerHTML = "Object Not Found";
        }
    }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results
}