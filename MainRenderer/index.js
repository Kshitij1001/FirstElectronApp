console.log('Index is running');

let video;
// For displaying the label
let label = "waiting...";
let label2 = 'waiting';
let jo;
let tDiff = 1;
let txt = 'hello';
// The classifier
let classifier;
// URL of my phuking trained model
let modelURL = 'https://teachablemachine.withgoogle.com/models/3HDOekr_/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  jo = (new Date()).getTime();
  let can = createCanvas(640, 520);
  can.position(350,100);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background('green');

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
  tDiff = (new Date()).getTime()-jo;
  tDiff/=1000;
  txt = 'Time until last Dab move: '+ tDiff + ' Sec.';
  document.querySelector('.yomama').innerHTML = txt;
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  // if (error) {
  //   console.error(error);
  //   return;
  // }
  // Store the label and classify again!
  label = results[0].label;
  if(label != label2){
    console.log(label);
    if(label==="DAB"){
      jo = (new Date).getTime();
    }
    label2 = label;
  }
  classifyVideo();
}
