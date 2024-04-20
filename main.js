Webcam.set({
    width: 700,
    height: 350,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera")
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        console.log("Step1");
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
        document.getElementById("camera").style.display = "none";
        document.getElementById("result").style.display = "initial";
    });
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kuge1PtfU/model.json',modelLoaded);
console.log('ml5 version is ',ml5.version);
function modelLoaded(){
    console.log("model is loaded");
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = (results[0].confidence.toFixed(2))*100 +"%";
    }
}
function Preview(){
    document.getElementById("result").style.display = "none";
    document.getElementById("camera").style.display = "initial";
}
function UnPreview(){
    document.getElementById("camera").style.display = "none";
    document.getElementById("result").style.display = "initial";
}